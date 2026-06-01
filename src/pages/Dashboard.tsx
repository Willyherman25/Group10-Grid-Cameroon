import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle, Activity, Brain, Loader2, Sparkles, Gauge, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AnalysisType = "theft" | "outage" | "load" | "anomaly";

const samples: Record<AnalysisType, string> = {
  theft: `meter_id,region,kwh_billed_avg_30d,kwh_metered_last_24h,line_loss_pct,tamper_events_30d,bypass_signal,reverse_current_events
MTR-001,Littoral,420,18.5,4.2,0,false,0
MTR-002,Centre,310,2.1,38.5,3,true,2
MTR-003,Far North,180,9.8,5.8,0,false,0
MTR-004,South-West,650,11.2,42.1,1,false,1
MTR-005,West,290,12.4,3.9,0,false,0`,
  outage: `region,date,avg_load_mw,peak_load_mw,weather,wind_kmh,rainfall_mm,vegetation_alerts,equipment_age_yrs
Littoral,2026-04-21,180,260,Thunderstorm,55,42,7,18
Centre,2026-04-21,160,210,Cloudy,18,3,2,9
Far North,2026-04-21,55,90,Hot dry,12,0,0,22
North-West,2026-04-21,80,130,Rain,35,28,4,15`,
  load: `timestamp,total_load_mw,temp_c,humidity_pct,is_holiday
2026-04-20T18:00,1180,29,72,false
2026-04-20T19:00,1290,28,75,false
2026-04-20T20:00,1340,27,76,false
2026-04-20T21:00,1280,26,78,false
2026-04-20T22:00,1090,26,80,false
2026-04-20T23:00,920,25,82,false`,
  anomaly: `device_id,timestamp,voltage_v,current_a,frequency_hz,temperature_c
SUB-A12,2026-04-21T10:00,231,420,50.0,42
SUB-A12,2026-04-21T10:05,229,418,49.9,43
SUB-A12,2026-04-21T10:10,198,612,49.4,71
SUB-A12,2026-04-21T10:15,232,419,50.0,44
SUB-B07,2026-04-21T10:00,398,210,50.0,38`,
};

const meta: Record<AnalysisType, { title: string; desc: string; icon: any; color: string }> = {
  theft: { title: "Theft Detection", desc: "Detect meter tampering, bypass and unusual loss patterns.", icon: ShieldCheck, color: "text-secondary" },
  outage: { title: "Outage Prediction", desc: "Predict outage risk per region using load + weather signals.", icon: AlertTriangle, color: "text-warning" },
  load: { title: "Load Forecasting", desc: "Forecast next 24h demand from recent readings.", icon: Activity, color: "text-primary" },
  anomaly: { title: "Anomaly Detection", desc: "Surface voltage / current / frequency anomalies in real time.", icon: Brain, color: "text-secondary" },
};

const StatPill = ({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "warn" | "danger" | "ok" }) => {
  const map = {
    default: "bg-soft-blue text-primary",
    warn: "bg-warning/15 text-warning",
    danger: "bg-destructive/10 text-destructive",
    ok: "bg-soft-green text-secondary",
  } as const;
  return (
    <div className={`rounded-lg px-3 py-2 ${map[tone]}`}>
      <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{label}</div>
      <div className="text-base font-bold">{value}</div>
    </div>
  );
};

const RiskBadge = ({ level }: { level: string }) => {
  const l = (level || "").toLowerCase();
  const cls = l.includes("high") || l.includes("critical")
    ? "bg-destructive text-destructive-foreground"
    : l.includes("med")
    ? "bg-warning text-warning-foreground"
    : "bg-secondary text-secondary-foreground";
  return <Badge className={cls}>{level}</Badge>;
};

const Dashboard = () => {
  const [tab, setTab] = useState<AnalysisType>("theft");
  const [input, setInput] = useState(samples.theft);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onTabChange = (v: string) => {
    const t = v as AnalysisType;
    setTab(t);
    setInput(samples[t]);
    setResult(null);
  };

  const run = async () => {
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("ai-grid-analysis", {
        body: { type: tab, data: input },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResult(data);
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes("429")) toast.error("Rate limit reached. Please try again in a moment.");
      else if (msg.includes("402")) toast.error("AI credits exhausted. Top up in Settings → Workspace → Usage.");
      else toast.error(msg || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const M = meta[tab];

  return (
    <>
      <section className="bg-gradient-soft">
        <div className="container py-12">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-4 w-4" /> AI Operations Dashboard
          </div>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold md:text-5xl">Run live AI analyses on grid data</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Pick an analysis, edit or paste your CSV, and Grid Cameroon's AI will return findings, risk scores and
            recommended actions powered by Lovable AI.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <StatPill label="Customers" value="2M+" />
            <StatPill label="Regions" value="10/10" tone="ok" />
            <StatPill label="Active alerts" value="3" tone="warn" />
            <StatPill label="Avg load" value="1,290 MW" />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <Tabs value={tab} onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="theft" className="gap-2"><ShieldCheck className="h-4 w-4" /> Theft</TabsTrigger>
            <TabsTrigger value="outage" className="gap-2"><AlertTriangle className="h-4 w-4" /> Outage</TabsTrigger>
            <TabsTrigger value="load" className="gap-2"><Activity className="h-4 w-4" /> Load</TabsTrigger>
            <TabsTrigger value="anomaly" className="gap-2"><Brain className="h-4 w-4" /> Anomaly</TabsTrigger>
          </TabsList>

          {(Object.keys(meta) as AnalysisType[]).map((k) => (
            <TabsContent key={k} value={k} className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                  <div className="flex items-start gap-3">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-md bg-soft-blue ${meta[k].color}`}>
                      <M.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{meta[k].title}</h2>
                      <p className="text-sm text-muted-foreground">{meta[k].desc}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <Label htmlFor="data">Input data (CSV)</Label>
                    <Textarea
                      id="data"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={12}
                      className="font-mono text-xs"
                    />
                    <p className="text-xs text-muted-foreground">
                      Sample Cameroonian grid data is pre-loaded. Edit it or paste your own.
                    </p>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Button onClick={run} variant="hero" disabled={loading || !input.trim()}>
                      {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analysing...</> : <><Sparkles className="h-4 w-4" /> Run AI analysis</>}
                    </Button>
                    <Button variant="outline" onClick={() => setInput(samples[k])} disabled={loading}>
                      Reset sample
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Results</h2>
                  </div>

                  {!result && !loading && (
                    <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 py-14 text-center text-muted-foreground">
                      <Zap className="h-8 w-8 opacity-60" />
                      <p className="mt-2 text-sm">Run an analysis to see findings here.</p>
                    </div>
                  )}

                  {loading && (
                    <div className="mt-8 flex flex-col items-center justify-center py-14 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <p className="mt-2 text-sm">Crunching grid data with AI...</p>
                    </div>
                  )}

                  {result && (
                    <div className="mt-5 space-y-5 animate-fade-in">
                      <div className="rounded-lg bg-soft-blue p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Summary</span>
                          {result.risk_level && <RiskBadge level={result.risk_level} />}
                        </div>
                        <p className="mt-2 text-sm text-foreground">{result.summary}</p>
                      </div>

                      {Array.isArray(result.findings) && result.findings.length > 0 && (
                        <div>
                          <h3 className="mb-2 text-sm font-semibold">Findings</h3>
                          <ul className="space-y-2">
                            {result.findings.map((f: any, i: number) => (
                              <li key={i} className="rounded-lg border border-border bg-card p-3">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-medium">{f.id || f.region || f.device || `Item ${i + 1}`}</span>
                                  {f.severity && <RiskBadge level={f.severity} />}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{f.detail || f.description}</p>
                                {typeof f.confidence === "number" && (
                                  <p className="mt-1 text-xs text-muted-foreground">Confidence: {Math.round(f.confidence * 100)}%</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {Array.isArray(result.forecast) && result.forecast.length > 0 && (
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-semibold">24h forecast (MW)</h3>
                            <span className="text-xs text-muted-foreground">
                              Peak {Math.max(...result.forecast.map((x: any) => x.load_mw || 0)).toLocaleString()} MW
                            </span>
                          </div>
                          <div className="rounded-lg border border-border bg-card p-3">
                            <div className="flex h-40 items-end gap-1">
                              {result.forecast.map((p: any, i: number) => {
                                const max = Math.max(...result.forecast.map((x: any) => x.load_mw || 0));
                                const h = max ? Math.max(4, ((p.load_mw || 0) / max) * 100) : 4;
                                return (
                                  <div
                                    key={i}
                                    className="group relative flex h-full flex-1 items-end"
                                    title={`${p.hour}: ${p.load_mw} MW`}
                                  >
                                    <div
                                      className="w-full rounded-t bg-gradient-brand transition-opacity hover:opacity-80"
                                      style={{ height: `${h}%` }}
                                    />
                                    <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background group-hover:block">
                                      {p.load_mw} MW
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-2 flex gap-1">
                              {result.forecast.map((p: any, i: number) => (
                                <div key={i} className="flex-1 text-center">
                                  {i % 3 === 0 && (
                                    <span className="text-[9px] text-muted-foreground">{p.hour}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {Array.isArray(result.recommendations) && result.recommendations.length > 0 && (
                        <div>
                          <h3 className="mb-2 text-sm font-semibold">Recommendations</h3>
                          <ul className="space-y-1.5 text-sm">
                            {result.recommendations.map((r: string, i: number) => (
                              <li key={i} className="flex gap-2 text-muted-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </>
  );
};

export default Dashboard;
