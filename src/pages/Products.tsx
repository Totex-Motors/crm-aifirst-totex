import { useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, RefreshCw, Search, ExternalLink, Gauge, Fuel, Calendar, MapPin, Tag, Plus } from "lucide-react";
import { useVehicles, useVehicleStats, useSyncVehicles, useVehicleMakes, type Vehicle } from "@/hooks/useVehicles";
import { usePipelines } from "@/hooks/usePipelineConfig";
import { CreateLeadOrDealModal } from "@/components/sales/CreateLeadOrDealModal";

function brl(n: number | null | undefined) {
  if (!n) return "—";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
}

function VehicleCard({ v, onCreateDeal }: { v: Vehicle; onCreateDeal: (v: Vehicle) => void }) {
  const cover = v.images?.[0];
  const isNew = v.condition === "novo";
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={v.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Car className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge variant={isNew ? "default" : "secondary"} className={isNew ? "bg-emerald-600" : ""}>
            {isNew ? "0 KM" : "Seminovo"}
          </Badge>
          <Badge variant="outline" className="bg-white/90 dark:bg-zinc-900/90">
            {v.seller}
          </Badge>
        </div>
        {v.promotion_price && v.promotion_price < (v.regular_price ?? Infinity) && (
          <Badge className="absolute top-2 right-2 bg-orange-500">Promoção</Badge>
        )}
      </div>
      <CardContent className="p-3 flex flex-col gap-2 flex-1">
        <div className="min-h-[40px]">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{v.title}</h3>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {v.year && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {v.year}
            </span>
          )}
          {v.mileage != null && (
            <span className="flex items-center gap-1">
              <Gauge className="h-3 w-3" />
              {v.mileage.toLocaleString("pt-BR")} km
            </span>
          )}
          {v.fuel && (
            <span className="flex items-center gap-1 capitalize">
              <Fuel className="h-3 w-3" />
              {v.fuel.replace(/-e-/g, " + ").replace(/-/g, " ")}
            </span>
          )}
        </div>

        {(v.body || v.color || v.gear) && (
          <div className="flex flex-wrap gap-1">
            {v.body && <Badge variant="outline" className="text-[10px] py-0">{v.body}</Badge>}
            {v.color && <Badge variant="outline" className="text-[10px] py-0 capitalize">{v.color}</Badge>}
            {v.gear && <Badge variant="outline" className="text-[10px] py-0 capitalize">{v.gear}</Badge>}
          </div>
        )}

        {v.location_city && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {v.location_city}/{v.location_state}
          </span>
        )}

        <div className="mt-auto pt-2 border-t">
          <div className="flex items-end justify-between gap-2 mb-2">
            <div>
              {v.promotion_price && v.promotion_price < (v.regular_price ?? Infinity) ? (
                <>
                  <div className="text-[11px] text-muted-foreground line-through">{brl(v.regular_price)}</div>
                  <div className="font-bold text-lg text-orange-600">{brl(v.promotion_price)}</div>
                </>
              ) : (
                <div className="font-bold text-lg">{brl(v.price)}</div>
              )}
            </div>
            {v.url && (
              <Button variant="outline" size="sm" asChild title="Ver anúncio">
                <a href={v.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>
          <Button
            size="sm"
            className="w-full gap-1.5"
            onClick={() => onCreateDeal(v)}
          >
            <Plus className="h-3.5 w-3.5" />
            Criar negócio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const Products = () => {
  const [seller, setSeller] = useState<string>("all");
  const [condition, setCondition] = useState<string>("all");
  const [make, setMake] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [dealVehicle, setDealVehicle] = useState<Vehicle | null>(null);

  const { data: vehicles = [], isLoading } = useVehicles({
    seller: seller === "all" ? undefined : seller,
    condition: condition === "all" ? undefined : (condition as "novo" | "usado"),
    make: make === "all" ? undefined : make,
    search: search || undefined,
  });
  const { data: stats } = useVehicleStats();
  const { data: makes = [] } = useVehicleMakes();
  const { data: pipelines = [] } = usePipelines();
  const sync = useSyncVehicles();

  // Mapeia o seller (Cardoso Veiculos / Prime) para o pipeline correspondente
  const dealPipelineId = useMemo(() => {
    if (!dealVehicle) return undefined;
    const norm = (s: string) =>
      (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
    const target = norm(dealVehicle.seller);
    return pipelines.find((p) => norm(p.name) === target)?.id;
  }, [dealVehicle, pipelines]);

  const handleCreateDeal = (v: Vehicle) => {
    setDealVehicle(v);
    setDealModalOpen(true);
  };

  return (
    <AppLayout
      title="Estoque de Veículos"
      subtitle="Sincronizado automaticamente do feed XML a cada 15 min"
      icon={<Car className="h-6 w-6" />}
      breadcrumbs={[
        { label: "Comercial", href: "/comercial" },
        { label: "Estoque" },
      ]}
    >
      <div className="p-6 space-y-4">
        {/* Header stats + sync */}
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-3">
            {stats && (
              <>
                <div className="px-4 py-2 rounded-lg border bg-card">
                  <div className="text-xs text-muted-foreground">Total ativo</div>
                  <div className="text-xl font-bold">{stats.total}</div>
                </div>
                {Object.entries(stats.bySeller).map(([s, st]) => (
                  <div key={s} className="px-4 py-2 rounded-lg border bg-card">
                    <div className="text-xs text-muted-foreground">{s}</div>
                    <div className="text-xl font-bold">
                      {st.total}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({st.novos}n + {st.usados}u)
                      </span>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2 rounded-lg border bg-card">
                  <div className="text-xs text-muted-foreground">Valor total estoque</div>
                  <div className="text-xl font-bold">{brl(stats.valor_total)}</div>
                </div>
              </>
            )}
          </div>
          <Button onClick={() => sync.mutate()} disabled={sync.isPending} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${sync.isPending ? "animate-spin" : ""}`} />
            {sync.isPending ? "Sincronizando..." : "Sincronizar agora"}
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por marca, modelo, placa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={seller} onValueChange={setSeller}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as marcas</SelectItem>
              <SelectItem value="Cardoso Veículos">Cardoso Veículos</SelectItem>
              <SelectItem value="Cardoso Prime">Cardoso Prime</SelectItem>
            </SelectContent>
          </Select>

          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Novos + Usados</SelectItem>
              <SelectItem value="novo">0 KM</SelectItem>
              <SelectItem value="usado">Seminovo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={make} onValueChange={setMake}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Fabricante" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {makes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grid de veículos */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Car className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum veículo encontrado com esses filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} v={v} onCreateDeal={handleCreateDeal} />
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center pt-4 border-t">
          <Tag className="inline h-3 w-3 mr-1" />
          Feed sincronizado a cada 15 min · {vehicles.length} veículos exibidos
        </p>
      </div>

      {/* Modal: criar lead + deal vinculado ao veiculo escolhido */}
      <CreateLeadOrDealModal
        open={dealModalOpen}
        onOpenChange={(o) => {
          setDealModalOpen(o);
          if (!o) setDealVehicle(null);
        }}
        mode="lead"
        pipelineId={dealPipelineId}
        defaultVehicleId={dealVehicle?.id}
      />
    </AppLayout>
  );
};

export default Products;
