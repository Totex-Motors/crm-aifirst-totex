import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  UserCheck,
  Target,
  Clock,
  Check,
  X,
  HelpCircle,
  Building2,
  Users,
  Pencil,
  ShoppingCart,
  Repeat,
  CreditCard,
  Car,
  Search,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { BANTQualification, SalesLead } from "@/types/sales.types";

interface BANTIndicatorProps {
  bant: BANTQualification;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  onUpdate?: (key: keyof BANTQualification, value: boolean | null) => void;
  interactive?: boolean;
}

const bantConfig = {
  budget: {
    label: "Budget",
    description: "Tem orçamento disponível?",
    icon: DollarSign,
    color: "emerald",
  },
  authority: {
    label: "Authority",
    description: "É o decisor ou influenciador?",
    icon: UserCheck,
    color: "blue",
  },
  need: {
    label: "Need",
    description: "Tem necessidade clara do produto?",
    icon: Target,
    color: "purple",
  },
  timeline: {
    label: "Timeline",
    description: "Tem prazo definido para decisão?",
    icon: Clock,
    color: "amber",
  },
};

const sizeClasses = {
  sm: {
    container: "gap-1",
    icon: "h-4 w-4",
    wrapper: "w-6 h-6",
  },
  md: {
    container: "gap-1.5",
    icon: "h-4 w-4",
    wrapper: "w-7 h-7",
  },
  lg: {
    container: "gap-2",
    icon: "h-5 w-5",
    wrapper: "w-8 h-8",
  },
};

function getStatusStyle(value: boolean | null | undefined, color: string) {
  if (value === true) {
    return {
      bg: `bg-${color}-100`,
      border: `border-${color}-300`,
      text: `text-${color}-600`,
      statusIcon: Check,
    };
  }
  if (value === false) {
    return {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-400",
      statusIcon: X,
    };
  }
  return {
    bg: "bg-muted/50",
    border: "border-muted-foreground/20",
    text: "text-muted-foreground/50",
    statusIcon: HelpCircle,
  };
}

export function BANTIndicator({
  bant,
  size = "md",
  showLabels = false,
  onUpdate,
  interactive = false,
}: BANTIndicatorProps) {
  const sizeClass = sizeClasses[size];

  const handleClick = (key: keyof BANTQualification) => {
    if (!interactive || !onUpdate) return;

    const currentValue = bant[key];
    // Cycle through: null -> true -> false -> null
    let newValue: boolean | null;
    if (currentValue === null || currentValue === undefined) {
      newValue = true;
    } else if (currentValue === true) {
      newValue = false;
    } else {
      newValue = null;
    }
    onUpdate(key, newValue);
  };

  return (
    <TooltipProvider>
      <div className={cn("flex items-center", sizeClass.container)}>
        {(Object.keys(bantConfig) as Array<keyof typeof bantConfig>).map((key) => {
          const config = bantConfig[key];
          const value = bant[key];
          const style = getStatusStyle(value, config.color);
          const Icon = config.icon;

          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleClick(key)}
                  disabled={!interactive}
                  className={cn(
                    "rounded-full flex items-center justify-center border transition-all",
                    sizeClass.wrapper,
                    style.bg,
                    style.border,
                    style.text,
                    interactive && "hover:scale-110 cursor-pointer",
                    !interactive && "cursor-default"
                  )}
                >
                  <Icon className={sizeClass.icon} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-center">
                <p className="font-medium">{config.label}</p>
                <p className="text-xs text-muted-foreground">{config.description}</p>
                <p className="text-xs mt-1">
                  Status:{" "}
                  <span className={style.text}>
                    {value === true ? "Sim" : value === false ? "Não" : "Não verificado"}
                  </span>
                </p>
                {interactive && (
                  <p className="text-xs text-muted-foreground mt-1">Clique para alterar</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {showLabels && (
          <span className="ml-1 text-xs text-muted-foreground">
            {Object.values(bant).filter(Boolean).length}/4 BANT
          </span>
        )}
      </div>
    </TooltipProvider>
  );
}

// Full BANT card with details
export function BANTCard({
  bant,
  onUpdate,
  className,
}: {
  bant: BANTQualification;
  onUpdate?: (key: keyof BANTQualification, value: boolean | null) => void;
  className?: string;
}) {
  const score = Object.values(bant).filter(Boolean).length;
  const scorePercent = (score / 4) * 100;

  return (
    <div className={cn("rounded-lg border p-4 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">Qualificação BANT</h4>
        <span className={cn(
          "text-sm font-bold",
          scorePercent >= 75 ? "text-emerald-600" :
          scorePercent >= 50 ? "text-amber-600" :
          "text-muted-foreground"
        )}>
          {score}/4
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(bantConfig) as Array<keyof typeof bantConfig>).map((key) => {
          const config = bantConfig[key];
          const value = bant[key];
          const style = getStatusStyle(value, config.color);
          const Icon = config.icon;

          return (
            <button
              key={key}
              onClick={() => {
                if (!onUpdate) return;
                const currentValue = bant[key];
                let newValue: boolean | null;
                if (currentValue === null || currentValue === undefined) {
                  newValue = true;
                } else if (currentValue === true) {
                  newValue = false;
                } else {
                  newValue = null;
                }
                onUpdate(key, newValue);
              }}
              disabled={!onUpdate}
              className={cn(
                "flex items-center gap-2 p-2 rounded-lg border transition-all text-left",
                style.bg,
                style.border,
                onUpdate && "hover:scale-[1.02] cursor-pointer",
                !onUpdate && "cursor-default"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                value === true ? `bg-${config.color}-200` : "bg-muted"
              )}>
                <Icon className={cn("h-4 w-4", style.text)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{config.label}</p>
                <p className={cn("text-xs", style.text)}>
                  {value === true ? "Confirmado" : value === false ? "Negativo" : "Pendente"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300 rounded-full",
            scorePercent >= 75 ? "bg-emerald-500" :
            scorePercent >= 50 ? "bg-amber-500" :
            scorePercent >= 25 ? "bg-blue-500" :
            "bg-slate-400"
          )}
          style={{ width: `${scorePercent}%` }}
        />
      </div>
    </div>
  );
}

// =====================================================
// QUALIFICATION CARD — Real qualification fields
// =====================================================

type QualificationField =
  | 'intent_buy_only'
  | 'intent_trade_in'
  | 'intent_finance_no_entry'
  | 'intent_cash'
  | 'intent_sell'
  | 'intent_special_search';

const qualificationFields: Array<{
  key: QualificationField;
  label: string;
  icon: typeof Building2;
  color: string;
  type: 'boolean';
  description: string;
}> = [
  { key: 'intent_buy_only',         label: 'Quer comprar (sem troca)',  icon: ShoppingCart, color: 'blue',    type: 'boolean', description: 'Cliente quer apenas comprar, não tem carro pra dar de entrada' },
  { key: 'intent_trade_in',         label: 'Tem carro pra trocar',      icon: Repeat,       color: 'purple',  type: 'boolean', description: 'Vai dar carro de entrada na negociação' },
  { key: 'intent_finance_no_entry', label: 'Financiar sem entrada',     icon: CreditCard,   color: 'orange',  type: 'boolean', description: 'Cliente precisa de financiamento sem dar valor de entrada' },
  { key: 'intent_cash',             label: 'Compra à vista',            icon: DollarSign,   color: 'emerald', type: 'boolean', description: 'Pagamento à vista' },
  { key: 'intent_sell',             label: 'Quer vender carro',         icon: Car,          color: 'rose',    type: 'boolean', description: 'Cliente quer apenas vender, não comprar' },
  { key: 'intent_special_search',   label: 'Busca fora do estoque',     icon: Search,       color: 'amber',   type: 'boolean', description: 'Car hunter — quer um carro que não temos disponível' },
];

function InlineEditField({
  value,
  fieldConfig,
  onSave,
}: {
  value: boolean | null | undefined;
  fieldConfig: typeof qualificationFields[number];
  onSave: (value: boolean) => void;
}) {
  const Icon = fieldConfig.icon;
  const isOn = value === true;

  return (
    <button
      type="button"
      onClick={() => onSave(!isOn)}
      title={fieldConfig.description}
      className={cn(
        "w-full flex items-start gap-2.5 p-2.5 rounded-lg border transition-all group text-left hover:shadow-sm",
        isOn
          ? `bg-${fieldConfig.color}-50/70 border-${fieldConfig.color}-200`
          : "bg-muted/30 border-muted-foreground/10 hover:bg-muted/50"
      )}
    >
      <div className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors",
        isOn ? `bg-${fieldConfig.color}-100 text-${fieldConfig.color}-600` : "bg-muted text-muted-foreground/50"
      )}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-[12px] font-medium leading-tight",
          isOn ? "text-foreground" : "text-muted-foreground"
        )}>
          {fieldConfig.label}
        </p>
        <p className="text-[10px] text-muted-foreground/70 leading-tight mt-0.5 truncate">
          {fieldConfig.description}
        </p>
      </div>
      <div className={cn(
        "w-9 h-5 rounded-full flex items-center transition-colors shrink-0 mt-1",
        isOn ? `bg-${fieldConfig.color}-500` : "bg-muted-foreground/20"
      )}>
        <div className={cn(
          "w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
          isOn ? "translate-x-[18px]" : "translate-x-0.5"
        )} />
      </div>
    </button>
  );
}

export function QualificationCard({
  lead,
  onUpdate,
  className,
}: {
  lead: Partial<Record<QualificationField, boolean | null>>;
  onUpdate: (field: QualificationField, value: boolean) => void;
  className?: string;
}) {
  const filledCount = qualificationFields.filter((f) => lead[f.key] === true).length;
  const progressPercent = (filledCount / qualificationFields.length) * 100;

  return (
    <div className={cn("rounded-lg border p-4 space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">Perfil do Lead</h4>
        <span className={cn(
          "text-sm font-bold",
          filledCount > 0 ? "text-emerald-600" : "text-muted-foreground"
        )}>
          {filledCount}/{qualificationFields.length}
        </span>
      </div>

      <p className="text-[11px] text-muted-foreground -mt-1">
        Marque os perfis identificados na conversa
      </p>

      <div className="space-y-1.5">
        {qualificationFields.map((field) => (
          <InlineEditField
            key={field.key}
            value={lead[field.key] as boolean | null | undefined}
            fieldConfig={field}
            onSave={(val) => onUpdate(field.key, val)}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300 rounded-full",
            progressPercent >= 75 ? "bg-emerald-500" :
            progressPercent >= 50 ? "bg-amber-500" :
            progressPercent >= 25 ? "bg-blue-500" :
            "bg-slate-400"
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
