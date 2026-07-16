/**
 * Helpers para templates da WhatsApp Cloud API.
 *
 * `whatsapp_cloud_templates` guarda apenas `components`, no formato cru da Meta.
 * Corpo e botões são derivados dele na hora de exibir.
 */

interface TemplateComponent {
  type?: string;
  text?: string;
  buttons?: { text: string }[];
}

function components(template: unknown): TemplateComponent[] {
  const comps = (template as { components?: unknown })?.components;
  return Array.isArray(comps) ? (comps as TemplateComponent[]) : [];
}

/** Texto do corpo (component BODY) do template. */
export function templateBodyText(template: unknown): string {
  return components(template).find((c) => c?.type === "BODY")?.text || "";
}

/** Botões (component BUTTONS) do template. */
export function templateButtons(template: unknown): { text: string }[] {
  return components(template).find((c) => c?.type === "BUTTONS")?.buttons || [];
}
