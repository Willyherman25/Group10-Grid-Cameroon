import { Card } from "@/components/ui/card";

const About = () => (
  <>
    <section className="bg-gradient-soft">
      <div className="container py-16">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">About us</span>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold md:text-5xl">Cameroon's national electricity distributor.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We generate, transport and distribute electricity to households, businesses and public services across the
          ten regions of Cameroon — and we're modernising the grid with AI.
        </p>
      </div>
    </section>

    <section className="container grid gap-6 py-16 md:grid-cols-3">
      {[
        { title: "Our mission", desc: "Provide reliable, affordable electricity to every Cameroonian and business." },
        { title: "Our vision", desc: "A modern, AI-augmented grid that anticipates problems before they happen." },
        { title: "Our values", desc: "Safety, transparency, sustainability, and excellence in customer service." },
      ].map((b) => (
        <Card key={b.title} className="p-6">
          <h3 className="font-semibold text-primary">{b.title}</h3>
          <p className="mt-2 text-muted-foreground">{b.desc}</p>
        </Card>
      ))}
    </section>

    <section className="bg-soft-blue">
      <div className="container grid gap-6 py-16 md:grid-cols-4">
        {[
          { v: "2M+", l: "Customers" },
          { v: "10", l: "Regions covered" },
          { v: "1,500+", l: "Substations" },
          { v: "24/7", l: "Operations centre" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl bg-card p-6 text-center shadow-elegant">
            <div className="text-3xl font-bold text-primary">{s.v}</div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default About;
