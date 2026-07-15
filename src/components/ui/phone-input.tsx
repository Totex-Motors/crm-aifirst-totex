import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (digits: string) => void;
  placeholder?: string;
}

export function PhoneInput({ id, value, onChange, placeholder = "(11) 99999-9999" }: PhoneInputProps) {
  const format = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  return (
    <Input
      id={id}
      type="tel"
      value={format(value)}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      placeholder={placeholder}
    />
  );
}
