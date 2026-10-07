"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setStatus({
      type: null,
      message: "",
    });

    const data = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      message: formData.get("message"),
      website_check: formData.get("website_check"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Die Anfrage konnte nicht gesendet werden."
        );
      }

      setStatus({
        type: "success",
        message:
          "Vielen Dank! Ihre Anfrage wurde erfolgreich Ã¼bermittelt. Wir melden uns kurzfristig bei Ihnen.",
      });

      form.reset();

      window.setTimeout(() => {
        setStatus({
          type: null,
          message: "",
        });
      }, 15000);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main>
      {/* NAVIGATION */}
      <nav className="nav">
        <div className="container nav-inner">
          <a
            href="https://www.voixero.com/"
            className="brand"
            aria-label="Voixero"
          >
            <img
              src="/voixero-logo.png"
              alt="Voixero"
              className="voixero-logo"
            />
          </a>

          <div className="nav-links">
            <a href="#features">Funktionen</a>
            <a href="#trial">Business Trial</a>
            <a href="#kontakt">Kontakt</a>
            <a href="https://www.voixero.com/#/convert">
              Voixero Convert â†—
            </a>
          </div>

          <a href="#kontakt" className="button button-small">
            3 Monate testen
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              VOIXERO CONVERT BUSINESS
            </div>

            <h1>
              Werden Sie sichtbar.
              <span>Dort, wo Ihre Kunden heute suchen.</span>
            </h1>

            <p className="hero-text">
              Finden Sie heraus, wie sichtbar Ihr Unternehmen in ChatGPT,
              Gemini &amp; Co. wirklich ist â€“ und verbessern Sie Ihre
              AI Visibility systematisch.
            </p>

            <div className="hero-actions">
              <a href="#kontakt" className="button button-primary">
                Business Trial starten
                <span>â†’</span>
              </a>

              <a
                href="https://www.voixero.com/#/convert"
                className="text-link"
              >
                Mehr Ã¼ber Voixero Convert â†—
              </a>
            </div>

            <div className="hero-trust">
              <div>
                <strong>3 Monate</strong>
                <span>Convert Business</span>
              </div>

              <div>
                <strong>CHF 448.â€“</strong>
                <span>Total zzgl. MwSt.</span>
              </div>

              <div>
                <strong>Keine VerlÃ¤ngerung</strong>
                <span>endet automatisch</span>
              </div>
            </div>
          </div>

          {/* PRODUCT MOCKUP */}
          <div className="dashboard-wrap">
            <div className="dashboard">
              <div className="dashboard-top">
                <div>
                  <span className="dashboard-label">GLOBAL VISIBILITY</span>
                  <h3>AI Visibility Overview</h3>
                </div>

                <span className="live-badge">
                  <span />
                  LIVE
                </span>
              </div>

              <div className="score-section">
                <div className="score-ring">
                  <div className="score-inner">
                    <strong>72</strong>
                    <span>/ 100</span>
                  </div>
                </div>

                <div className="score-copy">
                  <span>GLOBAL VISIBILITY SCORE</span>
                  <strong>Sehr gute Sichtbarkeit</strong>
                  <p>
                    Ihre Marke wird in relevanten KI-Antworten zunehmend
                    berÃ¼cksichtigt.
                  </p>
                </div>
              </div>

              <div className="dashboard-stats">
                <div>
                  <span>TOP-5 APPEARANCE</span>
                  <strong>68%</strong>
                  <small className="positive">â†‘ 12%</small>
                </div>

                <div>
                  <span>SHARE OF VOICE</span>
                  <strong>34%</strong>
                  <small className="positive">â†‘ 8%</small>
                </div>

                <div>
                  <span>AI MENTIONS</span>
                  <strong>142</strong>
                  <small className="positive">â†‘ 21</small>
                </div>
              </div>

              <div className="platforms">
                <div className="platform-head">
                  <span>AI PLATFORMS</span>
                  <span>SICHTBARKEIT</span>
                </div>

                <Platform name="ChatGPT" value={84} />
                <Platform name="Google Gemini" value={71} />
                <Platform name="Perplexity" value={64} />
                <Platform name="Microsoft Copilot" value={58} />
              </div>
            </div>

            <div className="floating-card">
              <span className="floating-icon">â†—</span>

              <div>
                <small>SICHTBARKEIT</small>
                <strong>+18.4%</strong>
                <span>in den letzten 30 Tagen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="video-section">
        <div className="container">
          <div className="section-heading video-heading">
            <span className="section-kicker">
              VOIXERO CONVERT IN 30 SEKUNDEN
            </span>

            <h2>
              AI Visibility.
              <span> Einfach erklÃ¤rt.</span>
            </h2>

            <p>
              Sehen Sie, wie Voixero Convert Ihre Sichtbarkeit in der
              KI-Suche messbar macht und neue Optimierungspotenziale
              aufzeigt.
            </p>
          </div>

          <div className="video-shell">
            <div className="video-topbar">
              <div>
                <span className="video-live-dot" />
                VOIXERO CONVERT
              </div>

              <span>AI VISIBILITY</span>
            </div>

            <div className="video-frame">
              <video controls playsInline preload="metadata">
                <source
                  src="/voixero-tryconvert.mp4"
                  type="video/mp4"
                />
                Ihr Browser unterstÃ¼tzt die Videowiedergabe nicht.
              </video>
            </div>
          </div>

          <div className="video-cta">
            <span>
              Bereit, Ihre eigene AI Visibility zu messen?
            </span>

            <a href="#kontakt">
              Business Trial starten â†’
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="intro" id="features">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">AI VISIBILITY VERSTEHEN</span>

            <h2>
              Google war gestern nicht.
              <br />
              <span>Aber Suche ist heute mehr.</span>
            </h2>

            <p>
              Ihre Kunden fragen zunehmend KI-Systeme nach Produkten,
              Dienstleistern und Empfehlungen. Convert zeigt Ihnen, ob Ihr
              Unternehmen in diesen Antworten vorkommt â€“ und warum.
            </p>
          </div>

          <div className="feature-grid">
            <Feature
              number="01"
              title="Sichtbarkeit messen"
              text="Erkennen Sie auf einen Blick, wie hÃ¤ufig und wie prominent Ihre Marke in relevanten KI-Antworten erscheint."
            />

            <Feature
              number="02"
              title="Wettbewerber vergleichen"
              text="Sehen Sie, welche Unternehmen bei Ihren wichtigsten Themen vorne liegen und wie gross Ihr Abstand wirklich ist."
            />

            <Feature
              number="03"
              title="Potenziale erkennen"
              text="Convert identifiziert Themen, Prompts und Inhalte, bei denen Sie Ihre AI Visibility gezielt verbessern kÃ¶nnen."
            />

            <Feature
              number="04"
              title="Fortschritt verfolgen"
              text="Verfolgen Sie VerÃ¤nderungen kontinuierlich und erkennen Sie, welche Optimierungen tatsÃ¤chlich Wirkung zeigen."
            />
          </div>

          <div className="features-more">
            <a
              href="https://www.voixero.com/#/convert"
              className="convert-link"
            >
              Voixero Convert im Detail kennenlernen
              <span>â†’</span>
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process">
        <div className="container process-grid">
          <div className="process-copy">
            <span className="section-kicker">
              VON DATEN ZU SICHTBARKEIT
            </span>

            <h2>
              Nicht raten.
              <br />
              <span>Wissen, was KI sieht.</span>
            </h2>

            <p>
              Convert macht die bislang unsichtbare Welt der KI-Suche
              messbar. Sie erhalten nicht nur einen Score, sondern konkrete
              Ansatzpunkte fÃ¼r Ihre nÃ¤chsten Optimierungen.
            </p>
          </div>

          <div className="steps">
            <Step
              number="1"
              title="Unternehmen analysieren"
              text="Marke, Themen, Wettbewerber und relevante Suchintentionen werden erfasst."
            />

            <Step
              number="2"
              title="KI-Antworten beobachten"
              text="Relevante Prompts werden Ã¼ber fÃ¼hrende AI-Plattformen hinweg analysiert."
            />

            <Step
              number="3"
              title="Chancen identifizieren"
              text="Convert zeigt, wo Wettbewerber sichtbar sind und Ihre Marke noch Potenzial besitzt."
            />

            <Step
              number="4"
              title="Sichtbarkeit steigern"
              text="Sie erhalten konkrete Empfehlungen und kÃ¶nnen die Entwicklung fortlaufend messen."
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="trial">
        <div className="container pricing-container">
          <div className="pricing-copy">
            <span className="section-kicker">
              CONVERT BUSINESS TRIAL
            </span>

            <h2>
              3 Monate Convert Business.
              <span> Ohne automatische VerlÃ¤ngerung.</span>
            </h2>

            <p>
              Nutzen Sie Convert drei Monate im Business-Paket und finden Sie
              heraus, welches Potenzial AI Visibility fÃ¼r Ihr Unternehmen hat.
            </p>

            <div className="no-renew">
              <span>âœ“</span>

              <div>
                <strong>Keine automatische VerlÃ¤ngerung</strong>
                <p>
                  Nach drei Monaten endet der Trial automatisch. Sie
                  entscheiden selbst, ob Sie Convert anschliessend weiter
                  nutzen mÃ¶chten.
                </p>
              </div>
            </div>
          </div>

          <div className="price-card">
            <div className="price-card-top">
              <div>
                <span>VOIXERO CONVERT</span>
                <strong>BUSINESS</strong>
              </div>

              <span className="trial-pill">3 MONATE</span>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <div>
                  <strong>Convert Business Trial</strong>
                  <span>3 Monate</span>
                </div>
                <strong>CHF 349.â€“</strong>
              </div>

              <div className="price-row">
                <div>
                  <strong>Setup</strong>
                  <span>einmalig</span>
                </div>
                <strong>CHF 99.â€“</strong>
              </div>
            </div>

            <div className="price-total">
              <div>
                <span>TOTAL</span>
                <small>zzgl. MwSt.</small>
              </div>

              <div className="total-number">
                <span>CHF</span>
                <strong>448</strong>
                <span>.â€“</span>
              </div>
            </div>

            <div className="divider" />

            <ul className="check-list">
              <li>
                <span>âœ“</span>
                Global Visibility Score
              </li>
              <li>
                <span>âœ“</span>
                AI Visibility Monitoring
              </li>
              <li>
                <span>âœ“</span>
                Wettbewerbsanalyse
              </li>
              <li>
                <span>âœ“</span>
                Relevante Prompts &amp; Suchintentionen
              </li>
              <li>
                <span>âœ“</span>
                Optimierungsempfehlungen
              </li>
              <li>
                <span>âœ“</span>
                Entwicklung &amp; Fortschritt messen
              </li>
            </ul>

            <a
              href="#kontakt"
              className="button button-primary button-full"
            >
              Business Trial starten
              <span>â†’</span>
            </a>

            <small className="price-footer">
              CHF 448.â€“ zzgl. MwSt. Â· keine automatische VerlÃ¤ngerung
            </small>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="kontakt">
        <div className="container contact-grid">
          <div className="contact-copy">
            <span className="section-kicker">JETZT STARTEN</span>

            <h2>
              Starten Sie Ihren
              <span>Convert Business Trial.</span>
            </h2>

            <p>
              Senden Sie uns Ihre Unternehmensdaten. Wir bereiten Ihren
              Convert-Zugang vor und melden uns fÃ¼r die nÃ¤chsten Schritte
              bei Ihnen.
            </p>

            <div className="contact-offer">
              <div>
                <span>Convert Business Â· 3 Monate</span>
                <strong>CHF 349.â€“</strong>
              </div>

              <div>
                <span>Einmaliges Setup</span>
                <strong>CHF 99.â€“</strong>
              </div>

              <div className="contact-offer-total">
                <span>Total zzgl. MwSt.</span>
                <strong>CHF 448.â€“</strong>
              </div>
            </div>

            <div className="contact-security">
              <span>âœ“</span>
              Keine automatische VerlÃ¤ngerung
            </div>
          </div>

          <div className="form-card">
            <div className="form-header">
              <span>BUSINESS TRIAL</span>
              <h3>Ihre Unternehmensdaten</h3>
              <p>
                FÃ¼llen Sie das Formular aus und wir kÃ¼mmern uns um den Rest.
              </p>
            </div>

            {status.type === "success" ? (
              <div className="form-success" role="status">
                <div className="form-success-icon">âœ“</div>

                <h3>Vielen Dank fÃ¼r Ihre Anfrage!</h3>

                <p>{status.message}</p>

                <div className="form-success-summary">
                  <strong>Voixero Convert Business Trial</strong>
                  <span>
                    3 Monate Â· CHF 448.â€“ zzgl. MwSt. Â· keine automatische
                    VerlÃ¤ngerung
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website_check">
                    Dieses Feld nicht ausfÃ¼llen
                  </label>

                  <input
                    id="website_check"
                    name="website_check"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="firstname">Vorname *</label>

                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      placeholder="Vorname"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="lastname">Nachname *</label>

                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      placeholder="Nachname"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="company">Unternehmen *</label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Unternehmen"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    GeschÃ¤ftliche E-Mail *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@unternehmen.ch"
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="phone">Telefon</label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+41 ..."
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="website">
                      Website / Domain *
                    </label>

                    <input
                      id="website"
                      name="website"
                      type="text"
                      placeholder="www.unternehmen.ch"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message">
                    Nachricht / Bemerkungen
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Gibt es etwas, das wir vorab wissen sollten?"
                  />
                </div>

                <label className="privacy-check">
                  <input
                    type="checkbox"
                    name="privacy"
                    required
                  />

                  <span>
                    Ich habe die{" "}
                    <a
                      href="https://www.voixero.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DatenschutzerklÃ¤rung
                    </a>{" "}
                    gelesen und stimme der Verarbeitung meiner Angaben zur
                    Kontaktaufnahme zu.
                  </span>
                </label>

                {status.type === "error" && (
                  <div className="form-error" role="alert">
                    <strong>
                      Die Anfrage konnte nicht gesendet werden.
                    </strong>
                    <span>{status.message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="button button-primary button-full contact-submit"
                  disabled={isSending}
                >
                  {isSending
                    ? "Anfrage wird gesendet â€¦"
                    : "Business Trial fÃ¼r CHF 448.â€“ anfragen"}

                  {!isSending && <span>â†’</span>}
                </button>

                <div className="form-price-note">
                  Setup CHF 99.â€“ + Convert Business Trial CHF 349.â€“
                  <br />
                  Total CHF 448.â€“ zzgl. MwSt.
                </div>

                <div className="form-no-renew">
                  Keine automatische VerlÃ¤ngerung.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container faq-container">
          <div>
            <span className="section-kicker">FAQ</span>

            <h2>
              Noch Fragen?
              <span> Hier sind die wichtigsten Antworten.</span>
            </h2>
          </div>

          <div className="faq-list">
            <details>
              <summary>
                Was kostet der Convert Business Trial?
              </summary>

              <p>
                Der dreimonatige Convert Business Trial kostet CHF 349.â€“.
                Hinzu kommen einmalige Setup-Kosten von CHF 99.â€“. Der
                Gesamtpreis betrÃ¤gt somit CHF 448.â€“ zzgl. MwSt.
              </p>
            </details>

            <details>
              <summary>
                Was passiert nach den drei Monaten?
              </summary>

              <p>
                Der Trial endet automatisch. Es gibt keine automatische
                VerlÃ¤ngerung. Sie entscheiden selbst, ob Sie Convert
                anschliessend weiter nutzen mÃ¶chten.
              </p>
            </details>

            <details>
              <summary>
                Was ist in den Setup-Kosten enthalten?
              </summary>

              <p>
                Das Setup dient der Einrichtung Ihres Convert-Zugangs und der
                Vorbereitung Ihrer Unternehmensanalyse.
              </p>
            </details>

            <details>
              <summary>
                FÃ¼r welche Unternehmen eignet sich Convert?
              </summary>

              <p>
                Convert eignet sich fÃ¼r Unternehmen, die verstehen und
                verbessern mÃ¶chten, wie ihre Marke, Produkte und Leistungen
                in KI-gestÃ¼tzten Such- und Empfehlungssystemen wahrgenommen
                werden.
              </p>
            </details>

            <details>
              <summary>
                Welche KI-Plattformen werden berÃ¼cksichtigt?
              </summary>

              <p>
                Convert analysiert relevante Antworten fÃ¼hrender
                KI-Plattformen. Der konkrete Umfang kann je nach Analyse und
                Produktumfang variieren.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <span className="section-kicker">
            BEREIT FÃœR MEHR SICHTBARKEIT?
          </span>

          <h2>
            Finden Sie heraus,
            <br />
            <span>was KI Ã¼ber Ihr Unternehmen weiss.</span>
          </h2>

          <a href="#kontakt" className="button button-primary">
            Convert Business Trial starten
            <span>â†’</span>
          </a>

          <p>
            CHF 349.â€“ Trial + CHF 99.â€“ Setup Â· Total CHF 448.â€“ zzgl. MwSt.
            Â· keine automatische VerlÃ¤ngerung
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container footer-inner">
          <a
            href="https://www.voixero.com/"
            className="brand footer-brand"
            aria-label="Voixero"
          >
            <img
              src="/voixero-logo.png"
              alt="Voixero"
              className="voixero-logo footer-logo"
            />
          </a>

          <p>Â© 2026 Voixero AG. All rights reserved.</p>

          <div className="footer-links">
            <a href="https://www.voixero.com/#/convert">
              Voixero Convert
            </a>

            <a href="https://www.voixero.com/">
              Voixero
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Platform({
  name,
  value,
}: {
  name: string;
  value: number;
}) {
  return (
    <div className="platform-row">
      <span>{name}</span>

      <div className="platform-bar">
        <div style={{ width: `${value}%` }} />
      </div>

      <strong>{value}%</strong>
    </div>
  );
}

function Feature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="feature-card">
      <span className="feature-number">{number}</span>

      <div className="feature-icon">âœ¦</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </article>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="step">
      <div className="step-number">
        {number}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}