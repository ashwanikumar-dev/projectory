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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string[];
  helperText?: string;
  textarea?: boolean;
}

const fieldClass =
  "rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl px-4 text-sm shadow-[0_8px_24px_rgba(0,0,0,.05)] transition-all duration-300 placeholder:text-muted-foreground/60 hover:border-primary/30 hover:bg-background/80 focus-visible:border-primary/40 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60";

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
    <div className="space-y-3">
      <Label
        className="mb-2 block text-sm font-semibold tracking-wide"
        htmlFor={id}
      >
        {label}
      </Label>

      {textarea ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`min-h-36 resize-y py-3 leading-7 ${fieldClass}`}
        />
      ) : (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`h-12 ${fieldClass}`}
        />
      )}

      {helperText && (
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {helperText}
        </p>
      )}

      {error?.length ? (
        <div className="mt-3 rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
          {error.join(", ")}
        </div>
      ) : null}
    </div>
  );
};
