#!/usr/bin/env node
/**
 * Typecheck com baseline.
 *
 * Roda `tsc --noEmit` e compara os erros com uma baseline congelada. O build
 * falha SÓ se aparecer um erro que não estava na baseline — erros conhecidos
 * passam, erros novos travam. Isso impede o drift de tipos voltar sem exigir
 * zerar os ~360 erros pré-existentes de uma vez.
 *
 * Uso:
 *   node scripts/typecheck-baseline.mjs           # checa; exit 1 se houver erro novo
 *   node scripts/typecheck-baseline.mjs --update   # regrava a baseline com o estado atual
 *
 * A baseline usa ASSINATURA (arquivo + código TS + mensagem), não contagem —
 * assim um fix e um erro novo não se anulam. Ao corrigir erros, rode --update
 * pra baseline encolher; ela nunca deve crescer.
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE = join(root, ".typecheck-baseline.json");
const update = process.argv.includes("--update");

// tsc sai com código != 0 quando há erros; capturamos a saída de qualquer jeito.
let out = "";
try {
  out = execSync("npx tsc --noEmit -p tsconfig.app.json", {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch (e) {
  out = `${e.stdout || ""}${e.stderr || ""}`;
}

// path(line,col): error TSxxxx: message
const RE = /^(.+?)\((\d+),(\d+)\):\s+error\s+(TS\d+):\s+(.*)$/;

function signatures(text) {
  const sigs = [];
  for (const raw of text.split(/\r?\n/)) {
    const m = raw.match(RE);
    if (!m) continue;
    const file = m[1].replace(/\\/g, "/").replace(`${root.replace(/\\/g, "/")}/`, "");
    // Sem line:col — mudar linhas acima do erro não deve churn a baseline.
    sigs.push(`${file}|${m[4]}|${m[5].trim()}`);
  }
  return sigs;
}

function toCounts(list) {
  const map = new Map();
  for (const s of list) map.set(s, (map.get(s) || 0) + 1);
  return map;
}

const current = signatures(out);
const currentCounts = toCounts(current);

if (update) {
  const sorted = [...current].sort();
  writeFileSync(BASELINE, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`Baseline atualizada: ${sorted.length} erros conhecidos gravados em .typecheck-baseline.json`);
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error("Sem baseline. Rode: node scripts/typecheck-baseline.mjs --update");
  process.exit(2);
}

const baselineCounts = toCounts(JSON.parse(readFileSync(BASELINE, "utf8")));

// Erros NOVOS: assinaturas cuja contagem atual passou da baseline.
const novos = [];
for (const [sig, n] of currentCounts) {
  const base = baselineCounts.get(sig) || 0;
  for (let i = 0; i < n - base; i++) novos.push(sig);
}
// Erros CORRIGIDOS: baseline que sumiu ou diminuiu (informativo, não falha).
let corrigidos = 0;
for (const [sig, n] of baselineCounts) {
  corrigidos += Math.max(0, n - (currentCounts.get(sig) || 0));
}

console.log(`Erros de tipo: ${current.length} atuais | ${[...baselineCounts.values()].reduce((a, b) => a + b, 0)} na baseline`);
if (corrigidos > 0) {
  console.log(`✓ ${corrigidos} erro(s) da baseline foram corrigidos. Rode --update pra encolher a baseline.`);
}

if (novos.length > 0) {
  console.error(`\n✗ ${novos.length} erro(s) de tipo NOVO(S), fora da baseline:\n`);
  for (const sig of novos) {
    const [file, code, msg] = sig.split("|");
    console.error(`  ${file}  ${code}  ${msg.slice(0, 140)}`);
  }
  console.error("\nCorrija-os, ou (se intencional) rode --update pra incorporar à baseline.");
  process.exit(1);
}

console.log("✓ Nenhum erro de tipo novo.");
process.exit(0);
