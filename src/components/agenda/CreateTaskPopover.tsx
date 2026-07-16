import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";

interface CreateTaskPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRect?: { x: number; y: number };
  defaultStart: Date;
  defaultEnd: Date;
  onCreateTask?: (start: Date) => void;
  children?: React.ReactNode;
}

export function CreateTaskPopover({
  open,
  onOpenChange,
  defaultStart,
  defaultEnd,
  onCreateTask,
  children,
}: CreateTaskPopoverProps) {
  const formatTime = (d: Date) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  const formatDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children || <span />}</PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start" side="right">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-2">
            {formatDate(defaultStart)} {formatTime(defaultStart)} – {formatTime(defaultEnd)}
          </p>
          {onCreateTask && (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => {
                onOpenChange(false);
                onCreateTask(defaultStart);
              }}
            >
              <ListTodo className="h-4 w-4" />
              Criar tarefa
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
