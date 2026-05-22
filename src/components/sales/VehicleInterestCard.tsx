import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Car, CheckCircle2, XCircle, ArrowLeftRight, ShoppingCart, Tag } from "lucide-react";

interface Props {
  vehicleData: Record<string, unknown>;
  negotiationType?: string | null;
  source?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
}

interface StockVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  version: string | null;
  images: string[];
  is_sold: boolean;
  is_active: boolean;
  price: number | null;
}

function formatPrice(price: number | null) {
  if (!price) return null;
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function extractVehicleId(data: Record<string, unknown>): string | null {
  const raw = data.id ?? data.veiculo_id ?? data.vehicle_id ?? data.cod ?? null;
  return raw ? String(raw) : null;
}

function extractFallbackName(data: Record<string, unknown>): string {
  return String(
    data.title ?? data.titulo ?? data.name ?? data.nome ??
    [data.make ?? data.marca, data.model ?? data.modelo].filter(Boolean).join(" ") ??
    "Veículo não identificado"
  );
}

function extractFallbackImage(data: Record<string, unknown>): string | null {
  const raw = data.image ?? data.foto ?? data.imagem ?? data.thumbnail ?? null;
  return raw ? String(raw) : null;
}

const NEGOTIATION_ICONS: Record<string, React.ReactNode> = {
  troca: <ArrowLeftRight className="h-3 w-3" />,
  compra: <ShoppingCart className="h-3 w-3" />,
  venda: <Tag className="h-3 w-3" />,
};

function NegotiationBadge({ type }: { type: string }) {
  const normalized = type.toLowerCase();
  const icon = NEGOTIATION_ICONS[normalized] ?? <Car className="h-3 w-3" />;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border border-violet-500/30 bg-violet-500/10 text-violet-300">
      {icon}
      {type.toUpperCase()}
    </span>
  );
}

function SourceBadges({ source, utmSource, utmMedium }: { source?: string | null; utmSource?: string | null; utmMedium?: string | null }) {
  const parts: string[] = [];

  if (source) {
    source.split(/\s*\/\s*/).forEach((s) => {
      const trimmed = s.trim();
      if (trimmed && !parts.includes(trimmed)) parts.push(trimmed);
    });
  }
  if (utmSource && !parts.some((p) => p.toLowerCase() === utmSource.toLowerCase())) {
    parts.push(utmSource);
  }
  if (utmMedium && !parts.some((p) => p.toLowerCase() === utmMedium.toLowerCase())) {
    parts.push(utmMedium);
  }

  if (parts.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1.5">
      {parts.map((s) => (
        <span
          key={s}
          className="text-[10px] px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function VehicleInterestCard({ vehicleData, negotiationType, source, utmSource, utmMedium }: Props) {
  const vehicleId = extractVehicleId(vehicleData);

  const { data: vehicle, isLoading } = useQuery<StockVehicle | null>({
    queryKey: ["vehicle-stock", vehicleId],
    enabled: !!vehicleId,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("id, make, model, year, version, images, is_sold, is_active, price")
        .eq("id", vehicleId!)
        .maybeSingle();
      if (error) throw new Error(`Failed to fetch vehicle ${vehicleId}: ${error.message}`);
      return data as StockVehicle | null;
    },
  });

  const name = vehicle
    ? `${vehicle.make} ${vehicle.model} ${vehicle.year}`
    : extractFallbackName(vehicleData);

  const imageUrl = (vehicle?.images?.[0]) ?? extractFallbackImage(vehicleData) ?? null;

  const isSold = vehicle ? vehicle.is_sold : false;
  const isMatched = !!vehicle;

  return (
    <div className="mb-3 rounded-lg border border-blue-500/20 bg-blue-500/5 overflow-hidden">
      <div className="flex items-stretch gap-0">
        {/* Car photo */}
        <div className="w-20 shrink-0 bg-muted/30 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <Car className="h-6 w-6 text-muted-foreground/40" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-2.5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <p className="text-[10px] font-medium text-blue-400 uppercase tracking-wide">
                Veículo de interesse
              </p>
              <p className="text-sm font-semibold truncate leading-tight">{name}</p>
              {vehicle?.version && (
                <p className="text-xs text-muted-foreground truncate">{vehicle.version}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Stock status */}
            {isLoading ? (
              <span className="text-[10px] text-muted-foreground">buscando estoque...</span>
            ) : isMatched ? (
              isSold ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/25">
                  <XCircle className="h-3 w-3" />
                  VENDIDO
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/25">
                  <CheckCircle2 className="h-3 w-3" />
                  DISPONÍVEL
                </span>
              )
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted/40 border border-border/40">
                Não encontrado no estoque
              </span>
            )}

            {/* Price */}
            {vehicle?.price && !isSold && (
              <span className="text-[10px] font-medium text-foreground/70">
                {formatPrice(vehicle.price)}
              </span>
            )}

            {/* Negotiation type */}
            {negotiationType && <NegotiationBadge type={negotiationType} />}
          </div>

          {/* Sources */}
          <SourceBadges source={source} utmSource={utmSource} utmMedium={utmMedium} />
        </div>
      </div>
    </div>
  );
}
