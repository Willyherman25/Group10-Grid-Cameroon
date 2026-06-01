import { Link, NavLink } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/dashboard", label: "AI Dashboard" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-brand text-primary-foreground shadow-elegant">
            <Zap className="h-5 w-5" />
          </span>
          <span className="text-lg">
            Grid<span className="text-primary">Cameroon</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-base hover:bg-muted hover:text-foreground",
                  isActive && "bg-soft-blue text-primary"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="hero" size="sm">
            <Link to="/dashboard">Launch Dashboard</Link>
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    isActive ? "bg-soft-blue text-primary" : "text-muted-foreground"
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Button asChild variant="hero" className="mt-2">
              <Link to="/dashboard" onClick={() => setOpen(false)}>Launch Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
