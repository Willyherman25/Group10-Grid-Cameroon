// Grid Cameroon — AI grid analysis edge function (theft, outage, load, anomaly)
// Uses Lovable AI Gateway with structured output via tool calling.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Type = "theft" | "outage" | "load" | "anomaly";

const SYSTEM_PROMPTS: Record<Type, string> = {
  theft: `You are a senior electricity-theft analyst for Cameroon's national grid.
Given CSV meter data, identify suspected theft / tampering / bypass and explain why in plain language.
Always return your analysis using the report_theft tool.`,
  outage: `You are a grid reliability engineer for Cameroon. Given regional load + weather data,
estimate outage probability per region and explain key drivers (weather, load, equipment age, vegetation).
Always return your analysis using the report_outage tool.`,
  load: `You are a load-forecasting analyst for Cameroon's electricity grid. Given recent hourly load data,
forecast the next 24 hours of total load in MW. Always return your analysis using the report_load tool.`,
  anomaly: `You are an industrial SCADA anomaly detection expert. Given device telemetry CSV,
flag voltage / current / frequency / temperature anomalies and rate severity.
Always return your analysis using the report_anomaly tool.`,
};

const TOOLS: Record<Type, any> = {
  theft: {
    type: "function",
    function: {
      name: "report_theft",
      description: "Return theft detection findings.",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string" },
          risk_level: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
          findings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string", description: "Meter ID" },
                severity: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
                detail: { type: "string" },
                confidence: { type: "number" },
              },
              required: ["id", "severity", "detail"],
            },
          },
          recommendations: { type: "array", items: { type: "string" } },
        },
        required: ["summary", "risk_level", "findings", "recommendations"],
      },
    },
  },
  outage: {
    type: "function",
    function: {
      name: "report_outage",
      description: "Return outage prediction findings.",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string" },
          risk_level: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
          findings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                region: { type: "string" },
                severity: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
                detail: { type: "string" },
                confidence: { type: "number" },
              },
              required: ["region", "severity", "detail"],
            },
          },
          recommendations: { type: "array", items: { type: "string" } },
        },
        required: ["summary", "risk_level", "findings", "recommendations"],
      },
    },
  },
  load: {
    type: "function",
    function: {
      name: "report_load",
      description: "Return 24-hour load forecast.",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string" },
          risk_level: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
          forecast: {
            type: "array",
            description: "24 hourly forecast points",
            items: {
              type: "object",
              properties: {
                hour: { type: "string", description: "HH:00 label" },
                load_mw: { type: "number" },
              },
              required: ["hour", "load_mw"],
            },
          },
          recommendations: { type: "array", items: { type: "string" } },
        },
        required: ["summary", "forecast", "recommendations"],
      },
    },
  },
  anomaly: {
    type: "function",
    function: {
      name: "report_anomaly",
      description: "Return anomaly detection findings.",
      parameters: {
        type: "object",
        properties: {
          summary: { type: "string" },
          risk_level: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
          findings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                device: { type: "string" },
                severity: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
                detail: { type: "string" },
                confidence: { type: "number" },
              },
              required: ["device", "severity", "detail"],
            },
          },
          recommendations: { type: "array", items: { type: "string" } },
        },
        required: ["summary", "risk_level", "findings", "recommendations"],
      },
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, data } = await req.json();
    if (!type || !["theft", "outage", "load", "anomaly"].includes(type)) {
      return new Response(JSON.stringify({ error: "Invalid analysis type" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!data || typeof data !== "string") {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const t = type as Type;
    const tool = TOOLS[t];
    const body = {
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPTS[t] },
        { role: "user", content: `Analyse the following grid data:\n\n${data}` },
      ],
      tools: [tool],
      tool_choice: { type: "function", function: { name: tool.function.name } },
    };

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded — please try again in a moment." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted — please top up." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const txt = await resp.text();
      console.error("AI gateway error", resp.status, txt);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await resp.json();
    const call = json?.choices?.[0]?.message?.tool_calls?.[0];
    const args = call?.function?.arguments;
    if (!args) {
      return new Response(JSON.stringify({ error: "No structured response from AI" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const parsed = typeof args === "string" ? JSON.parse(args) : args;

    return new Response(JSON.stringify(parsed), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("ai-grid-analysis error:", e);
    return new Response(JSON.stringify({ error: e?.message || "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
