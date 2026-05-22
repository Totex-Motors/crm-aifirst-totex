import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Eye,
  EyeOff,
  Save,
  Loader2,
  CheckCircle2,
  XCircle,
  Copy,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// =====================================================
// TYPES
// =====================================================

type Provider = "none" | "autoconf";

interface ProviderOption {
  value: Provider;
  label: string;
  description: string;
}

const PROVIDERS: ProviderOption[] = [
  {
    value: "none",
    label: "Nenhum",
    description: "Sem integração de leads ativa",
  },
  {
    value: "autoconf",
    label: "AutoConf",
    description: "Recebe leads do AutoConf via webhook (Instagram, site, OLX, etc.)",
  },
];

interface FieldDef {
  key: string;
  label: string;
  description: string;
  placeholder: string;
  isSecret?: boolean;
}

const AUTOCONF_FIELDS: FieldDef[] = [
  {
    key: "AUTOCONF_WEBHOOK_SECRET",
    label: "Webhook Secret",
    description:
      "Token secreto que o AutoConf envia no header Authorization. Configure o mesmo valor no painel do AutoConf.",
    placeholder: "secret-token-...",
    isSecret: true,
  },
  {
    key: "AUTOCONF_REVENDA_TOKEN",
    label: "Revenda Token",
    description: "Token da revenda no AutoConf (campo 'Token' fornecido pelo suporte).",
    placeholder: "Y8Q0Tzq...",
    isSecret: true,
  },
  {
    key: "AUTOCONF_BEARER_TOKEN",
    label: "Bearer Token (API)",
    description:
      "Token de autorização para a API REST do AutoConf (campo 'Authorization' fornecido pelo suporte).",
    placeholder: "iXu1SE6...",
    isSecret: true,
  },
];

// =====================================================
// COMPONENT
// =====================================================

export function LeadsSection() {
  const { toast } = useToast();

  const [provider, setProvider] = useState<Provider>("none");
  const [savingProvider, setSavingProvider] = useState(false);

  const [values, setValues] = useState<Record<string, string>>({});
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  const [loading, setLoading] = useState(true);

  const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/autoconf-lead-webhook`;

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const keys = ["LEAD_PROVIDER", ...AUTOCONF_FIELDS.map((f) => f.key)];
      const { data, error } = await supabase
        .from("config")
        .select("key, value")
        .in("key", keys);

      if (error) throw error;

      const map: Record<string, string> = {};
      (data || []).forEach((row: any) => {
        map[row.key] = row.value || "";
      });

      setProvider((map["LEAD_PROVIDER"] as Provider) || "none");
      setValues(map);
    } catch (err) {
      console.error("Error loading leads config:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveProvider = async (value: Provider) => {
    setSavingProvider(true);
    try {
      const { error } = await supabase
        .from("config")
        .upsert({ key: "LEAD_PROVIDER", value, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) throw error;
      setProvider(value);
      toast({ title: "Provedor salvo" });
    } catch {
      toast({ title: "Erro ao salvar provedor", variant: "destructive" });
    } finally {
      setSavingProvider(false);
    }
  };

  const saveField = async (field: FieldDef) => {
    setSaving((prev) => ({ ...prev, [field.key]: true }));
    try {
      const value = values[field.key] || "";
      const { error } = await supabase
        .from("config")
        .upsert({ key: field.key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) throw error;
      toast({ title: `${field.label} salvo com sucesso` });
    } catch {
      toast({ title: "Erro ao salvar", variant: "destructive" });
    } finally {
      setSaving((prev) => ({ ...prev, [field.key]: false }));
    }
  };

  const generateSecret = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const secret = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setValues((prev) => ({ ...prev, AUTOCONF_WEBHOOK_SECRET: secret }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({ title: `${label} copiado` });
      })
      .catch((err) => {
        console.error('Clipboard copy failed:', err);
        toast({ title: "Erro ao copiar para área de transferência", variant: "destructive" });
      });
  };

  const activeProvider = PROVIDERS.find((p) => p.value === provider) ?? PROVIDERS[0];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Provider selector */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm mb-1">Fonte de Leads</p>
              <p className="text-xs text-muted-foreground mb-3">
                Escolha o sistema que enviará leads para o CRM. Cada loja pode usar
                um sistema diferente conforme seu ERP ou portal de anúncios.
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between text-sm h-9" disabled={savingProvider}>
                    <span>{activeProvider.label}</span>
                    {savingProvider ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {PROVIDERS.map((p) => (
                    <DropdownMenuItem
                      key={p.value}
                      onClick={() => saveProvider(p.value)}
                      className="flex flex-col items-start gap-0.5 py-2"
                    >
                      <span className="font-medium text-sm">{p.label}</span>
                      <span className="text-xs text-muted-foreground">{p.description}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AutoConf config */}
      {provider === "autoconf" && (
        <div className="space-y-4">
          {/* Webhook URL — read-only */}
          <Card>
            <CardContent className="pt-4 pb-4">
              <p className="font-medium text-sm mb-1">URL do Webhook</p>
              <p className="text-xs text-muted-foreground mb-3">
                Envie essa URL ao suporte AutoConf. Eles irão configurar o envio de
                eventos (novo lead, sucesso, insucesso) para esse endereço.
              </p>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={webhookUrl}
                  className="font-mono text-xs h-9 bg-muted/30 select-all"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 px-3 shrink-0"
                  onClick={() => copyToClipboard(webhookUrl, "URL do webhook")}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Credentials */}
          {AUTOCONF_FIELDS.map((field) => {
            const value = values[field.key] || "";
            const isConfigured = !!value;
            const isVisible = visible[field.key];
            const isSaving = saving[field.key];

            return (
              <Card key={field.key}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{field.label}</p>
                    <Badge
                      variant={isConfigured ? "default" : "secondary"}
                      className={`text-[10px] px-1.5 py-0 ${
                        isConfigured
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isConfigured ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Configurado
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Pendente
                        </span>
                      )}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{field.description}</p>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={!isVisible ? "password" : "text"}
                        value={value}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                        }
                        placeholder={field.placeholder}
                        className="pr-10 font-mono text-xs h-9"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setVisible((prev) => ({ ...prev, [field.key]: !prev[field.key] }))
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                        title={isVisible ? "Hide password" : "Show password"}
                      >
                        {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {field.key === "AUTOCONF_WEBHOOK_SECRET" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={generateSecret}
                        className="h-9 px-3 shrink-0 gap-1.5 text-xs"
                        title="Gerar secret aleatório"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Gerar
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => saveField(field)}
                      disabled={isSaving}
                      className="h-9 px-3 shrink-0"
                    >
                      {isSaving ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Save className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Instructions */}
          <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <p className="text-xs font-medium text-blue-400 mb-1">Como configurar no AutoConf</p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Gere ou defina um Webhook Secret e salve</li>
              <li>Copie a URL do webhook acima</li>
              <li>
                Envie ao suporte AutoConf a URL e o secret — eles configuram o header{" "}
                <code className="font-mono bg-muted px-1 rounded">Authorization: Bearer &lt;secret&gt;</code>
              </li>
              <li>Informe o Revenda Token e o Bearer Token fornecidos pelo AutoConf</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
