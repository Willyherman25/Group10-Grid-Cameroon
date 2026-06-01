import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap, ShieldCheck, Activity, Brain, AlertTriangle, Gauge,
  ArrowRight, MapPin, Users, Factory, Lightbulb, CheckCircle2,
} from "lucide-react";
import hero from "@/assets/hero-grid.jpg";
import engineer from "@/assets/engineer.jpg";
import hydro from "@/assets/hydro.jpg";

const stats = [
  { value: "2M+", label: "Customers served" },
  { value: "10/10", label: "Regions covered" },
  { value: "24/7", label: "Grid monitoring" },
  { value: "99.2%", label: "Uptime target" },
];

const aiFeatures = [
  { icon: ShieldCheck, title: "Theft Detection", desc: "Spot meter tampering and bypass patterns from consumption data." },
  { icon: AlertTriangle, title: "Outage Prediction", desc: "Forecast likely outages by region using weather and load signals." },
  { icon: Activity, title: "Load Forecasting", desc: "Predict 24-hour demand to balance generation and distribution." },
  { icon: Brain, title: "Anomaly Detection", desc: "Flag voltage, current, and frequency anomalies in real time." },
];

const services = [
  { icon: Lightbulb, title: "Residential", desc: "Reliable home electricity across urban and rural Cameroon." },
  { icon: Factory, title: "Industrial", desc: "Dedicated supply for industries with quality of service guarantees." },
  { icon: Gauge, title: "Smart Metering", desc: "Modern meters with remote reading and tamper detection." },
  { icon: Users, title: "Customer Care", desc: "Toll-free 8010 support, online billing, and outage reporting." },
];

const regions = [
  "Adamawa", "Centre", "East", "Far North", "Littoral",
  "North", "North-West", "South", "South-West", "West",
];

const Index = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={hero}
          alt="High-voltage transmission lines across Cameroon at sunrise"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container relative z-10 flex min-h-[78vh] flex-col items-start justify-center py-20 text-primary-foreground">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-secondary" />
            National Grid · Live monitoring active
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
            Powering Cameroon with reliable energy and intelligent grids.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
            Grid Cameroon distributes electricity to all 10 regions and uses AI to detect theft,
            predict outages, forecast load, and surface anomalies before they hurt service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="lg">
              <Link to="/dashboard">Open AI Dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <Link to="/services">Explore services</Link>
            </Button>
          </div>

          <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold md:text-3xl">{s.value}</div>
                <div className="text-sm text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI FEATURES */}
      <section className="bg-gradient-soft">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">AI for the grid</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Intelligence at every substation</h2>
            <p className="mt-3 text-muted-foreground">
              Four AI models work together on your meter and SCADA data to keep electricity flowing safely.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {aiFeatures.map((f) => (
              <Card key={f.title} className="group p-6 transition-base hover:shadow-elegant">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-soft-green text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/dashboard">Try the AI tools <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Our services</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Electricity for every Cameroonian</h2>
            <p className="mt-3 text-muted-foreground">
              From residential connections to heavy industry, we deliver dependable power and modern customer service.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.title} className="flex gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-soft-blue text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={engineer}
              alt="Grid Cameroon engineer inspecting a substation"
              loading="lazy"
              width={1024}
              height={768}
              className="rounded-xl shadow-elevated"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-lg border border-border bg-card p-4 shadow-elegant md:block">
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                <CheckCircle2 className="h-4 w-4" /> Quality of service
              </div>
              <p className="mt-1 max-w-[200px] text-xs text-muted-foreground">
                Field crews backed by AI dispatch in all 10 regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="bg-soft-blue">
        <div className="container py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <img
              src={hydro}
              alt="Hydroelectric dam in Cameroon"
              loading="lazy"
              width={1024}
              height={768}
              className="rounded-xl shadow-elevated"
            />
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-secondary">National coverage</span>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Serving all 10 regions of Cameroon</h2>
              <p className="mt-3 text-muted-foreground">
                Hydro, thermal and emerging solar feed a national grid that reaches from Maroua to Kribi.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {regions.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="overflow-hidden rounded-2xl bg-gradient-brand p-10 text-center text-primary-foreground shadow-elevated md:p-14">
          <Zap className="mx-auto h-10 w-10" />
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">A smarter grid, today.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Run real AI analyses on sample Cameroonian grid data — no setup needed.
          </p>
          <Button asChild variant="cta" size="lg" className="mt-6">
            <Link to="/dashboard">Launch the dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
