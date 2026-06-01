import { Card } from "@/components/ui/card";
import { Lightbulb, Factory, Gauge, Users, Zap, Headphones, FileText, Wrench } from "lucide-react";
import meter from "@/assets/meter.jpg";

const services = [
  { icon: Lightbulb, title: "Residential supply", desc: "Reliable single-phase and three-phase electricity for homes." },
  { icon: Factory, title: "Industrial supply", desc: "Medium and high-voltage supply with QoS contracts." },
  { icon: Gauge, title: "Smart metering", desc: "Two-way communicating meters with tamper detection." },
  { icon: Wrench, title: "Connections & installation", desc: "New connections, upgrades, and certified field work." },
  { icon: FileText, title: "Online billing", desc: "View bills, top-up prepaid, and download invoices." },
  { icon: Headphones, title: "Customer care", desc: "Toll-free 8010, mobile app and walk-in agencies." },
  { icon: Zap, title: "Outage reporting", desc: "Report and track outages with live regional status." },
  { icon: Users, title: "Public lighting", desc: "Municipal lighting design, maintenance and energy audits." },
];

const Services = () => (
  <>
    <section className="bg-gradient-soft">
      <div className="container py-16">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">Services</span>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold md:text-5xl">Everything you need to power your home or business.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Grid Cameroon delivers a complete suite of electricity services — from connections and metering to industrial supply and customer care.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card key={s.title} className="p-6 transition-base hover:shadow-elegant">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-soft-blue text-primary">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
          </Card>
        ))}
      </div>
    </section>

    <section className="bg-soft-green">
      <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
<img src={meter} alt="Smart electricity meter" loading="lazy" width={1024} height={768} className="rounded-xl shadow-elegant" />
        <div>
          <h2 className="text-3xl font-bold">Smart metering for transparent billing</h2>
          <p className="mt-3 text-muted-foreground">
            Our smart meters report consumption in real time, reduce billing disputes, and feed our AI theft-detection
            and anomaly models. Customers can recharge prepaid meters from their phone in seconds.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default Services;
