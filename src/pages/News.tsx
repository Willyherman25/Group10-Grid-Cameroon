import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const news = [
  { date: "Apr 12, 2026", tag: "Innovation", title: "AI-powered theft detection rolled out to Douala and Yaoundé", excerpt: "Our new model has flagged hundreds of tampering cases in its first month, helping recover lost revenue." },
  { date: "Mar 28, 2026", tag: "Infrastructure", title: "New 90 MW substation commissioned in the Littoral region", excerpt: "The substation strengthens supply to the industrial belt around Douala." },
  { date: "Feb 19, 2026", tag: "Customer", title: "Mobile recharge for prepaid meters now available nationwide", excerpt: "Customers can now top up prepaid meters in seconds from any mobile network." },
  { date: "Jan 30, 2026", tag: "Sustainability", title: "Solar pilot launched in the Far North region", excerpt: "A 5 MW solar pilot will complement existing hydro and thermal sources." },
  { date: "Dec 14, 2025", tag: "Service", title: "Outage map goes live for all 10 regions", excerpt: "Real-time outage information is now available on the AI dashboard." },
  { date: "Nov 02, 2025", tag: "Safety", title: "Public safety campaign on illegal connections", excerpt: "We're partnering with municipalities to reduce dangerous illegal connections." },
];

const News = () => (
  <>
    <section className="bg-gradient-soft">
      <div className="container py-16">
        <span className="text-sm font-semibold uppercase tracking-wider text-secondary">Newsroom</span>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold md:text-5xl">Latest from Grid Cameroon</h1>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
          <Card key={n.title} className="overflow-hidden transition-base hover:shadow-elegant">
            <div className="h-2 bg-gradient-brand" />
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {n.date}</span>
                <span className="rounded-full bg-soft-green px-2 py-0.5 font-medium text-secondary">{n.tag}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  </>
);

export default News;
