
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-4 px-4 sm:px-6 bg-hawk-card shadow-sm", className)}>
      <div className="container mx-auto flex items-center gap-2">
        <div className="flex items-center">
          <span className="text-hawk-primary text-3xl">🦅</span>
          <h1 className="text-xl sm:text-2xl font-bold ml-2">
            <span className="text-hawk-primary">Price</span>
            <span className="text-hawk-accent">Hawk</span>
          </h1>
        </div>
        <p className="hidden sm:block text-muted-foreground ml-4 text-sm">
          Compare prices across e-commerce platforms
        </p>
      </div>
    </header>
  );
};

export default Header;
