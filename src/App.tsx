import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Check,
  Network,
  Handshake,
  Banknote,
  ShieldCheck,
  Sprout,
  Sun,
  HeartPulse,
  Building2,
  Briefcase,
  Landmark,
  Users,
  Lightbulb,
  Coins,
} from "lucide-react";

/* ---------- Reusable section wrapper with fade-up ---------- */
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green mb-4">
      {children}
    </p>
  );
}

/* ---------- Hero animated network background ---------- */
function NetworkBackground() {
  const nodes = [
    { x: 12, y: 18, c: "orange" },
    { x: 28, y: 62, c: "green" },
    { x: 42, y: 28, c: "green" },
    { x: 55, y: 72, c: "orange" },
    { x: 68, y: 22, c: "orange" },
    { x: 78, y: 55, c: "green" },
    { x: 88, y: 80, c: "orange" },
    { x: 18, y: 88, c: "green" },
    { x: 92, y: 30, c: "green" },
    { x: 38, y: 88, c: "orange" },
  ];
  const links: [number, number][] = [
    [0, 2], [2, 1], [1, 3], [3, 5], [5, 4], [4, 8], [5, 6], [3, 7], [7, 9], [9, 5], [2, 4],
  ];
  const color = (c: string) =>
    c === "orange" ? "var(--brand-orange)" : "var(--brand-green)";
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--brand-green)"
          strokeOpacity="0.18"
          strokeWidth="0.15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.4 + i * 0.08, ease: "easeOut" }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="0.6"
          fill={color(n.c)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{
            opacity: { duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" },
            delay: 0.6 + i * 0.1,
          }}
        />
      ))}
    </svg>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const headline = [
    "The last-mile",
    "coordination infrastructure",
    "for Africa's impact economy.",
  ];
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-24 md:pt-36 md:pb-32">
      <NetworkBackground />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            {headline.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.18, ease: "easeOut" }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Impact Natives is building the digital infrastructure that connects NGOs,
            corporates, governments, donors, and social enterprise founders to
            discover each other, form partnerships, mobilise capital, and verify
            impact across Africa.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a href="#waitlist">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-7 h-12 text-base font-semibold rounded-md"
              >
                Join the Waitlist
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Problem ---------- */
function Problem() {
  const items = [
    {
      title: "Fragmented Partnerships",
      body: "Credible organisations fail to find each other without personal networks.",
    },
    {
      title: "Capital Without Direction",
      body: "Billions in impact funding fails to reach the right implementing partners.",
    },
    {
      title: "Unverifiable Outcomes",
      body: "Donors and governments cannot verify impact claims with confidence.",
    },
  ];
  return (
    <Section className="bg-white py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Why Natives Exists</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-4xl leading-tight">
          Africa's impact sector has the innovation, the capital, and the mandate.
          What it lacks is coordination.
        </h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white border border-border p-8 rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-l-transparent hover:border-l-brand-orange"
            >
              <div className="text-sm font-semibold text-brand-orange mb-3">
                0{i + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Platform layers ---------- */
function Platform() {
  const blocks = [
    {
      icon: Network,
      title: "Discovery Layer",
      body: "Ecosystem visibility across NGOs, corporates, donors, governments, and founders.",
    },
    {
      icon: Handshake,
      title: "Partnership Layer",
      body: "Structured coordination, consortium formation, and co-application workflows.",
    },
    {
      icon: Banknote,
      title: "Funding Layer",
      body: "Capital alignment across grants, impact investment, prizes, and blended finance.",
    },
    {
      icon: ShieldCheck,
      title: "Trust Layer",
      body: "Institutional-grade verification for organisations and social enterprise founders.",
    },
  ];
  return (
    <Section className="bg-[oklch(0.985_0.005_120)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>The Platform</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          Four layers of coordination infrastructure.
        </h2>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white border border-border p-8 rounded-md transition-all duration-300 hover:border-brand-green hover:shadow-lg"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-md border border-border flex items-center justify-center bg-white transition-colors duration-300 group-hover:bg-brand-green group-hover:border-brand-green">
                    <Icon className="w-6 h-6 text-brand-green transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-green mb-2">
                      Layer 0{i + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Launch sectors ---------- */
function Sectors() {
// REPLACE WITH:
const items = [
    {
      icon: Sprout,
      title: "Agriculture and Food Systems",
      body: "Connecting founders, NGOs, offtakers, and funders across African agricultural value chains.",
    },
    {
      icon: Sun,
      title: "Climate Change",
      body: "Coordinating adaptation, resilience, and clean energy initiatives across the continent.",
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      body: "Linking community health implementers, digital health founders, and institutional funders.",
    },
    {
      icon: Briefcase,
      title: "Entrepreneurship and MSMEs",
      body: "Connecting founders and MSMEs to the partnerships, capital, and ecosystem infrastructure needed to scale sustainable solutions.",
    },
  ];
  return (
    <Section className="bg-white py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Where We Start</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          Launching in the sectors where coordination gaps are most acute.
        </h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative overflow-hidden bg-white border border-border p-8 rounded-md transition-colors duration-500 cursor-default ${i === 3 ? "md:col-span-3 text-left md:text-center hover:bg-brand-orange" : "hover:bg-brand-green-deep"}`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "6px 6px",
                  }}
                />
                <div className="relative">
                  <Icon className={`w-8 h-8 text-brand-green mb-5 transition-colors duration-500 group-hover:text-white ${i === 3 ? "md:mx-auto text-brand-orange" : ""}`} />
                  <h3 className="text-2xl font-bold mb-3 text-foreground transition-colors duration-500 group-hover:text-white">
                    {it.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed transition-colors duration-500 group-hover:text-white/85">
                    {it.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Who it's for ---------- */
function Audience() {
  const items = [
    { icon: Building2, title: "NGOs", body: "Access funding, verified partners, and reporting infrastructure." },
    { icon: Briefcase, title: "Corporates", body: "Find credible ESG implementation partners and track impact." },
    { icon: Coins, title: "Donors & DFIs", body: "Deploy capital into a verified, coordinated ecosystem." },
    { icon: Landmark, title: "Governments", body: "Coordinate programme delivery across implementing actors." },
    { icon: Lightbulb, title: "Founders", body: "Access blended finance, institutional partners, and co-application opportunities." },
    { icon: Users, title: "Ecosystem Experts", body: "Contribute advisory capacity to Labs and partnerships." },
  ];
  return (
    <Section className="bg-[oklch(0.985_0.005_120)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Built For</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
          Six actors. One coordinated ecosystem.
        </h2>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group bg-white border-2 border-border p-7 rounded-md transition-all duration-300 hover:border-brand-orange hover:bg-[oklch(0.97_0.03_45)]"
              >
                <Icon className="w-7 h-7 text-brand-orange mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-lg font-bold mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {it.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Waitlist ---------- */
function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [actor, setActor] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !actor) return;
    try {
      await fetch("https://formspree.io/f/xnjwlplw", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <Section
      id="waitlist"
      className="py-24 md:py-32 text-white"
      // eslint-disable-next-line react/forbid-dom-props
    >
      <div style={{ backgroundColor: "#1a3d2b" }} className="-my-24 md:-my-32 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[oklch(0.85_0.12_85)] mb-4">
            Early Access
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Be part of the ecosystem from day one.
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
            Natives is in active development. Join the waitlist to get early
            access, shape the platform, and be among the first organisations
            and founders onboarded.
          </p>

          <div className="mt-10 relative min-h-[360px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  action="https://formspree.io/f/xnjwlplw"
                  method="POST"
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="wl-name" className="text-white/90 mb-2 block">Full name</Label>
                     <Input
                       id="wl-name"
                       name="name"
                       value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-transparent border-0 border-b-2 border-white/30 rounded-none px-0 h-12 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-brand-orange"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wl-email" className="text-white/90 mb-2 block">Email address</Label>
                     <Input
                       id="wl-email"
                       name="email"
                       type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-transparent border-0 border-b-2 border-white/30 rounded-none px-0 h-12 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:border-brand-orange"
                    />
                  </div>
                  <div>
                    <Label className="text-white/90 mb-2 block">Actor type</Label>
                    <Select value={actor} onValueChange={setActor}>
                      <SelectTrigger className="bg-transparent border-0 border-b-2 border-white/30 rounded-none px-0 h-12 text-white focus:ring-0 data-[placeholder]:text-white/40">
                        <SelectValue placeholder="Select your actor type" />
                      </SelectTrigger>
                      <SelectContent>
                        {["NGO", "Corporate", "Donor/DFI", "Government", "Founder", "Ecosystem Expert"].map(
                          (a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="actor" value={actor} />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="mt-4 bg-brand-orange hover:bg-brand-orange-hover text-white px-8 h-12 text-base font-semibold rounded-md transition-transform hover:scale-[1.02]"
                  >
                    Join the Waitlist
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4 bg-white/5 border border-white/15 p-8 rounded-md"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="shrink-0 w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center"
                  >
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">You're on the list.</h3>
                    <p className="text-white/80 leading-relaxed">
                      We'll be in touch as we open early access by sector.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <Section className="bg-foreground text-white py-16">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-3 h-3 rounded-full bg-brand-orange" />
            <span className="text-2xl font-extrabold tracking-tight">Natives</span>
          </div>
          <p className="text-white/70 max-w-md leading-relaxed">
            The last-mile coordination infrastructure for Africa's impact economy.
          </p>
        </div>
        <div className="md:text-right flex flex-col md:items-end justify-between gap-4">
          <a
            href="https://impactnatives.com"
            className="inline-block relative w-fit text-white/90 hover:text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-brand-orange after:transition-[width] after:duration-300 hover:after:w-full"
          >
            impactnatives.com
          </a>
          <p className="text-sm text-white/50">
            © 2026 Impact Natives. All rights reserved.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-orange" />
          <span className="text-lg font-extrabold tracking-tight">Natives</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-foreground/80">
          <a href="#waitlist" className="hover:text-foreground">Waitlist</a>
        </nav>
        <a href="#waitlist">
          <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white h-9 px-4 text-sm font-semibold">
            Join Waitlist
          </Button>
        </a>
      </div>
    </header>
  );
}

function Landing() {
  return (
    <div id="top" className="bg-white text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Platform />
        <Sectors />
        <Audience />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
