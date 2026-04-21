"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ElegantShape } from "@/components/ui/elegant-shape";
import {
  Check,
  ArrowUpRight,
  Menu,
  X,
  Circle,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ───────────── i18n ───────────── */
const I18N: Record<string, Record<string, any>> = {
  de: {
    nav: { process: "Prozess", work: "Leistung", reference: "Referenz", pricing: "Preis", cta: "Vorschau anfragen" },
    hero: {
      badge: "Verfügbar für neue Projekte",
      eyebrow: "Webdesign · Entwicklung · Schweiz",
      titleA: "Ihre Website",
      titleB: "kommt zu Ihnen.",
      sub: "Sie senden mir Informationen zu Ihrem Unternehmen — ich baue Ihnen daraus eine vollständige Vorschau Ihrer neuen Website.",
      subHighlight: "Kostenlos",
      subEnd: ", unverbindlich, in wenigen Tagen.",
      cta1: "Kostenlose Vorschau anfragen",
      cta2: "So funktioniert's",
      trust: ["Schweiz", "Festpreis", "Vorschau", "4 Sprachen"],
      trustHighlight: "kostenlos",
      captionName: "Daniele Mele",
      captionRole: "Freelancer · Schweiz",
    },
    manifesto: { a: "Das Produkt kommt zum Kunden — ", b: "nicht der Kunde zum Produkt.", sig: "Webdesigner & Entwickler, Schweiz" },
    process: {
      eyebrow: "Der Prozess", title: "Fünf Schritte. Ein fairer Deal.",
      sub: "Sie gehen kein Risiko ein. Die Vorschau ist", subHighlight: "kostenlos", subEnd: " — Sie bezahlen erst, wenn Sie überzeugt sind.",
      steps: [
        { title: "Sie senden Ihre Infos", desc: "Eine kurze Beschreibung Ihres Unternehmens oder das LinkedIn-Profil Ihrer Firma reicht mir als Ausgangspunkt." },
        { title: "Ich baue Ihre Vorschau", desc: "Innerhalb weniger Tage erhalten Sie eine vollständige, testfähige Version Ihrer Website — kostenlos und ohne Verpflichtung." },
        { title: "Sie geben Ihr Feedback", desc: "Wir besprechen die Anpassungen in Ruhe. Farben, Texte und die Struktur passe ich entsprechend an." },
        { title: "Sie bezahlen den Festpreis", desc: "Zwischen CHF 1'000 und 2'000 — je nach Umfang. Ich kümmere mich um die Domain und stelle die Seite live." },
        { title: "Ihre Seite ist online", desc: "Sie erhalten alle Zugänge, die laufende Seite und eine Einweisung. Fertig. Kein Abo, keine Überraschungen." },
      ],
    },
    work: {
      eyebrow: "Meine Leistung", title: "Präsentation. Keine Shops.", sub: "Ich konzentriere mich auf das, was ich am besten kann — nicht auf alles.",
      doTitle: "Was ich baue", doItems: ["Landing Pages mit Wirkung", "Präsentationsseiten für KMU", "Portfolio- und Firmenauftritte", "Einzelseiten für Events & Launches"],
      dontTitle: "Was ich nicht baue", dontDesc: "Online-Shops mit Katalogen, Warenkorb und Zahlungsabwicklung sind ein eigenes Handwerk. Dafür empfehle ich Ihnen Wix oder Shopify — ehrlich gesagt schneller und günstiger als jede Eigenentwicklung.", dontNote: "Spezialisierung statt Kompromiss",
      marquee: ["Landing Pages", "Präsentation", "KMU", "Portfolio", "Launch", "Firmenauftritt"],
    },
    ref: { eyebrow: "Referenz", title: "Aus der Praxis.", items: [{ name: "Emil Saga", meta: "Buchpräsentation · Schweiz · 2026", url: "https://www.emilsaga.ch" }], visit: "Besuchen" },
    price: {
      eyebrow: "Investition", title: "Ein fairer Festpreis.", sub: "Kein Stundensatz, keine versteckten Kosten. Sie wissen von Anfang an, was Sie bezahlen — und erst dann, wenn Sie Ihre Vorschau gesehen haben.",
      label: "Festpreis", amount: "1'000 – 2'000", amountSub: "Einmalig · inkl. Domain & Setup", cta: "Kostenlose Vorschau anfragen",
      items: ["Kostenlose, testbare Vorschau", "Design & Umsetzung in einer Hand", "Feedback-Runden bis zur Zufriedenheit", "Domain-Registrierung & Hosting-Setup", "Bis zu vier Sprachen", "SEO-Grundlagen & Performance"],
    },
    contact: {
      eyebrow: "Beginnen Sie hier", title: "Ihre Vorschau wartet.", sub: "Schreiben Sie mir kurz, was Sie vorhaben. Ich antworte innerhalb eines Werktags.", or: "Oder direkt per E-Mail:",
      form: { name: "Name", email: "E-Mail", company: "Unternehmen", linkedin: "LinkedIn (optional)", message: "Ihre Nachricht", placeholder: "Ihre Idee, Ihre Branche, ein paar Stichworte...", submit: "Kostenlose Vorschau anfragen", sending: "Wird gesendet…", sentTitle: "Nachricht gesendet.", sentDesc: "Vielen Dank — ich melde mich innerhalb eines Werktags bei Ihnen.", sentBack: "Zurück zum Start", error: "Senden fehlgeschlagen. Bitte direkt per E-Mail an hello@danielemele.ch." },
    },
    footer: { role: "Webdesign & Webentwicklung", location: "Schweiz", rights: "Alle Rechte vorbehalten.", privacy: "Datenschutz" },
  },
  en: {
    nav: { process: "Process", work: "Scope", reference: "Reference", pricing: "Pricing", cta: "Request preview" },
    hero: {
      badge: "Available for new projects", eyebrow: "Web Design · Development · Switzerland", titleA: "Your website", titleB: "comes to you.",
      sub: "Send me a few things about your business — I'll turn them into a complete, working preview of your new website.", subHighlight: "Free", subEnd: ", no commitment, in a few days.",
      cta1: "Request your free preview", cta2: "See how it works", trust: ["Switzerland", "Flat fee", "Preview", "4 languages"], trustHighlight: "free", captionName: "Daniele Mele", captionRole: "Freelancer · Switzerland",
    },
    manifesto: { a: "The product comes to the client — ", b: "not the client to the product.", sig: "Web designer & developer, Switzerland" },
    process: {
      eyebrow: "The Process", title: "Five steps. One fair deal.", sub: "You take zero risk. The preview is", subHighlight: "free", subEnd: " — you only pay when you're convinced.",
      steps: [
        { title: "You share your info", desc: "A short description of your company or your LinkedIn page is all I need to get started." },
        { title: "I build your preview", desc: "Within a few days you receive a complete, testable version of your website — free and without any commitment." },
        { title: "You give feedback", desc: "We discuss the adjustments at your pace. I adapt colors, copy, and structure accordingly." },
        { title: "You pay the fixed price", desc: "Between CHF 1'000 and 2'000 depending on scope. I handle the domain and take your site live." },
        { title: "Your site is online", desc: "You get all the access, the live site, and a walkthrough. Done. No subscription, no surprises." },
      ],
    },
    work: {
      eyebrow: "What I do", title: "Presentation. Not shops.", sub: "I focus on what I do best — not on everything.",
      doTitle: "What I build", doItems: ["Landing pages that perform", "Presentation sites for SMEs", "Portfolio and company sites", "Single pages for events & launches"],
      dontTitle: "What I don't build", dontDesc: "Online shops with catalogs, carts and payments are a different craft. For those I honestly recommend Wix or Shopify — faster and cheaper than any custom build.", dontNote: "Specialization over compromise",
      marquee: ["Landing Pages", "Presentation", "SMEs", "Portfolio", "Launch", "Company site"],
    },
    ref: { eyebrow: "Reference", title: "From real work.", items: [{ name: "Emil Saga", meta: "Book launch · Switzerland · 2026", url: "https://www.emilsaga.ch" }], visit: "Visit" },
    price: {
      eyebrow: "Investment", title: "A fair fixed price.", sub: "No hourly rate, no hidden costs. You know what you pay from the start — and only after you've seen your preview.",
      label: "Fixed price", amount: "1'000 – 2'000", amountSub: "One-time · domain & setup included", cta: "Request your free preview",
      items: ["Free, testable preview", "Design & build in one hand", "Feedback rounds until satisfied", "Domain registration & hosting setup", "Up to four languages", "SEO fundamentals & performance"],
    },
    contact: {
      eyebrow: "Start here", title: "Your preview awaits.", sub: "Drop me a short note about your plans. I reply within one working day.", or: "Or drop me a line directly:",
      form: { name: "Name", email: "Email", company: "Company", linkedin: "LinkedIn (optional)", message: "Your message", placeholder: "Your idea, your industry, a few key words...", submit: "Request free preview", sending: "Sending…", sentTitle: "Message sent.", sentDesc: "Thank you — I'll get back to you within one business day.", sentBack: "Back to top", error: "Sending failed. Please email hello@danielemele.ch directly." },
    },
    footer: { role: "Web Design & Development", location: "Switzerland", rights: "All rights reserved.", privacy: "Privacy" },
  },
  fr: {
    nav: { process: "Processus", work: "Prestation", reference: "Référence", pricing: "Tarif", cta: "Demander un aperçu" },
    hero: {
      badge: "Disponible pour de nouveaux projets", eyebrow: "Design Web · Développement · Suisse", titleA: "Votre site web", titleB: "vient à vous.",
      sub: "Envoyez-moi quelques informations sur votre entreprise — j'en fais un aperçu complet et fonctionnel de votre nouveau site.", subHighlight: "Gratuit", subEnd: ", sans engagement, en quelques jours.",
      cta1: "Demander un aperçu gratuit", cta2: "Comment ça marche", trust: ["Suisse", "Prix fixe", "Aperçu", "4 langues"], trustHighlight: "gratuit", captionName: "Daniele Mele", captionRole: "Freelance · Suisse",
    },
    manifesto: { a: "Le produit vient au client — ", b: "et non l'inverse.", sig: "Concepteur & développeur web, Suisse" },
    process: {
      eyebrow: "Le Processus", title: "Cinq étapes. Un accord juste.", sub: "Vous ne prenez aucun risque. L'aperçu est", subHighlight: "gratuit", subEnd: " — vous ne payez que lorsque vous êtes convaincu.",
      steps: [
        { title: "Vous envoyez vos infos", desc: "Une courte description de votre entreprise ou votre profil LinkedIn me suffit pour commencer." },
        { title: "Je construis votre aperçu", desc: "En quelques jours vous recevez une version complète et testable de votre site — gratuite et sans engagement." },
        { title: "Vous donnez votre avis", desc: "Nous discutons les ajustements en toute tranquillité. J'adapte les couleurs, les textes et la structure." },
        { title: "Vous payez le prix fixe", desc: "Entre CHF 1'000 et 2'000 selon l'ampleur. Je m'occupe du domaine et je mets votre site en ligne." },
        { title: "Votre site est en ligne", desc: "Vous recevez tous les accès, le site en ligne et un tour du propriétaire. Fini. Pas d'abonnement." },
      ],
    },
    work: {
      eyebrow: "Ma Prestation", title: "Présentation. Pas de boutiques.", sub: "Je me concentre sur ce que je fais de mieux — pas sur tout.",
      doTitle: "Ce que je construis", doItems: ["Landing pages qui convertissent", "Sites de présentation pour PME", "Portfolios et sites d'entreprise", "Pages uniques pour événements & lancements"],
      dontTitle: "Ce que je ne fais pas", dontDesc: "Les boutiques en ligne avec catalogues, paniers et paiements sont un métier à part. Pour cela je vous recommande honnêtement Wix ou Shopify.", dontNote: "La spécialisation plutôt que le compromis",
      marquee: ["Landing Pages", "Présentation", "PME", "Portfolio", "Lancement", "Site d'entreprise"],
    },
    ref: { eyebrow: "Référence", title: "Un cas concret.", items: [{ name: "Emil Saga", meta: "Présentation de livre · Suisse · 2026", url: "https://www.emilsaga.ch" }], visit: "Visiter" },
    price: {
      eyebrow: "Investissement", title: "Un prix fixe et juste.", sub: "Pas de tarif horaire, pas de coûts cachés. Vous savez ce que vous payez dès le départ.",
      label: "Prix fixe", amount: "1'000 – 2'000", amountSub: "Unique · domaine & installation inclus", cta: "Demander un aperçu gratuit",
      items: ["Aperçu gratuit et testable", "Design & développement en une main", "Tours de feedback jusqu'à satisfaction", "Enregistrement du domaine & hébergement", "Jusqu'à quatre langues", "Bases SEO & performance"],
    },
    contact: {
      eyebrow: "Commencez ici", title: "Votre aperçu vous attend.", sub: "Envoyez-moi quelques lignes sur votre projet. Je réponds en un jour ouvré.", or: "Ou directement par e-mail :",
      form: { name: "Nom", email: "E-mail", company: "Entreprise", linkedin: "LinkedIn (optionnel)", message: "Votre message", placeholder: "Votre idée, votre secteur, quelques mots-clés...", submit: "Demander un aperçu gratuit", sending: "Envoi…", sentTitle: "Message envoyé.", sentDesc: "Merci — je reviens vers vous dans un jour ouvré.", sentBack: "Retour au début", error: "Échec de l'envoi. Merci d'écrire directement à hello@danielemele.ch." },
    },
    footer: { role: "Conception & Développement Web", location: "Suisse", rights: "Tous droits réservés.", privacy: "Confidentialité" },
  },
  it: {
    nav: { process: "Processo", work: "Servizio", reference: "Referenza", pricing: "Prezzo", cta: "Richiedi anteprima" },
    hero: {
      badge: "Disponibile per nuovi progetti", eyebrow: "Web Design · Sviluppo · Svizzera", titleA: "Il vostro sito", titleB: "viene da voi.",
      sub: "Mandatemi alcune informazioni sulla vostra azienda — le trasformo in un'anteprima completa e funzionante del vostro nuovo sito.", subHighlight: "Gratuita", subEnd: ", senza impegno, in pochi giorni.",
      cta1: "Richiedi anteprima gratuita", cta2: "Come funziona", trust: ["Svizzera", "Prezzo fisso", "Anteprima", "4 lingue"], trustHighlight: "gratuita", captionName: "Daniele Mele", captionRole: "Freelancer · Svizzera",
    },
    manifesto: { a: "Il prodotto va dal cliente — ", b: "non il cliente al prodotto.", sig: "Web designer e sviluppatore, Svizzera" },
    process: {
      eyebrow: "Il Processo", title: "Cinque passi. Un accordo giusto.", sub: "Nessun rischio per voi. L'anteprima è", subHighlight: "gratuita", subEnd: " — pagate solo quando siete convinti.",
      steps: [
        { title: "Inviate le vostre info", desc: "Una breve descrizione della vostra azienda o il profilo LinkedIn aziendale mi bastano per iniziare." },
        { title: "Costruisco l'anteprima", desc: "In pochi giorni ricevete una versione completa e testabile del vostro sito — gratuita e senza impegno." },
        { title: "Date il vostro feedback", desc: "Discutiamo le modifiche con calma. Adatto colori, testi e struttura di conseguenza." },
        { title: "Pagate il prezzo fisso", desc: "Tra CHF 1'000 e 2'000 a seconda della portata. Mi occupo io del dominio e metto online il sito." },
        { title: "Il vostro sito è online", desc: "Ricevete tutti gli accessi, il sito live e una spiegazione. Fatto. Nessun abbonamento." },
      ],
    },
    work: {
      eyebrow: "Il mio Servizio", title: "Presentazione. Non negozi.", sub: "Mi concentro su ciò che so fare meglio — non su tutto.",
      doTitle: "Cosa costruisco", doItems: ["Landing page che funzionano", "Siti di presentazione per PMI", "Portfolio e siti aziendali", "Pagine singole per eventi e lanci"],
      dontTitle: "Cosa non costruisco", dontDesc: "I negozi online con cataloghi, carrello e pagamenti sono un mestiere diverso. Per questo vi consiglio onestamente Wix o Shopify.", dontNote: "Specializzazione, non compromesso",
      marquee: ["Landing Pages", "Presentazione", "PMI", "Portfolio", "Lancio", "Sito aziendale"],
    },
    ref: { eyebrow: "Referenza", title: "Un caso reale.", items: [{ name: "Emil Saga", meta: "Presentazione di un libro · Svizzera · 2026", url: "https://www.emilsaga.ch" }], visit: "Visita" },
    price: {
      eyebrow: "Investimento", title: "Un prezzo fisso, giusto.", sub: "Nessuna tariffa oraria, nessun costo nascosto. Sapete cosa pagate dall'inizio.",
      label: "Prezzo fisso", amount: "1'000 – 2'000", amountSub: "Una tantum · dominio e setup inclusi", cta: "Richiedi anteprima gratuita",
      items: ["Anteprima gratuita e testabile", "Design e sviluppo in una sola mano", "Giri corti di feedback fino alla soddisfazione", "Registrazione dominio e hosting", "Fino a quattro lingue", "Fondamenti SEO e performance"],
    },
    contact: {
      eyebrow: "Iniziate qui", title: "La vostra anteprima vi aspetta.", sub: "Scrivetemi due righe sul vostro progetto. Rispondo entro un giorno lavorativo.", or: "Oppure direttamente via e-mail:",
      form: { name: "Nome", email: "E-mail", company: "Azienda", linkedin: "LinkedIn (facoltativo)", message: "Il vostro messaggio", placeholder: "La vostra idea, il settore, qualche parola chiave...", submit: "Richiedi anteprima gratuita", sending: "Invio…", sentTitle: "Messaggio inviato.", sentDesc: "Grazie — vi rispondo entro un giorno lavorativo.", sentBack: "Torna all'inizio", error: "Invio non riuscito. Scrivete direttamente a hello@danielemele.ch." },
    },
    footer: { role: "Web Design e Sviluppo", location: "Svizzera", rights: "Tutti i diritti riservati.", privacy: "Privacy" },
  },
};

const LANGS = ["de", "en", "fr", "it"] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  }),
};

/* ───────────── Reveal ───────────── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

/* ───────────── Theme toggle button ───────────── */
function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300"
      style={{ borderColor: "var(--hero-line)", background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", color: "var(--hero-text-mute)" }}
    >
      <Sun size={15} className={cn("absolute transition-transform duration-300", dark ? "scale-0 rotate-90" : "scale-100 rotate-0")} style={{ transitionProperty: "transform, opacity" }} />
      <Moon size={15} className={cn("absolute transition-transform duration-300", dark ? "scale-100 rotate-0" : "scale-0 -rotate-90")} style={{ transitionProperty: "transform, opacity" }} />
    </button>
  );
}

/* ───────────── Page ───────────── */
export default function Home() {
  const [lang, setLang] = useState<string>("de");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [dark, setDark] = useState(false);

  const t = I18N[lang] || I18N.de;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved && I18N[saved]) setLang(saved);
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") { setDark(true); document.documentElement.classList.add("dark"); }
      else if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) { setDark(true); document.documentElement.classList.add("dark"); }
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
      return next;
    });
  }, []);

  const switchLang = useCallback((l: string) => {
    setLang(l);
    try { localStorage.setItem("lang", l); } catch {}
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setSending(true);
    const fd = new FormData(form);
    if (fd.get("_honey")) return;
    const payload: Record<string, any> = { _subject: "Neue Anfrage — " + (fd.get("name") || "Website"), _template: "table", _captcha: "false" };
    fd.forEach((v, k) => { if (k !== "_honey") payload[k] = v; });
    try {
      const res = await fetch("https://formsubmit.co/ajax/danielemele90@hotmail.com", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || (json.success !== "true" && json.success !== true)) throw new Error();
      setFormSent(true);
    } catch { setSending(false); alert(t.contact.form.error); }
  };

  const marqueeItems = [...(t.work.marquee as string[]), ...(t.work.marquee as string[])];

  return (
    <>
      {/* ══════════ HERO — theme-aware ══════════ */}
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden transition-colors duration-700" style={{ background: "var(--hero-bg)" }}>
        {/* Background gradient wash */}
        <div className="absolute inset-0 blur-3xl transition-colors duration-700" style={{ background: `linear-gradient(to bottom right, var(--hero-gradient-from), transparent, var(--hero-gradient-to))` }} />

        {/* Floating shapes — only visible in dark mode */}
        <div className={cn("absolute inset-0 overflow-hidden transition-opacity duration-700", dark ? "opacity-100" : "opacity-0")}>
          <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]" />
          <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-rose-500/[0.15]" className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]" />
          <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-violet-500/[0.15]" className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]" />
          <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-amber-500/[0.15]" className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]" />
          <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-cyan-500/[0.15]" className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]" />
        </div>

        {/* Header */}
        <header className="relative z-20">
          <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-12">
            <a href="#top" className="flex items-center gap-2 text-base font-semibold transition-colors duration-500" style={{ letterSpacing: "-0.02em", color: "var(--hero-logo-text)" }}>
              <span className="relative inline-block h-[22px] w-[22px] transition-colors duration-500" style={{ border: "1.5px solid var(--hero-logo-border)", background: dark ? "rgba(255,255,255,0.05)" : "var(--card-bg)" }} aria-hidden="true"><span className="absolute right-1 top-1 block h-1.5 w-1.5 transition-colors duration-500" style={{ background: "var(--hero-logo-dot)" }} /></span>
              Daniele Mele
            </a>
            <nav className="hidden items-center gap-9 lg:flex">
              {(["process", "work", "reference", "pricing"] as const).map((key) => (
                <a key={key} href={`#${key}`} className="text-[0.9rem] font-medium transition-colors duration-300" style={{ color: "var(--hero-nav-text-mute)" }}>{t.nav[key]}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[0.78rem] font-medium uppercase transition-colors duration-500" style={{ color: "var(--hero-text-mute)", letterSpacing: "0.06em" }}>
                {LANGS.map((l, i) => (
                  <span key={l} className="flex items-center">
                    {i > 0 && <span className="mx-1 transition-colors duration-500" style={{ color: "var(--hero-line)" }}>/</span>}
                    <button onClick={() => switchLang(l)} className="cursor-pointer border-none bg-transparent px-1 py-1 font-inherit uppercase transition-colors duration-300" style={{ color: lang === l ? "var(--hero-nav-text)" : "var(--hero-text-mute)", letterSpacing: "0.06em" }}>{l.toUpperCase()}</button>
                  </span>
                ))}
              </div>
              <ThemeToggle dark={dark} onToggle={toggleTheme} />
              <a href="#contact" className="hidden rounded-full px-6 py-2.5 text-[0.88rem] font-medium backdrop-blur-sm transition-colors duration-300 hover:opacity-90 lg:inline-flex" style={{ background: "var(--hero-nav-cta-bg)", color: "var(--hero-nav-cta-text)", border: "1px solid var(--hero-line)" }}>{t.nav.cta}</a>
              <button className="inline-flex border bg-transparent p-2 transition-colors duration-500 lg:hidden" style={{ borderColor: "var(--hero-line)", color: "var(--hero-nav-text)" }} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
          </div>
          {mobileOpen && (
            <div className="flex flex-col gap-6 px-6 pb-10 pt-8 transition-colors duration-500 lg:hidden" style={{ background: "var(--hero-bg)", borderBottom: "1px solid var(--hero-line)" }}>
              {(["process", "work", "reference", "pricing"] as const).map((key) => (<a key={key} href={`#${key}`} className="text-[1.1rem] font-medium transition-colors duration-500" style={{ color: "var(--hero-nav-text-mute)" }} onClick={() => setMobileOpen(false)}>{t.nav[key]}</a>))}
              <a href="#contact" className="w-full rounded-full py-3 text-center text-[0.92rem] font-medium transition-colors duration-500" style={{ background: "var(--hero-nav-cta-bg)", color: "var(--hero-nav-cta-text)", border: "1px solid var(--hero-line)" }} onClick={() => setMobileOpen(false)}>{t.nav.cta}</a>
            </div>
          )}
        </header>

        {/* Hero content */}
        <div className="relative z-10 flex flex-1 items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-12">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[6fr_5fr]">
              <div className="text-center lg:text-left">
                {/* Badge */}
                <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 transition-colors duration-500 md:mb-12" style={{ background: "var(--hero-badge-bg)", border: "1px solid var(--hero-badge-border)" }}>
                  <span className="block h-2 w-2 rounded-full" style={{ background: "var(--hero-badge-dot)", boxShadow: "0 0 0 0 rgba(22,163,74,0.55)", animation: "status-pulse 2.4s ease-out infinite" }} />
                  <span className="text-sm tracking-wide transition-colors duration-500" style={{ color: "var(--hero-badge-text)" }}>{t.hero.badge}</span>
                </motion.div>
                {/* Eyebrow */}
                <motion.p custom={0.5} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500" style={{ color: "var(--hero-text-mute)" }}>{t.hero.eyebrow}</motion.p>
                {/* Headline */}
                <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                  <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-7xl lg:text-8xl">
                    <span className="transition-colors duration-500" style={{ color: "var(--hero-title-a)" }}>{t.hero.titleA}</span><br />
                    <span className="transition-colors duration-500" style={{ color: "var(--hero-title-b)" }}>{t.hero.titleB}</span>
                  </h1>
                </motion.div>
                {/* Sub */}
                <motion.p custom={2} variants={fadeUpVariants} initial="hidden" animate="visible" className="mx-auto mb-10 max-w-xl px-4 text-base font-light leading-relaxed tracking-wide transition-colors duration-500 sm:text-lg md:text-xl lg:mx-0 lg:px-0" style={{ color: "var(--hero-text-soft)" }}>
                  {t.hero.sub} <span className="transition-colors duration-500" style={{ color: "var(--hero-highlight)" }}>{t.hero.subHighlight}</span>{t.hero.subEnd}
                </motion.p>
                {/* CTAs */}
                <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.92rem] font-medium transition-colors duration-300 hover:opacity-90" style={{ background: "var(--hero-cta-primary-bg)", color: "var(--hero-cta-primary-text)" }}>{t.hero.cta1}</a>
                  <a href="#process" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.92rem] font-medium backdrop-blur-sm transition-colors duration-300 hover:opacity-80" style={{ background: "var(--hero-cta-secondary-bg)", color: "var(--hero-cta-secondary-text)", border: "1px solid var(--hero-cta-secondary-border)" }}>{t.hero.cta2}</a>
                </motion.div>
                {/* Trust strip */}
                <motion.div custom={4} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-wrap items-center justify-center gap-0 border-t pt-8 text-[0.74rem] font-medium uppercase tracking-[0.1em] transition-colors duration-500 lg:justify-start" style={{ borderColor: "var(--hero-line)", color: "var(--hero-text-mute)" }}>
                  {(t.hero.trust as string[]).map((item: string, i: number) => (
                    <span key={i} className="inline-flex items-center py-1.5">
                      {i > 0 && <span className="mx-4 inline-block h-[3px] w-[3px] rounded-full opacity-60 transition-colors duration-500" style={{ background: "var(--hero-text-mute)" }} />}
                      {item === "Vorschau" || item === "Preview" || item === "Aperçu" || item === "Anteprima" ? (<>{item} <span className="ml-1 transition-colors duration-500" style={{ color: "var(--hero-highlight)" }}>{t.hero.trustHighlight}</span></>) : item}
                    </span>
                  ))}
                </motion.div>
              </div>
              {/* Portrait */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }} className="hidden lg:block">
                <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl transition-shadow duration-500" style={{ border: "2px solid var(--hero-portrait-border)", boxShadow: `0 8px 32px 0 var(--hero-portrait-shadow)` }}>
                  <Image src="/portrait-800.webp" alt="Daniele Mele" fill className="object-cover object-top" sizes="(min-width:1024px) 560px, 90vw" priority />
                  <div className="absolute inset-0 transition-colors duration-500" style={{ background: `linear-gradient(to top, var(--hero-overlay-from), transparent, transparent)` }} />
                </figure>
                <figcaption className="mt-4 flex justify-between px-1 text-[0.78rem] transition-colors duration-500" style={{ color: "var(--hero-caption)" }}><span>{t.hero.captionName}</span><span>{t.hero.captionRole}</span></figcaption>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 transition-colors duration-700" style={{ background: `linear-gradient(to top, var(--hero-bg), transparent)` }} />
      </div>

      {/* ══════════ BODY — theme-aware sections ══════════ */}
      <div className="transition-colors duration-500" style={{ background: "var(--bg)" }}>
        {/* Sticky header for body sections */}
        <header className="sticky top-0 z-50 transition-colors duration-500" style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
          <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-6 md:px-12">
            <a href="#top" className="flex items-center gap-2 text-base font-semibold transition-colors duration-500" style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}>
              <span className="relative inline-block h-[22px] w-[22px] transition-colors duration-500" style={{ border: "1.5px solid var(--brand-accent)", background: "var(--card-bg)" }} aria-hidden="true"><span className="absolute right-1 top-1 block h-1.5 w-1.5 transition-colors duration-500" style={{ background: "var(--brand-accent)" }} /></span>
              Daniele Mele
            </a>
            <nav className="hidden items-center gap-9 lg:flex">
              {(["process", "work", "reference", "pricing"] as const).map((key) => (
                <a key={key} href={`#${key}`} className="text-[0.9rem] font-medium transition-colors duration-300 hover:text-[var(--brand-accent)]" style={{ color: "var(--ink)" }}>{t.nav[key]}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[0.78rem] font-medium uppercase transition-colors duration-500" style={{ color: "var(--ink-mute)", letterSpacing: "0.06em" }}>
                {LANGS.map((l, i) => (
                  <span key={l} className="flex items-center">
                    {i > 0 && <span className="mx-1 transition-colors duration-500" style={{ color: "var(--line)" }}>/</span>}
                    <button onClick={() => switchLang(l)} className="cursor-pointer border-none bg-transparent px-1 py-1 font-inherit uppercase transition-colors duration-300 hover:text-[var(--ink)]" style={{ color: lang === l ? "var(--ink)" : "var(--ink-mute)", letterSpacing: "0.06em" }}>{l.toUpperCase()}</button>
                  </span>
                ))}
              </div>
              <ThemeToggle dark={dark} onToggle={toggleTheme} />
              <a href="#contact" className="hidden rounded-full px-8 py-3.5 text-[0.92rem] font-medium transition-colors duration-300 hover:opacity-90 lg:inline-flex" style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}>{t.nav.cta}</a>
              <button className="inline-flex border p-2 lg:hidden" style={{ borderColor: "var(--line)", color: "var(--ink)", background: "none" }} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
            </div>
          </div>
        </header>

        <main id="top">
          {/* ══════════ MANIFESTO ══════════ */}
          <section className="border-y py-24 transition-colors duration-500 lg:py-36" style={{ background: "var(--bg-soft)", borderColor: "var(--line)" }}>
            <div className="mx-auto max-w-[1320px] px-6 md:px-12">
              <Reveal className="mx-auto max-w-[62rem]">
                <span className="mb-5 block font-serif text-[3.2rem] leading-[0.7] transition-colors duration-500" style={{ color: "var(--brand-accent)" }} aria-hidden="true">&ldquo;</span>
                <p style={{ fontSize: "clamp(1.85rem, 4.4vw, 3.6rem)", lineHeight: 1.12, letterSpacing: "-0.028em", fontWeight: 500, color: "var(--ink)" }} className="mb-11 transition-colors duration-500">
                  {t.manifesto.a}<em className="transition-colors duration-500" style={{ fontStyle: "normal", color: "var(--brand-accent)" }}>{t.manifesto.b}</em>
                </p>
                <div className="flex items-center gap-4 border-t pt-7 text-[0.78rem] font-medium uppercase transition-colors duration-500" style={{ borderColor: "var(--line)", color: "var(--ink-mute)", letterSpacing: "0.12em" }}>
                  <span className="block h-px w-7 transition-colors duration-500" style={{ background: "var(--brand-accent)" }} />
                  <span><strong className="font-medium transition-colors duration-500" style={{ color: "var(--ink)" }}>Daniele Mele</strong> · {t.manifesto.sig}</span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ══════════ PROCESS ══════════ */}
          <section id="process" className="py-24 transition-colors duration-500 md:py-32 lg:py-40" style={{ background: "var(--bg-soft)" }}>
            <div className="mx-auto max-w-[1320px] px-6 md:px-12">
              <Reveal className="mb-16 max-w-[56rem] lg:mb-22">
                <span className="mb-5 block text-[0.72rem] font-medium uppercase transition-colors duration-500" style={{ letterSpacing: "0.14em", color: "var(--ink-mute)" }}>{t.process.eyebrow}</span>
                <h2 className="transition-colors duration-500" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)" }}>{t.process.title}</h2>
                <p className="mt-7 max-w-[38rem] transition-colors duration-500" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55, color: "var(--ink-soft)" }}>
                  {t.process.sub} <strong className="transition-colors duration-500" style={{ color: "var(--brand-accent)" }}>{t.process.subHighlight}</strong>{t.process.subEnd}
                </p>
              </Reveal>
              <Reveal className="mx-auto flex max-w-[56rem] flex-col">
                {(t.process.steps as { title: string; desc: string }[]).map((step, i) => (
                  <div key={i} className="flex items-stretch gap-6 md:gap-8">
                    <div className="flex flex-shrink-0 flex-col items-center">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[0.95rem] font-semibold transition-colors duration-500" style={{ background: "var(--brand-accent)", color: "var(--btn-primary-text)", border: "1px solid var(--brand-accent)" }}>{i + 1}</div>
                      {i < (t.process.steps as any[]).length - 1 && <div className="my-2 min-h-[32px] w-0.5 flex-1 transition-colors duration-500" style={{ background: "var(--brand-accent)" }} />}
                    </div>
                    <div className={`flex-1 ${i < (t.process.steps as any[]).length - 1 ? "pb-10 md:pb-12" : ""} pt-2`}>
                      <h3 className="mb-2 text-[1.2rem] font-medium transition-colors duration-500 md:text-[1.4rem]" style={{ color: "var(--ink)", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{step.title}</h3>
                      <p className="max-w-[38rem] text-base leading-relaxed transition-colors duration-500" style={{ color: "var(--ink-soft)" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ══════════ WORK ══════════ */}
          <section id="work" className="py-24 transition-colors duration-500 md:py-32 lg:py-40" style={{ background: "var(--bg)" }}>
            <div className="mx-auto max-w-[1320px] px-6 md:px-12">
              <Reveal className="mb-16 max-w-[56rem] lg:mb-22">
                <span className="mb-5 block text-[0.72rem] font-medium uppercase transition-colors duration-500" style={{ letterSpacing: "0.14em", color: "var(--ink-mute)" }}>{t.work.eyebrow}</span>
                <h2 className="transition-colors duration-500" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)" }}>{t.work.title}</h2>
                <p className="mt-7 max-w-[38rem] transition-colors duration-500" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55, color: "var(--ink-soft)" }}>{t.work.sub}</p>
              </Reveal>
              <Reveal>
                <div className="grid grid-cols-1 border transition-colors duration-500 md:grid-cols-2" style={{ borderColor: "var(--line)", gap: "1px", background: "var(--line)" }}>
                  <div className="p-10 transition-colors duration-500 lg:p-14" style={{ background: "var(--card-bg)" }}>
                    <h3 className="mb-7 text-[1.4rem] font-medium transition-colors duration-500" style={{ color: "var(--ink)" }}>{t.work.doTitle}</h3>
                    <ul className="m-0 list-none p-0">
                      {(t.work.doItems as string[]).map((item, i) => (
                        <li key={i} className="flex items-center gap-3 py-3 text-base transition-colors duration-200 hover:pl-1.5 hover:text-[var(--brand-accent)]" style={{ borderBottom: i < (t.work.doItems as string[]).length - 1 ? "1px solid var(--line)" : "none", color: "var(--ink)" }}>
                          <span className="block h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-500" style={{ background: "var(--brand-accent)" }} />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-10 transition-colors duration-500 lg:p-14" style={{ background: "var(--card-bg)" }}>
                    <h3 className="mb-7 text-[1.4rem] font-medium transition-colors duration-500" style={{ color: "var(--ink)" }}>{t.work.dontTitle}</h3>
                    <p className="text-base leading-relaxed transition-colors duration-500" style={{ color: "var(--ink-soft)" }}>{t.work.dontDesc}</p>
                    <div className="mt-7 border-t pt-6 text-[0.78rem] font-medium uppercase transition-colors duration-500" style={{ borderColor: "var(--line)", color: "var(--brand-accent)", letterSpacing: "0.12em" }}>{t.work.dontNote}</div>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="relative mt-22 overflow-hidden border-y py-9 transition-colors duration-500" style={{ borderColor: "var(--line)", maskImage: "linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)" }} aria-hidden="true">
              <div className="inline-flex w-max items-center gap-14 whitespace-nowrap" style={{ animation: "marquee-scroll 42s linear infinite" }}>
                {marqueeItems.map((item, i) => (
                  <span key={i} className="inline-flex items-center">
                    <span className="font-medium leading-none transition-colors duration-500" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: i % 4 === 0 ? "var(--brand-accent)" : "var(--ink)", letterSpacing: "-0.03em" }}>{item}</span>
                    {i < marqueeItems.length - 1 && <span className="ml-14 inline-block h-10 w-px flex-shrink-0 transition-colors duration-500" style={{ background: "var(--line)" }} />}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ REFERENCE ══════════ */}
          <section id="reference" className="py-24 transition-colors duration-500 md:py-32 lg:py-40" style={{ background: "var(--bg-soft)" }}>
            <div className="mx-auto max-w-[1320px] px-6 md:px-12">
              <Reveal className="mb-16 max-w-[56rem] lg:mb-22">
                <span className="mb-5 block text-[0.72rem] font-medium uppercase transition-colors duration-500" style={{ letterSpacing: "0.14em", color: "var(--ink-mute)" }}>{t.ref.eyebrow}</span>
                <h2 className="transition-colors duration-500" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)" }}>{t.ref.title}</h2>
              </Reveal>
              <Reveal>
                <ul className="m-0 max-w-[56rem] list-none border-t p-0 transition-colors duration-500" style={{ borderColor: "var(--line)" }}>
                  {(t.ref.items as { name: string; meta: string; url: string }[]).map((item, i) => (
                    <li key={i}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="grid items-center gap-6 border-b py-7 transition-all duration-200 hover:pl-2 md:grid-cols-[1.4fr_1.6fr_auto]" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>
                        <span className="text-[1.15rem] font-medium transition-colors duration-500" style={{ letterSpacing: "-0.015em" }}>{item.name}</span>
                        <span className="text-[0.95rem] transition-colors duration-500" style={{ color: "var(--ink-mute)" }}>{item.meta}</span>
                        <span className="inline-flex items-center gap-2 text-[0.85rem] font-medium uppercase" style={{ letterSpacing: "0.1em" }}>{t.ref.visit}<ArrowUpRight size={14} /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* ══════════ PRICING ══════════ */}
          <section id="pricing" className="py-24 transition-colors duration-500 md:py-32 lg:py-40" style={{ background: "var(--bg)" }}>
            <div className="mx-auto max-w-[1320px] px-6 md:px-12">
              <Reveal className="mb-16 max-w-[56rem] lg:mb-22">
                <span className="mb-5 block text-[0.72rem] font-medium uppercase transition-colors duration-500" style={{ letterSpacing: "0.14em", color: "var(--ink-mute)" }}>{t.price.eyebrow}</span>
                <h2 className="transition-colors duration-500" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)" }}>{t.price.title}</h2>
                <p className="mt-7 max-w-[38rem] transition-colors duration-500" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55, color: "var(--ink-soft)" }}>{t.price.sub}</p>
              </Reveal>
              <Reveal>
                <div className="grid grid-cols-1 gap-12 border-t pt-16 transition-colors duration-500 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:pt-20" style={{ borderColor: "var(--line)" }}>
                  <div>
                    <span className="mb-4 block text-[0.72rem] font-medium uppercase transition-colors duration-500" style={{ letterSpacing: "0.14em", color: "var(--ink-mute)" }}>{t.price.label}</span>
                    <div className="transition-colors duration-500" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 500, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                      <span className="align-top text-[0.45em] transition-colors duration-500" style={{ color: "var(--ink-mute)", marginRight: "0.4rem" }}>CHF</span>{t.price.amount}
                    </div>
                    <p className="mt-5 text-[0.92rem] transition-colors duration-500" style={{ color: "var(--ink-mute)" }}>{t.price.amountSub}</p>
                    <div className="mt-10">
                      <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.92rem] font-medium transition-colors duration-300 hover:opacity-90" style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}>{t.price.cta}</a>
                    </div>
                  </div>
                  <ul className="m-0 columns-1 list-none p-0 md:columns-2 md:gap-12">
                    {(t.price.items as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 break-inside-avoid border-b py-4 text-base transition-colors duration-500" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>
                        <Check size={14} className="mt-1 flex-shrink-0 transition-colors duration-500" style={{ color: "var(--brand-accent)" }} />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ══════════ CONTACT ══════════ */}
          <section id="contact" className="py-24 transition-colors duration-500 md:py-32 lg:py-40" style={{ background: "var(--bg-soft)" }}>
            <div className="mx-auto max-w-[1320px] px-6 md:px-12">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-[5fr_7fr] lg:gap-24">
                <Reveal>
                  <span className="mb-5 block text-[0.72rem] font-medium uppercase transition-colors duration-500" style={{ letterSpacing: "0.14em", color: "var(--ink-mute)" }}>{t.contact.eyebrow}</span>
                  <h2 className="mb-7 transition-colors duration-500" style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--ink)" }}>{t.contact.title}</h2>
                  <p className="mb-10 max-w-[28rem] transition-colors duration-500" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)", lineHeight: 1.55, color: "var(--ink-soft)" }}>{t.contact.sub}</p>
                  <div className="border-t pt-7 text-[0.92rem] transition-colors duration-500" style={{ borderColor: "var(--line)", color: "var(--ink-mute)" }}>
                    {t.contact.or}<br />
                    <a href="mailto:hello@danielemele.ch" className="border-b pb-px transition-colors duration-200 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]" style={{ color: "var(--ink)", borderColor: "var(--ink)" }}>hello@danielemele.ch</a>
                  </div>
                </Reveal>
                <Reveal>
                  {!formSent ? (
                    <form className="grid grid-cols-1 gap-8 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
                      <FormField label={t.contact.form.name} name="name" type="text" required />
                      <FormField label={t.contact.form.email} name="email" type="email" required />
                      <FormField label={t.contact.form.company} name="company" type="text" />
                      <FormField label={t.contact.form.linkedin} name="linkedin" type="url" placeholder="https://linkedin.com/company/..." />
                      <div className="md:col-span-2"><FormField label={t.contact.form.message} name="message" type="textarea" placeholder={t.contact.form.placeholder} /></div>
                      <div className="absolute left-[-9999px] h-px w-px opacity-0" aria-hidden="true"><label>Do not fill<input type="text" name="_honey" tabIndex={-1} autoComplete="off" /></label></div>
                      <div className="md:col-span-2">
                        <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[0.92rem] font-medium transition-colors duration-300 hover:opacity-90 disabled:opacity-60" style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}>
                          {sending ? t.contact.form.sending : t.contact.form.submit}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col items-start gap-5 py-10">
                      <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-500" style={{ background: "var(--brand-accent)", color: "var(--btn-primary-text)", animation: "check-pop 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.4) both" }}><Check size={24} strokeWidth={2.5} /></div>
                      <h3 className="transition-colors duration-500" style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--ink)" }}>{t.contact.form.sentTitle}</h3>
                      <p className="max-w-[32rem] text-[1.05rem] leading-relaxed transition-colors duration-500" style={{ color: "var(--ink-soft)" }}>{t.contact.form.sentDesc}</p>
                      <a href="#top" className="mt-3 inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-[0.92rem] font-medium transition-colors duration-300 hover:opacity-80" style={{ borderColor: "var(--btn-secondary-border)", color: "var(--btn-secondary-text)", background: "var(--btn-secondary-bg)" }}>{t.contact.form.sentBack}</a>
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          </section>
        </main>

        {/* ══════════ FOOTER ══════════ */}
        <footer className="border-t py-12 pb-8 transition-colors duration-500" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
          <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-12">
            <a href="#top" className="flex items-center gap-2 text-base font-semibold transition-colors duration-500" style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}>
              <span className="relative inline-block h-[22px] w-[22px] transition-colors duration-500" style={{ border: "1.5px solid var(--brand-accent)", background: "var(--card-bg)" }} aria-hidden="true"><span className="absolute right-1 top-1 block h-1.5 w-1.5 transition-colors duration-500" style={{ background: "var(--brand-accent)" }} /></span>
              Daniele Mele
            </a>
            <span className="text-[0.82rem] transition-colors duration-500" style={{ color: "var(--ink-mute)" }}>{t.footer.role} · {t.footer.location}</span>
            <span className="text-[0.82rem] transition-colors duration-500" style={{ color: "var(--ink-mute)" }}>
              &copy; {new Date().getFullYear()} Daniele Mele · {t.footer.rights} ·{" "}
              <a href="/privacy.html" className="border-b transition-colors duration-200 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]" style={{ color: "var(--ink-soft)", borderColor: "var(--line)" }}>{t.footer.privacy}</a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ───────────── Form field ───────────── */
function FormField({ label, name, type, required = false, placeholder }: { label: string; name: string; type: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={`f-${name}`} className="mb-2.5 text-[0.7rem] font-medium uppercase transition-colors duration-500" style={{ letterSpacing: "0.12em", color: "var(--ink-mute)" }}>{label}</label>
      {type === "textarea" ? (
        <textarea id={`f-${name}`} name={name} rows={4} required={required} placeholder={placeholder}
          className="transition-colors duration-500"
          style={{ background: "transparent", border: "0", borderBottom: "1px solid var(--input-border)", padding: "0.65rem 0", font: "inherit", fontSize: "1rem", color: "var(--input-text)", width: "100%", outline: "none", resize: "vertical", minHeight: "120px" }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--input-focus)")} onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--input-border)")} />
      ) : (
        <input id={`f-${name}`} name={name} type={type} required={required} placeholder={placeholder}
          className="transition-colors duration-500"
          style={{ background: "transparent", border: "0", borderBottom: "1px solid var(--input-border)", padding: "0.65rem 0", font: "inherit", fontSize: "1rem", color: "var(--input-text)", width: "100%", outline: "none" }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--input-focus)")} onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--input-border)")} />
      )}
    </div>
  );
}
