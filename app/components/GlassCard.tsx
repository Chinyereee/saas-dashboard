import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border border-[rgba(168,85,247,0.22)] bg-[rgba(17,10,31,0.55)] backdrop-blur-sm p-6",
      "before:content-[''] before:absolute before:top-0 before:left-6 before:right-6 before:h-px",
      "before:bg-gradient-to-r before:from-transparent before:via-[#c084fc] before:to-transparent",
      className
    )}>
      {children}
    </div>
  );
}
