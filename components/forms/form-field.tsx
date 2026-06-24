import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  required: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  error: string[];
  helperText?: string;
  textarea?: boolean;
}

export const FormField = ({
  label,
  name,
  id,
  placeholder,
  required,
  onChange,
  error,
  helperText,
  textarea,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="mb-2 block text-sm font-medium" htmlFor={id}>
        {label}
      </Label>
      {textarea ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
          }
          className="
    min-h-[140px]
    resize-y
    rounded-xl
    border-border/50
    bg-muted/20
    px-4
    py-3
    text-sm
    leading-6
    shadow-sm
    transition-all
    duration-200
    placeholder:text-muted-foreground/70
    hover:border-primary/20
    hover:bg-muted/30
    focus-visible:border-primary/40
    focus-visible:bg-background
    focus-visible:ring-4
    focus-visible:ring-primary/10
  "
        />
      ) : (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          className="
    h-12
    rounded-xl
    border-border/50
    bg-muted/20
    px-4
    text-sm
    transition-all
    duration-200
    placeholder:text-muted-foreground
    hover:bg-muted/30
    hover:border-primary/20
    focus-visible:border-primary/40
    focus-visible:bg-background
    focus-visible:ring-4
    focus-visible:ring-primary/10
  "
        />
      )}
      {helperText && (
        <p className="mt-2 text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && <p className="text-sm text-destructive">{error.join(", ")}</p>}
    </div>
  );
};
