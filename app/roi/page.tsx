"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Visibility = "low" | "medium" | "high" | "unknown";

const visibilityFactors: Record<Visibility, number> = {
  low: 0.35,
  medium: 0.25,
  high: 0.15,
  unknown: 0.25,
};

const visibilityLabels: Record<Visibility, string> = {
  low: "Kaum",
  medium: "Gelegentlich",
  high: "Regelmässig",
  unknown: "Weiss ich nicht",
};

const formatCHF = (value: number) =>
  new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  value.toLocaleString("de-CH", {
    maximumFractionDigits: 1,
  });

export default function RoiPage() {
  const [leads, setLeads] = useState(40);
  const [conversion, setConversion] = useState(20);
  const [orderValue, setOrderValue] = useState(2500);
  const [visibility, setVisibility] =
    useState<Visibility>("medium");

  const result = useMemo(() => {
    const visibilityFactor = visibilityFactors[visibility];

    // Potenzial zusätzlicher qualifizierter Anfragen
    // durch eine verbesserte Sichtbarkeit in AI Search.
    const additionalLeads = leads * visibilityFactor;

    // Zusätzliche AI-Search-Leads werden mit einer um 25 %
    // höheren Abschlusswahrscheinlichkeit modelliert.
    // Deckelung bei 50 %.
    const aiConversion = Math.min(conversion * 1.25, 50);

    const additionalCustomers =
      additionalLeads * (aiConversion / 100);

    const monthlyPotential =
      additionalCustomers * orderValue;

    const yearlyPotential =
      monthlyPotential * 12;

    return {
      visibilityFactor,
      additionalLeads,
      aiConversion,
      additionalCustomers,
      monthlyPotential,
      yearlyPotential,
    };
  }, [leads, conversion, orderValue, visibility]);

  return (
    <main className="roi-page">
      <header className="roi-header">
        <div className="roi-container roi-nav">
          <Link href="/" className="roi-brand">
            <img
              src="/voixero-logo.png"
              alt="Voixero"
              className="roi-logo"
            />
          </Link>

          <Link href="/" className="roi-back">
            ← Zurück zu Convert
          </Link>
        </div>
      </header>

      <section className="roi-hero">
        <div className="roi-container">
          <div className="roi-intro">
            <span className="roi-eyebrow">
              CONVERT ROI-CHECK
            </span>

            <h1>
              Welches Potenzial steckt in Ihrer
              <span> KI-Sichtbarkeit?</span>
            </h1>

            <p>
              Beantworten Sie vier einfache Fragen und erhalten Sie
              eine transparente Einschätzung Ihres zusätzlichen
              Umsatzpotenzials durch bessere Sichtbarkeit in
              ChatGPT, Gemini &amp; Co.
            </p>
          </div>

          <div className="roi-calculator">
            <div className="roi-input-panel">
              <div className="roi-panel-label">
                IHRE ANGABEN
              </div>

              <h2>Ihr Unternehmen</h2>

              <div className="roi-field">
                <label>
                  Wie viele qualifizierte Anfragen erhalten Sie
                  durchschnittlich pro Monat?
                </label>

                <div className="roi-number-input">
                  <input
                    type="number"
                    min="0"
                    value={leads}
                    onChange={(e) =>
                      setLeads(
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                  <span>Leads / Monat</span>
                </div>
              </div>

              <div className="roi-field">
                <label>
                  Wie viele dieser Anfragen werden durchschnittlich
                  zu Kunden?
                </label>

                <div className="roi-number-input">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={conversion}
                    onChange={(e) =>
                      setConversion(
                        Math.min(
                          100,
                          Math.max(0, Number(e.target.value))
                        )
                      )
                    }
                  />
                  <span>% Abschlussquote</span>
                </div>
              </div>

              <div className="roi-field">
                <label>
                  Wie hoch ist der durchschnittliche Umsatz eines
                  neuen Kunden?
                </label>

                <div className="roi-number-input">
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={orderValue}
                    onChange={(e) =>
                      setOrderValue(
                        Math.max(0, Number(e.target.value))
                      )
                    }
                  />
                  <span>CHF</span>
                </div>
              </div>

              <div className="roi-field">
                <label>
                  Wie häufig begegnet Ihnen Ihr Unternehmen heute in
                  Antworten von ChatGPT, Gemini &amp; Co.?
                </label>

                <div className="roi-visibility-grid">
                  {(
                    [
                      "low",
                      "medium",
                      "high",
                      "unknown",
                    ] as Visibility[]
                  ).map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={
                        visibility === item ? "active" : ""
                      }
                      onClick={() => setVisibility(item)}
                    >
                      {visibilityLabels[item]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="roi-result-panel">
              <div className="roi-panel-label">
                IHR POTENZIAL
              </div>

              <p className="roi-result-caption">
                Geschätztes zusätzliches Umsatzpotenzial
              </p>

              <div className="roi-main-result">
                {formatCHF(result.monthlyPotential)}
                <span>/ Monat</span>
              </div>

              <div className="roi-year-result">
                {formatCHF(result.yearlyPotential)} pro Jahr
              </div>

              <div className="roi-result-grid">
                <div>
                  <span>
                    Zusätzliche qualifizierte Anfragen
                  </span>

                  <strong>
                    +{formatNumber(result.additionalLeads)}
                  </strong>

                  <small>pro Monat</small>
                </div>

                <div>
                  <span>
                    Geschätzte zusätzliche Kunden
                  </span>

                  <strong>
                    +{formatNumber(result.additionalCustomers)}
                  </strong>

                  <small>pro Monat</small>
                </div>
              </div>

              <div className="roi-explanation">
                <strong>So entsteht die Schätzung</strong>

                <p>
                  Aufgrund Ihrer angegebenen heutigen
                  KI-Sichtbarkeit modellieren wir ein zusätzliches
                  Potenzial qualifizierter Anfragen von{" "}
                  <strong>
                    {Math.round(
                      result.visibilityFactor * 100
                    )} %
                  </strong>
                  .
                </p>

                <p>
                  Für zusätzliche Anfragen aus AI Search wird eine
                  modellierte Abschlussquote von{" "}
                  <strong>
                    {formatNumber(result.aiConversion)} %
                  </strong>{" "}
                  verwendet. Ihre heutige Abschlussquote beträgt{" "}
                  <strong>
                    {formatNumber(conversion)} %
                  </strong>
                  .
                </p>
              </div>

              <div className="roi-formula">
                <span>
                  {formatNumber(result.additionalLeads)} zusätzliche
                  Leads
                </span>

                <span>×</span>

                <span>
                  {formatNumber(result.aiConversion)} % Abschluss
                </span>

                <span>×</span>

                <span>{formatCHF(orderValue)}</span>
              </div>

              <div className="roi-disclaimer">
                Die Berechnung stellt eine modellierte
                Potenzialanalyse dar und dient der Orientierung.
                Tatsächliche Ergebnisse hängen unter anderem von
                Markt, Angebot, Wettbewerb, Website,
                KI-Sichtbarkeit und Vertriebsprozess ab. Es besteht
                keine Umsatz-, Lead- oder Abschlussgarantie.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="roi-trial">
        <div className="roi-container">
          <div className="roi-trial-card">
            <div>
              <span className="roi-eyebrow">
                IHR NÄCHSTER SCHRITT
              </span>

              <h2>
                Finden Sie heraus, wie sichtbar Ihr Unternehmen
                tatsächlich ist.
              </h2>

              <p>
                Testen Sie Voixero Convert Business drei Monate und
                machen Sie Ihre Sichtbarkeit in KI-Suchen messbar.
              </p>
            </div>

            <div className="roi-trial-offer">
              <span>
                Convert Business Trial · 3 Monate
              </span>

              <strong>CHF 448.–</strong>

              <small>
                inkl. einmaligem Setup · zzgl. MwSt. · keine
                automatische Verlängerung
              </small>

              <Link href="/#kontakt">
                Business Trial starten →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}