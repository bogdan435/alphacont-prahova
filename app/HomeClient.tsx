"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const PHONE_DISPLAY = "0721 644 296";
const PHONE_LINK = "+40721644296";
const EMAIL = "contact@contabilprahova.ro";
const BRAND = "ALPHACONT GROUP";
const SITE_URL = "https://contabilprahova.ro";

const WHATSAPP_LINK =
  "https://wa.me/40721644296?text=Salut!%20Doresc%20o%20ofert%C4%83%20pentru%20servicii%20de%20contabilitate%20%C3%AEn%20Prahova.";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Firma+Contabilitate+Campina+ALPHA+CONT+Birou+Contabil+Calea+Doftanei+194A+105600+C%C3%A2mpina&output=embed";

const content = {
  ro: {
    nav: {
      services: "Servicii",
      about: "Despre",
      resources: "Resurse fiscale",
      process: "Cum lucrăm",
      faq: "Întrebări frecvente",
      contact: "Contact",
    },
    topBar: "Contabilitate în Prahova • Expert contabil Prahova",
    heroTitle: "Expert contabil Prahova pentru firme care vor claritate și control",
    heroText:
      "Contabilitate completă pentru SRL și PFA din Prahova. Primești răspuns rapid, comunicare clară și suport real în relația cu ANAF — fără stres și fără surprize.",
    requestOffer: "Solicită ofertă",
    responsePromise: "Răspuns rapid, de regulă în aceeași zi lucrătoare.",
    trustBadges: [
      "19+ ani experiență",
      "Răspuns rapid",
      "Suport ANAF",
      "Firme din Prahova",
    ],
    servicesTitle: "Servicii esențiale pentru firme",
    services: [
      "Contabilitate completă pentru SRL și PFA",
      "Salarizare și Revisal",
      "Declarații fiscale și bilanțuri",
      "Asistență ANAF și controale",
      "Suport ANAF și I.T.M.",
      "Consultanță fiscală",
    ],
    aboutTitle: `De ce ${BRAND}`,
    aboutParagraphs: [
      "La ALPHACONT GROUP, oferim mai mult decât servicii contabile — oferim siguranță și control asupra situației financiare a afacerii tale.",
      "Lucrăm structurat, transparent și responsabil, astfel încât fiecare decizie să fie fundamentată corect, iar riscurile fiscale să fie reduse la minimum.",
      "Suntem partenerul tău de încredere în gestionarea corectă și eficientă a contabilității.",
    ],
    resourcesTitle: "Resurse fiscale",
    resourcesText:
      "Acces rapid la informații utile despre obligații fiscale, ANAF și bune practici pentru companii din Prahova și din România.",
    processTitle: "Cum lucrăm",
    processSteps: [
      {
        title: "Ne contactezi",
        text: "Ne suni, ne scrii pe WhatsApp sau completezi formularul de contact.",
      },
      {
        title: "Analizăm situația firmei",
        text: "Discutăm despre activitate, documente și nevoile contabile sau fiscale ale firmei tale.",
      },
      {
        title: "Primești oferta și începem colaborarea",
        text: "Îți trimitem o ofertă clară, iar după acceptare începem colaborarea rapid și organizat.",
      },
    ],
    faqTitle: "Întrebări frecvente",
    faqs: [
      {
        question: "Cât costă contabilitatea pentru un SRL?",
        answer: "Prețul pornește de la 300 lei/lună, în funcție de activitate și volum.",
      },
      {
        question: "Lucrați și cu PFA?",
        answer:
          "Da, lucrăm și cu PFA și adaptăm serviciile în funcție de specificul activității.",
      },
      {
        question: "Oferiți suport în relația cu ANAF?",
        answer:
          "Da, oferim suport în relația cu ANAF și asistență pentru situațiile fiscale uzuale.",
      },
      {
        question: "Pot schimba contabilul dacă am deja firmă?",
        answer:
          "Da. Te ghidăm în procesul de preluare și organizăm tranziția cât mai simplu.",
      },
    ],
    contactTitle: "Solicită o ofertă",
    contactText:
      "Completează formularul și revenim rapid cu o soluție adaptată companiei tale.",
    companyBenefits: [
      "Comunicare clară și rapidă",
      "Reducerea riscurilor fiscale",
      "Suport real pentru firme din Prahova",
    ],
    stats: ["19+ ani experiență", "100+ clienți", "răspuns rapid"],
  },
};

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`text-3xl font-bold tracking-tight text-slate-950 md:text-4xl ${className}`}>
      {children}
    </h2>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-5 w-5 fill-current"
    >
      <path d="M16 .6C7.5.6.6 7.3.6 15.6c0 2.6.7 5.2 2 7.4L.6 31.4l8.6-2.2c2.1 1.1 4.5 1.7 6.9 1.7h.1c8.4 0 15.2-6.7 15.2-15S24.5.6 16 .6Zm0 27.8h-.1c-2.2 0-4.3-.6-6.2-1.7l-.4-.2-5.1 1.3 1.4-4.9-.3-.5A12.2 12.2 0 0 1 3.8 15.6C3.8 9 9.2 3.7 16 3.7c6.7 0 12.1 5.3 12.1 11.9 0 6.6-5.4 12.8-12.1 12.8Zm6.6-8.9c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.7-.2-1 .2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.2-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7l.4-.6c.1-.2.1-.4 0-.6-.1-.2-.9-2.2-1.3-3-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.6.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 2.9 1.3 3.2.2.2 2.3 3.6 5.6 5 .8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 2.4-1 2.7-1.9.3-1 .3-1.8.2-1.9-.1-.2-.3-.3-.7-.5Z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current transition ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current transition ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function validateField(
  name: keyof Pick<FormState, "name" | "email" | "phone" | "message">,
  value: string
) {
  const trimmed = value.trim();

  switch (name) {
    case "name":
      if (!trimmed) return "Introduceți numele.";
      if (trimmed.length < 2) return "Numele trebuie să aibă cel puțin 2 caractere.";
      return "";
    case "email":
      if (!trimmed) return "Introduceți adresa de email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return "Introduceți o adresă de email validă.";
      }
      return "";
    case "phone":
      if (!trimmed) return "Introduceți numărul de telefon.";
      if (!/^[+]?[0-9\s\-()]{8,20}$/.test(trimmed)) {
        return "Introduceți un număr de telefon valid.";
      }
      return "";
    case "message":
      if (!trimmed) return "Introduceți mesajul.";
      if (trimmed.length < 10) {
        return "Mesajul trebuie să aibă cel puțin 10 caractere.";
      }
      return "";
    default:
      return "";
  }
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;

  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-600">
      {error}
    </p>
  );
}

function inputClass(hasError?: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
  }`;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackLead(formName = "homepage_contact") {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "generate_lead", {
    form_name: formName,
    method: "website_form",
    page_location: window.location.href,
  });
}

export default function HomeClient() {
  const t = content.ro;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        name: BRAND,
        url: SITE_URL,
        image: `${SITE_URL}/office-main.jpg`,
        areaServed: "Prahova",
        telephone: PHONE_DISPLAY,
        email: EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calea Doftanei 194A",
          addressLocality: "Câmpina",
          postalCode: "105600",
          addressRegion: "Prahova",
          addressCountry: "RO",
        },
        description:
          "Servicii complete de contabilitate, salarizare, declarații fiscale și asistență ANAF pentru firme din Prahova.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE_DISPLAY,
          contactType: "customer service",
          areaServed: "RO",
          availableLanguage: ["ro"],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: t.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
    [t.faqs]
  );

  const navItems = [
    { href: "#services", label: t.nav.services },
    { href: "#about", label: t.nav.about },
    { href: "#resources", label: t.nav.resources },
    { href: "#process", label: t.nav.process },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  function validateForm() {
    const nextErrors: FieldErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      phone: validateField("phone", form.phone),
      message: validateField("message", form.message),
    };

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitMessage("");
    setSubmitError(false);

    if (!validateForm()) {
      setSubmitError(true);
      setSubmitMessage("Verificați câmpurile marcate și încercați din nou.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          website: form.website.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "A apărut o eroare la trimitere.");
      }

      trackLead("homepage_contact");

      setSubmitError(false);
      setSubmitMessage("Mesajul a fost trimis cu succes. Revenim cât mai rapid.");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        website: "",
      });
      setErrors({});
    } catch (error) {
      setSubmitError(true);
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "A apărut o eroare. Încearcă din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    const nextValue =
      name === "phone" ? value.replace(/[^0-9+\s\-()]/g, "") : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (name === "name" || name === "email" || name === "phone" || name === "message") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, nextValue),
      }));
    }
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    if (name === "name" || name === "email" || name === "phone" || name === "message") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .whatsapp-pulse {
            animation: none !important;
          }
        }

        @keyframes whatsapp-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);
          }
          70% {
            transform: scale(1.02);
            box-shadow: 0 0 0 14px rgba(34, 197, 94, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        .whatsapp-pulse {
          animation: whatsapp-pulse 2s infinite;
        }
      `}</style>

      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-950 focus:px-4 focus:py-3 focus:text-white"
      >
        Sari la conținut
      </a>

      <div className="min-h-screen overflow-x-clip bg-white text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-2 text-center sm:px-6">
              <div className="text-sm font-medium text-slate-600 sm:text-base">
                {t.topBar}
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-center justify-between gap-3 py-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex shrink-0 items-center"
                  aria-label="Pagina principală ALPHACONT GROUP"
                >
                  <Image
                    src="/logo-blue.svg"
                    alt="Logo ALPHACONT GROUP"
                    width={220}
                    height={64}
                    priority
                    className="h-14 w-auto shrink-0 object-contain sm:h-16"
                  />
                </Link>
              </div>

              <nav
                aria-label="Navigație principală"
                className="hidden items-center gap-7 text-[15px] font-semibold text-slate-700 lg:flex"
              >
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-slate-950">
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-300 px-3.5 py-3 text-slate-900 transition hover:bg-slate-100 lg:hidden"
              >
                <MenuIcon open={mobileMenuOpen} />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-slate-200 bg-white lg:hidden">
              <nav
                id="mobile-navigation"
                aria-label="Navigație mobilă"
                className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6"
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="rounded-xl px-3 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
                  >
                    {item.label}
                  </a>
                ))}

                <a
                  href={`tel:${PHONE_LINK}`}
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-center font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  {PHONE_DISPLAY}
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-center font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-green-600 ring-1 ring-slate-200">
                    <WhatsAppIcon />
                  </span>
                  <span>Discută pe WhatsApp</span>
                </a>
              </nav>
            </div>
          )}
        </header>

        <main id="main-content">
          <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#1e293b_100%)] px-4 pb-16 pt-16 text-white sm:px-6 md:pb-28 md:pt-24">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />

            <div className="relative mx-auto max-w-6xl">
              <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div className="min-w-0">
                  <div className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 shadow-lg shadow-black/10 backdrop-blur">
                    Expert contabil • Servicii financiar-contabile în Prahova
                  </div>

                  <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                    {t.heroTitle}
                  </h1>

                  <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                    {t.heroText}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-300">
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                      Contabilitate SRL / PFA
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                      Salarizare și Revisal
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                      Consultanță fiscală
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-slate-950 shadow-xl shadow-black/10 transition hover:-translate-y-0.5"
                    >
                      {t.requestOffer}
                    </a>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                    >
                      Discută pe WhatsApp
                    </a>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-300">
                    <span className="font-medium text-slate-400">Telefon direct:</span>
                    <a
                      href={`tel:${PHONE_LINK}`}
                      className="font-semibold text-white underline decoration-white/20 underline-offset-4 transition hover:decoration-white"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-400">
                    {t.responsePromise}
                  </p>
                </div>

                <aside className="w-full rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                      De ce ne aleg firmele
                    </div>

                    <div className="mt-5 grid gap-4">
                      {t.trustBadges.map((badge) => (
                        <div
                          key={badge}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                        >
                          <div className="text-lg font-bold text-white">{badge}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <div className="text-sm text-emerald-200">Contact rapid</div>
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 font-semibold text-white hover:opacity-90"
                      >
                        <WhatsAppIcon />
                        Scrie-ne pe WhatsApp
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          <section id="services" className="px-4 py-20 sm:px-6 md:py-24">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-2xl text-center">
                <SectionEyebrow>Servicii</SectionEyebrow>
                <SectionTitle>{t.servicesTitle}</SectionTitle>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Soluții clare pentru evidență contabilă, salarizare, declarații fiscale și suport administrativ.
                </p>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {t.services.map((service) => (
                  <article
                    key={service}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <CheckIcon />
                      <p className="text-base font-semibold leading-7 text-slate-800">
                        {service}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="bg-slate-50 px-4 py-20 sm:px-6 md:py-24">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                <div>
                  <SectionEyebrow>Despre noi</SectionEyebrow>
                  <SectionTitle>{t.aboutTitle}</SectionTitle>

                  <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
                    {t.aboutParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {t.stats.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-slate-200 bg-white p-4 text-center font-semibold text-slate-900 shadow-sm"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
                    <Image
                      src="/office-main.jpg"
                      alt="Birou ALPHACONT GROUP"
                      width={1200}
                      height={800}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-auto w-full rounded-2xl object-cover"
                    />
                  </div>

                  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-lg">
                    <Image
                      src="/office-secondary.jpg"
                      alt="Spațiu de lucru ALPHACONT GROUP"
                      width={1200}
                      height={800}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                      className="h-auto w-full rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="resources" className="px-4 py-20 sm:px-6 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <SectionEyebrow>Resurse utile</SectionEyebrow>
              <SectionTitle>{t.resourcesTitle}</SectionTitle>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {t.resourcesText}
              </p>

              <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
                {t.companyBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="text-base font-semibold text-slate-800">
                      {benefit}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.anaf.ro/anaf/internet/ANAF/asistenta_contribuabili/info_obligatii_fiscale/calendar_obligatii_fiscale/!ut/p/a1/hc89D4IwEAbg3-LQlTvBEuKGC5U4gIkRupiS8BlsSanw90XD4KD1trs8b-4OOGTApZjaWphWSdG_eu7f2Jb5zA3cGFmKmNLD8UyjBDHxFpAvAH9UiNZ8tFvzFvBn_xW4laC_AsuJMfC6V8X73TyUhRfUwHVZlbrUzkMv48aYYdwTJDjPsyOkqBytCH7zjRoNZB8Mhvslw4720yncPAGk_bO3/dl5/d5/L2dBISEvZ0FBIS9nQSEh/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Vezi calendarul obligațiilor fiscale ANAF
              </a>
            </div>
          </section>

          <section id="process" className="px-4 py-20 sm:px-6 md:py-24">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-2xl text-center">
                <SectionEyebrow>Proces simplu</SectionEyebrow>
                <SectionTitle>{t.processTitle}</SectionTitle>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {t.processSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">
                      {index + 1}
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="bg-slate-50 px-4 py-20 sm:px-6 md:py-24">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <SectionEyebrow>FAQ</SectionEyebrow>
                <SectionTitle>{t.faqTitle}</SectionTitle>
              </div>

              <div className="mt-12 space-y-4">
                {t.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <article
                      key={faq.question}
                      className="rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      >
                        <span className="text-lg font-semibold text-slate-900">
                          {faq.question}
                        </span>
                        <span
                          className={`text-2xl leading-none text-slate-400 transition ${
                            isOpen ? "rotate-45" : ""
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div id={`faq-panel-${index}`} className="px-6 pb-6">
                          <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="contact" className="bg-slate-900 px-4 py-20 text-white sm:px-6 md:py-24">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div>
                  <SectionEyebrow>Contact</SectionEyebrow>
                  <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {t.contactTitle}
                  </h2>

                  <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
                    {t.contactText}
                  </p>

                  <p className="mt-3 text-sm font-medium text-slate-400">
                    {t.responsePromise}
                  </p>

                  <div className="mt-8 overflow-hidden rounded-2xl border border-slate-700 bg-white/5">
                    <iframe
                      title="Locație ALPHACONT GROUP"
                      src={MAP_EMBED_URL}
                      width="100%"
                      height="320"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>

                  <a
                    href={`tel:${PHONE_LINK}`}
                    className="mt-8 inline-flex rounded-xl bg-white px-6 py-4 text-lg font-semibold text-slate-900 shadow-md transition hover:shadow-lg"
                  >
                    Sau sună acum: {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="rounded-3xl bg-white p-6 text-left shadow-2xl md:p-8">
                  <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-semibold text-slate-800"
                        >
                          Nume
                        </label>
                        <input
                          id="name"
                          name="name"
                          autoComplete="name"
                          placeholder="Numele dvs."
                          required
                          maxLength={80}
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={inputClass(Boolean(errors.name))}
                        />
                        <FieldError id="name-error" error={errors.name} />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-semibold text-slate-800"
                        >
                          Telefon
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="07xx xxx xxx"
                          required
                          maxLength={20}
                          value={form.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={inputClass(Boolean(errors.phone))}
                        />
                        <FieldError id="phone-error" error={errors.phone} />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-slate-800"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="email@exemplu.ro"
                        required
                        maxLength={120}
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputClass(Boolean(errors.email))}
                      />
                      <FieldError id="email-error" error={errors.email} />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-semibold text-slate-800"
                      >
                        Mesaj
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Spune-ne pe scurt de ce servicii ai nevoie."
                        required
                        rows={6}
                        maxLength={1000}
                        spellCheck
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "message-error" : "message-help"}
                        className={inputClass(Boolean(errors.message))}
                      />
                      <p id="message-help" className="mt-2 text-sm text-slate-500">
                        Cu cât mesajul este mai clar, cu atât revenim mai rapid cu o ofertă potrivită.
                      </p>
                      <FieldError id="message-error" error={errors.message} />
                    </div>

                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-slate-900 py-3.5 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
                    </button>

                    {submitMessage && (
                      <div
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className={`rounded-xl px-4 py-3 text-sm font-medium ${
                          submitError
                            ? "bg-red-50 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-slate-950 px-4 py-10 text-white sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
              <div>
                <div className="text-sm text-slate-400">Telefon</div>
                <a
                  href={`tel:${PHONE_LINK}`}
                  className="mt-2 block text-lg font-semibold hover:opacity-80"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>

              <div>
                <div className="text-sm text-slate-400">Email</div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-2 block text-lg font-semibold hover:opacity-80"
                >
                  {EMAIL}
                </a>
              </div>

              <div>
                <div className="text-sm text-slate-400">Companie</div>
                <div className="mt-2 text-lg font-semibold">{BRAND}</div>
                <div className="mt-1 text-sm text-slate-400">All rights reserved</div>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
              © {new Date().getFullYear()} {BRAND} - All rights reserved
            </div>
          </div>
        </footer>

        <div className="group fixed bottom-24 right-4 z-50 max-w-[calc(100vw-16px)]">
          <div className="pointer-events-none absolute -top-12 right-0 rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
            Scrie-ne pe WhatsApp
          </div>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactează-ne pe WhatsApp"
            className="whatsapp-pulse flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-white shadow-xl transition hover:scale-105 hover:bg-green-600"
          >
            <WhatsAppIcon />
            <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
          </a>
        </div>

        <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 lg:hidden">
          <a
            href={`tel:${PHONE_LINK}`}
            className="w-full max-w-md rounded-full bg-slate-950 px-6 py-4 text-center text-base font-semibold text-white shadow-2xl"
          >
            Sună acum: {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </>
  );
}
