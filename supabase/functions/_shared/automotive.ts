// Helpers de qualificação automotiva compartilhados pelas funções de análise
// (analyze-sales-call, analyze-conversation, process-call-transcription).
// Convertem os campos que a IA extrai da conversa/call nos campos canônicos do lead
// (vehicle_of_interest, negotiation_type, intent_*) usados pelo scoring e pelos filtros.

export const NEGOTIATION_TYPE_MAP: Record<string, string> = {
  a_vista: "À vista",
  financiamento: "Financiamento",
  consorcio: "Consórcio",
  troca: "Troca",
};

/**
 * Recebe o bloco de dados automotivos extraído pela IA e devolve os updates
 * canônicos pra tabela `leads`. Tolerante a nomes em pt/en e a valores "null"/vazios.
 */
export function automotiveExtractionToUpdates(dados: any): Record<string, unknown> {
  const updates: Record<string, unknown> = {};
  if (!dados || typeof dados !== "object") return updates;

  const veiculo = dados.veiculo_interesse ?? dados.vehicle_interest;
  if (veiculo && String(veiculo).trim() && String(veiculo).trim().toLowerCase() !== "null") {
    updates.vehicle_of_interest = { raw: String(veiculo).trim() };
  }

  const pgto = dados.forma_pagamento ?? dados.payment_intent;
  if (pgto && pgto !== "desconhecido") {
    if (NEGOTIATION_TYPE_MAP[pgto]) updates.negotiation_type = NEGOTIATION_TYPE_MAP[pgto];
    if (pgto === "a_vista") updates.intent_cash = true;
    if (pgto === "financiamento") updates.intent_finance_no_entry = true;
  }

  const troca = dados.tem_troca ?? dados.has_trade;
  if (troca === true || troca === "true") {
    updates.intent_trade_in = true;
    updates.negotiation_type = "Troca"; // troca é o tipo de negociação mais saliente
  }

  return updates;
}
