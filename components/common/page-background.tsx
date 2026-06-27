import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function PageBackground({ children, className }: Props) {
  return (
    <div className={cn("relative overflow-hidden py-20", className)}>
      <div className="absolute -left-30 -top-30 h-130 w-130 rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute -right-37.5 -bottom-37.5 h-120 w-120 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      <div className="absolute left-1/2 top-1/3 h-75 w-75 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="wrapper relative z-10">{children}</div>
    </div>
  );
}
