import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks — we'll be in touch shortly.");
    }, 700);
  };

  return (
    <>
      <section className="bg-gradient-soft">
        <div className="container py-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</span>
          <h1 className="mt-2 max-w-2xl text-4xl font-bold md:text-5xl">We're here to help, 24/7.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Reach our customer care team or report an outage — we cover every region of Cameroon.
          </p>
        </div>
      </section>

      <section className="container grid gap-8 py-16 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[
            { icon: Phone, title: "Toll-free", value: "8010" },
            { icon: Mail, title: "Email", value: "contact@gridcameroon.cm" },
            { icon: MapPin, title: "Head office", value: "Buea Town, Buea, Cameroon" },
          ].map((c) => (
            <Card key={c.title} className="flex items-start gap-3 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-soft-blue text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.title}</div>
                <div className="font-semibold">{c.value}</div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 lg:col-span-2">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Jean Mbarga" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="jean@example.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required placeholder="Outage in my neighbourhood" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={6} placeholder="How can we help?" />
            </div>
            <Button type="submit" variant="hero" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </Button>
          </form>
        </Card>
      </section>
    </>
  );
};

export default Contact;
