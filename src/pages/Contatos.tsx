import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSalesLeads } from "@/hooks/useSalesLeads";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  MessageCircle,
  ArrowRight,
  Phone,
  RefreshCw,
  SortAsc,
  SortDesc,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SalesLead } from "@/types/sales.types";

const STAGE_LABELS: Record<string, { label: string; color: string }> = {
  captura: { label: "Captura", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  qualificacao: { label: "Qualificação", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  agendamento: { label: "Agendamento", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  negociacao: { label: "Negociação", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  fechado: { label: "Fechado", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  perdido: { label: "Perdido", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 13) {
    return `(${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

const Contatos = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"az" | "recent">("az");

  const { data: leadsData, isLoading, refetch } = useSalesLeads({
    search: search || undefined,
    hasPhone: true,
    pageSize: 1000,
  });

  const contacts = leadsData?.leads || [];

  const sortedContacts = useMemo(() => {
    if (sortBy === "az") {
      return [...contacts].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", "pt-BR", { sensitivity: "base" })
      );
    }
    return [...contacts].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [contacts, sortBy]);

  const handleWhatsApp = (lead: SalesLead, e: React.MouseEvent) => {
    e.stopPropagation();
    if (lead.phone) {
      window.open(`https://wa.me/${lead.phone.replace(/\D/g, "")}`);
    }
  };

  const handleView = (lead: SalesLead) => {
    navigate(`/comercial/contatos/${lead.id}`);
  };

  return (
    <AppLayout>
      <div className="space-y-5 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Users className="h-7 w-7 text-primary" />
              Contatos
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLoading
                ? "Carregando..."
                : `${sortedContacts.length} contato${sortedContacts.length !== 1 ? "s" : ""} com telefone`}
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* Search + Sort */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as "az" | "recent")}>
            <SelectTrigger className="w-[140px] shrink-0">
              {sortBy === "az" ? (
                <SortAsc className="h-4 w-4 mr-2" />
              ) : (
                <SortDesc className="h-4 w-4 mr-2" />
              )}
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="az">A → Z</SelectItem>
              <SelectItem value="recent">Mais Recentes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contact List */}
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[60px] rounded-lg" />
            ))}
          </div>
        ) : sortedContacts.length > 0 ? (
          <div className="divide-y divide-border rounded-lg border bg-card overflow-hidden">
            {sortedContacts.map((contact) => {
              const stage = contact.sales_stage ? STAGE_LABELS[contact.sales_stage] : null;
              return (
                <div
                  key={contact.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => handleView(contact)}
                >
                  {/* Avatar */}
                  <Avatar className="h-10 w-10 shrink-0">
                    {contact.photo_url && <AvatarImage src={contact.photo_url} />}
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {getInitials(contact.name || "?")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-foreground truncate leading-tight">
                        {contact.name || "Sem nome"}
                      </span>
                      {stage && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${stage.color}`}
                        >
                          {stage.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{formatPhone(contact.phone!)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300 dark:border-green-800 dark:hover:bg-green-950"
                      onClick={(e) => handleWhatsApp(contact, e)}
                      title="Iniciar conversa no WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleView(contact)}
                      title="Ver detalhes"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-lg bg-card">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {search ? "Nenhum contato encontrado" : "Nenhum contato com telefone"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {search
                ? "Tente ajustar a busca"
                : "Os contatos aparecem aqui automaticamente quando têm um número de telefone cadastrado."}
            </p>
            {search && (
              <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
                Limpar busca
              </Button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Contatos;
