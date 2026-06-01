import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="mt-20 border-t border-border bg-soft-blue">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-brand text-primary-foreground">
              <Zap className="h-5 w-5" />
            </span>
            <span className="text-lg">Grid<span className="text-primary">Cameroon</span></span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Powering Cameroon with reliable electricity and intelligent grid monitoring across all 10 regions.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Residential Power</Link></li>
            <li><Link to="/services" className="hover:text-primary">Industrial Supply</Link></li>
            <li><Link to="/services" className="hover:text-primary">Smart Metering</Link></li>
            <li><Link to="/services" className="hover:text-primary">Outage Reporting</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About us</Link></li>
            <li><Link to="/news" className="hover:text-primary">News</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">AI Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 8010 (Toll free)</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contact@gridcameroon.cm</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Douala, Cameroon</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Grid Cameroon. All rights reserved.</p>
          <p>Powering all 10 regions of Cameroon.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
