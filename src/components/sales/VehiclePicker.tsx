import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Car, Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type PickedVehicle = {
  id: string;
  title: string;
  seller: string;
  make: string | null;
  model: string | null;
  year: number | null;
  mileage: number | null;
  condition: string | null;
  color: string | null;
  price: number | null;
  image: string | null;
};

interface VehiclePickerProps {
  pipelineId?: string | null;
  value?: string | null;
  onChange: (vehicle: PickedVehicle | null) => void;
  placeholder?: string;
  className?: string;
}

function brl(n: number | null | undefined) {
  if (!n) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}

export function VehiclePicker({ pipelineId, value, onChange, placeholder = "Vincular veículo do estoque...", className }: VehiclePickerProps) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<PickedVehicle | null>(null);

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ["available-vehicles", pipelineId],
    staleTime: 60_000,
    enabled: open,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("list_available_vehicles", {
        p_pipeline_id: pipelineId || null,
        p_search: null,
        p_limit: 200,
      });
      if (error) throw error;
      return (data || []) as PickedVehicle[];
    },
  });

  // Hidrata estado quando value vem de fora (ex: deal já com vehicle_id)
  useEffect(() => {
    if (!value) {
      setPicked(null);
      return;
    }
    if (picked?.id === value) return;
    (async () => {
      const { data } = await supabase
        .from("vehicles")
        .select("id, title, seller, make, model, year, mileage, condition, color, price, images")
        .eq("id", value)
        .maybeSingle();
      if (data) {
        setPicked({
          id: data.id,
          title: data.title,
          seller: data.seller,
          make: data.make,
          model: data.model,
          year: data.year,
          mileage: data.mileage,
          condition: data.condition,
          color: data.color,
          price: data.price,
          image: (data.images as any)?.[0] || null,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSelect = (vehicleId: string) => {
    const v = vehicles.find((x) => x.id === vehicleId);
    if (!v) return;
    setPicked(v);
    onChange(v);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPicked(null);
    onChange(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between h-auto min-h-9 px-3 py-1.5", className)}
        >
          {picked ? (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {picked.image && (
                <img src={picked.image} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
              )}
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-xs font-medium truncate w-full text-left">{picked.title}</span>
                <span className="text-[10px] text-muted-foreground">{brl(picked.price)}</span>
              </div>
              <span
                role="button"
                tabIndex={-1}
                onClick={handleClear}
                className="rounded p-0.5 hover:bg-muted flex-shrink-0"
                aria-label="Remover veículo"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            </div>
          ) : (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Car className="h-4 w-4" />
              {placeholder}
            </span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[420px] p-0"
        align="start"
        // Garante que clicks dentro do popover nao "vazem" pra fora
        // (impede o Dialog parent de tratar como outside-click)
        style={{ pointerEvents: "auto" }}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <Command shouldFilter={true}>
          <CommandInput placeholder="Buscar por marca, modelo, placa..." />
          <CommandList className="max-h-[360px]">
            {isLoading ? (
              <div className="p-3 text-sm text-muted-foreground">Carregando estoque...</div>
            ) : (
              <>
                <CommandEmpty>Nenhum veículo encontrado</CommandEmpty>
                <CommandGroup>
                  {vehicles.map((v) => {
                    const isPicked = v.id === picked?.id;
                    // Texto de busca: tudo que o usuário pode digitar
                    const searchValue = [v.title, v.make, v.model, v.year, v.color].filter(Boolean).join(" ");
                    return (
                      <CommandItem
                        key={v.id}
                        value={`${v.id} ${searchValue}`}
                        onSelect={() => handleSelect(v.id)}
                        // Fallback caso onSelect seja bloqueado pelo Dialog/portal
                        onMouseDown={(e) => { e.preventDefault(); handleSelect(v.id); }}
                        className="flex items-start gap-2 px-2 py-2 cursor-pointer"
                      >
                        {v.image ? (
                          <img src={v.image} alt="" className="w-16 h-12 rounded object-cover flex-shrink-0 bg-muted" />
                        ) : (
                          <div className="w-16 h-12 rounded bg-muted flex items-center justify-center flex-shrink-0">
                            <Car className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium leading-tight truncate">{v.title}</div>
                          <div className="flex flex-wrap items-center gap-1 mt-1">
                            <Badge
                              variant={v.condition === "novo" ? "default" : "secondary"}
                              className={cn("text-[9px] py-0 h-4", v.condition === "novo" && "bg-emerald-600")}
                            >
                              {v.condition === "novo" ? "0KM" : "Seminovo"}
                            </Badge>
                            {v.year && <span className="text-[10px] text-muted-foreground">{v.year}</span>}
                            {v.mileage != null && (
                              <span className="text-[10px] text-muted-foreground">· {v.mileage.toLocaleString("pt-BR")} km</span>
                            )}
                          </div>
                          <div className="text-xs font-bold mt-0.5">{brl(v.price)}</div>
                        </div>
                        {isPicked && <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
