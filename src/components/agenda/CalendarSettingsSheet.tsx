import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, XCircle } from "lucide-react";

interface CalendarSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CalendarSettingsSheet({ open, onOpenChange }: CalendarSettingsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Configurar Agenda</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <MeetingsTab />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Tab: Reuniões & Google ────────────────────────────────────────────

function MeetingsTab() {
  const { teamMember } = useAuth();

  const googleConnected = teamMember?.google_calendar_connected || false;

  return (
    <div className="space-y-6">
      {/* Google Calendar status */}
      <div className="space-y-2">
        <Label>Google Calendar</Label>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            {googleConnected ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Conectado</p>
                  <p className="text-xs text-muted-foreground">
                    Eventos do Google Calendar aparecem na sua agenda e são considerados pelo agente IA.
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">Não conectado</p>
                  <p className="text-xs text-muted-foreground">
                    Conecte sua conta Google em Configurações para sincronizar eventos.
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
