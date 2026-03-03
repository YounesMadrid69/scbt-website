import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "outline-light" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-[family-name:var(--font-verbatim)] uppercase tracking-wider transition-all duration-300 rounded-sm";

  const variants = {
    primary:
      "bg-blue-accent text-white hover:bg-blue-light shadow-lg hover:shadow-blue-accent/25",
    outline:
      "border-2 border-blue-primary/40 text-blue-primary hover:border-blue-accent hover:bg-blue-accent/10",
    "outline-light":
      "border-2 border-white/30 text-white hover:border-blue-accent hover:bg-blue-accent/10",
    gold: "bg-gold text-navy-deep hover:bg-gold/90 shadow-lg hover:shadow-gold/25",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
