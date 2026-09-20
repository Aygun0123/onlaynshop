import { Link } from "@tanstack/react-router";
import { CartDrawer } from "@/components/CartDrawer";
import logo from "@/assets/onlaynshop-logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="OnlaynShop" width={36} height={36} className="h-9 w-9" />
          <span className="text-lg font-semibold tracking-tight">
            Onlayn<span className="text-primary">Shop</span>
            <span className="text-primary">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="/#mehsullar" className="transition-colors hover:text-foreground">
            Məhsullar
          </a>
          <a href="/#brendler" className="transition-colors hover:text-foreground">
            Brendlər
          </a>
          <a href="/#catdirilma" className="transition-colors hover:text-foreground">
            Çatdırılma
          </a>
          <Link to="/panel" className="transition-colors hover:text-foreground">
            Məhsul əlavə et
          </Link>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
