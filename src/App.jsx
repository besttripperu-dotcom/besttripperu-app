import { useMemo, useState } from "react";
import {
  MapPin,
  Users,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  Clock3,
  Star,
  Phone,
  CheckCircle2,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

export default function App() {
  const whatsappNumber = "51960524474";

  const [name, setName] = useState("");
  const [pickup, setPickup] = useState("Aeropuerto de Tarapoto");
  const [destination, setDestination] = useState("Laguna Azul");
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");
  const [service, setService] = useState("express");

  const services = {
    economico: { name: "Tour Económico", price: 80, eta: "15 min" },
    express: { name: "Tour Express", price: 120, eta: "8 min" },
    premium: { name: "Tour Premium", price: 180, eta: "5 min" },
  };

  const selected = services[service];

  const total = useMemo(
    () => selected.price + Math.max(0, people - 1) * 18,
    [selected.price, people]
  );

  const isValid =
    name.trim() && pickup.trim() && destination.trim() && date.trim();

  const message = encodeURIComponent(
    `Hola Best Trip Perú 👋\n\n` +
      `Quiero reservar un tour:\n` +
      `Nombre: ${name}\n` +
      `Recojo: ${pickup}\n` +
      `Destino: ${destination}\n` +
      `Personas: ${people}\n` +
      `Servicio: ${selected.name}\n` +
      `Fecha: ${date}\n` +
      `Total estimado: S/ ${total}`
  );

  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleClick = (e) => {
    if (!isValid) {
      e.preventDefault();
      alert("Completa nombre, recojo, destino y fecha.");
    }
  };

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />

        <div style={styles.logoWrap}>
          <img
            src="/logo-besttrip.png"
            alt="Best Trip Perú"
            style={styles.logo}
          />
        </div>

        <h1 style={styles.title}>Reserva tu experiencia en Tarapoto</h1>
        <p style={styles.subtitle}>
          Atención inmediata, proceso simple y confirmación rápida por WhatsApp.
        </p>

        <div style={styles.topBadges}>
          <div style={styles.topBadge}>
            <BadgeCheck size={14} />
            Empresa formal
          </div>
          <div style={styles.topBadge}>
            <Sparkles size={14} />
            Atención inmediata
          </div>
        </div>
      </section>

      <section style={styles.offerBanner}>
        <div style={styles.offerSmall}>PROMOCIÓN ACTIVA</div>
        <div style={styles.offerBig}>RESERVA CON S/50</div>
        <div style={styles.offerText}>Separa hoy mismo tu experiencia</div>
      </section>

      <section style={styles.card}>
        <div style={styles.sectionHeader}>
          <div>
            <div style={styles.kicker}>Solicitud rápida</div>
            <h2 style={styles.sectionTitle}>Completa tu reserva</h2>
          </div>
          <div style={styles.status}>Disponible</div>
        </div>

        <label style={styles.label}>Nombre del cliente</label>
        <input
          placeholder="Escribe tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Punto de recojo</label>
        <div style={styles.rowBox}>
          <MapPin size={18} color="#018348" />
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            style={styles.inputInline}
          />
        </div>

        <label style={styles.label}>Destino</label>
        <div style={styles.rowBox}>
          <MapPin size={18} color="#018348" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={styles.inputInline}
          />
        </div>

        <div style={styles.twoCols}>
          <div>
            <label style={styles.label}>Pasajeros</label>
            <div style={styles.rowBoxBetween}>
              <div style={styles.rowMini}>
                <Users size={18} color="#018348" />
                <span>{people} personas</span>
              </div>
              <div style={styles.counterWrap}>
                <button
                  onClick={() => setPeople((v) => Math.max(1, v - 1))}
                  style={styles.counterBtn}
                >
                  -
                </button>
                <button
                  onClick={() => setPeople((v) => Math.min(12, v + 1))}
                  style={styles.counterBtn}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <label style={styles.label}>Fecha</label>
            <div style={styles.rowBox}>
              <CalendarDays size={18} color="#018348" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.inputInline}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={styles.label}>Tipo de servicio</div>

          {Object.entries(services).map(([key, item]) => {
            const active = service === key;
            return (
              <button
                key={key}
                onClick={() => setService(key)}
                style={{
                  ...styles.serviceCard,
                  ...(active ? styles.serviceCardActive : {}),
                }}
              >
                <div>
                  <div style={{ fontWeight: 800 }}>{item.name}</div>
                  <div style={{ fontSize: 13, opacity: active ? 0.9 : 0.65 }}>
                    Servicio seguro y organizado
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 900 }}>S/ {item.price}</div>
                  <div style={styles.rowEta}>
                    <Clock3 size={13} />
                    {item.eta}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.summary}>
        <div style={styles.summaryTop}>
          <div>
            <div style={styles.summaryLabel}>Resumen de reserva</div>
            <div style={styles.summaryName}>{selected.name}</div>
          </div>
          <div style={styles.rating}>
            <Star size={14} fill="currentColor" />
            4.9
          </div>
        </div>

        <div style={styles.summaryRoute}>
          <div style={styles.summarySmall}>Ruta</div>
          <div style={styles.summaryMain}>{pickup}</div>
          <div style={styles.summaryDest}>→ {destination}</div>
        </div>

        <div style={styles.twoCols}>
          <div style={styles.summaryMini}>
            <div style={styles.summarySmall}>Tiempo</div>
            <div style={styles.summaryMiniValue}>{selected.eta}</div>
          </div>
          <div style={styles.summaryMini}>
            <div style={styles.summarySmall}>Pasajeros</div>
            <div style={styles.summaryMiniValue}>{people}</div>
          </div>
        </div>

        <div style={styles.totalBox}>
          <div style={styles.summarySmallWhite}>Total estimado</div>
          <div style={styles.totalValue}>S/ {total}</div>
          <div style={styles.reserveText}>Separa hoy desde S/50 por persona</div>
        </div>

        <a
          href={url}
          onClick={handleClick}
          target="_blank"
          rel="noreferrer"
          style={styles.primaryButton}
        >
          <MessageCircle size={18} />
          Confirmar por WhatsApp
        </a>

        <a
          href={url}
          onClick={handleClick}
          target="_blank"
          rel="noreferrer"
          style={styles.secondaryButton}
        >
          <Phone size={18} />
          Contactar asesor
        </a>
      </section>

      <section style={styles.card}>
        <div style={styles.kicker}>Tours más buscados</div>
        <h2 style={styles.sectionTitle}>Elige tu destino</h2>

        <div style={styles.destinations}>
          {[
            ["Laguna Azul", "Desde S/ 80"],
            ["Lamas Nativo", "Desde S/ 35"],
            ["Ahuashiyacu", "Desde S/ 35"],
            ["Alto Mayo", "Desde S/ 99"],
          ].map(([place, price]) => (
            <button
              key={place}
              onClick={() => setDestination(place)}
              style={styles.destinationBtn}
            >
              <div>
                <div style={{ fontWeight: 800 }}>{place}</div>
                <div style={{ color: "#018348", fontSize: 13, marginTop: 4 }}>
                  {price}
                </div>
              </div>
              <span style={styles.selectText}>Elegir</span>
            </button>
          ))}
        </div>
      </section>

      <section style={styles.card}>
        <div style={styles.kicker}>Confianza</div>
        <h2 style={styles.sectionTitle}>¿Por qué reservar con nosotros?</h2>

        <div style={styles.benefits}>
          {[
            ["Empresa formal", BadgeCheck],
            ["Reserva segura", ShieldCheck],
            ["Atención inmediata", Phone],
            ["Confirmación rápida", CheckCircle2],
          ].map(([text, Icon]) => (
            <div key={text} style={styles.benefitItem}>
              <Icon size={18} color="#018348" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.card}>
        <div style={styles.kicker}>Opiniones</div>
        <h2 style={styles.sectionTitle}>Lo que dicen nuestros pasajeros</h2>

        <div style={styles.testimonials}>
          {[
            "Muy buena atención desde el primer mensaje.",
            "Todo fue rápido, claro y seguro.",
            "Nos ayudaron a reservar sin complicaciones.",
          ].map((text, i) => (
            <div key={i} style={styles.testimonialBox}>
              <div style={styles.stars}>★★★★★</div>
              <div style={styles.testimonialText}>{text}</div>
            </div>
          ))}
        </div>
      </section>

      <a href={url} target="_blank" rel="noreferrer" style={styles.floatingWhatsApp}>
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #eef2f6 0%, #f8fafc 100%)",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
    position: "relative",
  },
  hero: {
    background: "linear-gradient(135deg, #018348 0%, #0a9b57 100%)",
    color: "white",
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
    boxShadow: "0 12px 24px rgba(1,131,72,.20)",
    position: "relative",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,.16), transparent 35%)",
    pointerEvents: "none",
  },
  logoWrap: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    marginBottom: 14,
  },
  logo: {
    width: 190,
    maxWidth: "100%",
    height: "auto",
    display: "block",
  },
  brand: {
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    opacity: 0.85,
    fontWeight: 700,
  },
  title: {
    fontSize: 30,
    lineHeight: 1.05,
    margin: "6px 0 8px",
    fontWeight: 900,
    position: "relative",
    textAlign: "center",
  },
  subtitle: {
    margin: 0,
    opacity: 0.92,
    lineHeight: 1.5,
    fontSize: 14,
    position: "relative",
    textAlign: "center",
  },
  topBadges: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 14,
    position: "relative",
    justifyContent: "center",
  },
  topBadge: {
    background: "rgba(255,255,255,.15)",
    border: "1px solid rgba(255,255,255,.2)",
    padding: "8px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  offerBanner: {
    background: "#03111f",
    color: "white",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    textAlign: "center",
    boxShadow: "0 10px 22px rgba(2,6,23,.20)",
  },
  offerSmall: {
    color: "#e3ff00",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: 800,
  },
  offerBig: {
    fontSize: 32,
    fontWeight: 900,
    marginTop: 6,
  },
  offerText: {
    marginTop: 6,
    fontSize: 14,
    color: "rgba(255,255,255,.85)",
  },
  card: {
    background: "white",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 8px 22px rgba(15,23,42,.06)",
    border: "1px solid #e2e8f0",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  kicker: {
    color: "#018348",
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  sectionTitle: {
    margin: "6px 0 0",
    fontSize: 26,
    lineHeight: 1.1,
    fontWeight: 900,
  },
  status: {
    background: "#e8f6ee",
    color: "#018348",
    fontSize: 12,
    fontWeight: 800,
    padding: "8px 10px",
    borderRadius: 999,
    whiteSpace: "nowrap",
  },
  label: {
    display: "block",
    fontSize: 13,
    color: "#64748b",
    fontWeight: 700,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    outline: "none",
    fontSize: 15,
  },
  inputInline: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: 14,
  },
  rowBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    borderRadius: 14,
    padding: "14px 14px",
  },
  rowBoxBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    borderRadius: 14,
    padding: "14px 14px",
  },
  rowMini: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
  },
  twoCols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 12,
  },
  counterWrap: {
    display: "flex",
    gap: 6,
  },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 999,
    border: "1px solid #cbd5e1",
    background: "white",
    fontWeight: 900,
    cursor: "pointer",
  },
  serviceCard: {
    width: "100%",
    marginTop: 10,
    borderRadius: 18,
    border: "1px solid #dbe3ec",
    background: "#fff",
    padding: "14px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    textAlign: "left",
  },
  serviceCardActive: {
    background: "#018348",
    color: "white",
    border: "2px solid #018348",
    boxShadow: "0 10px 20px rgba(1,131,72,.18)",
  },
  rowEta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  summary: {
    background: "#03111f",
    color: "white",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 14px 26px rgba(2,6,23,.25)",
  },
  summaryTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,.65)",
  },
  summaryName: {
    fontSize: 26,
    fontWeight: 900,
    marginTop: 6,
  },
  rating: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,.1)",
    fontWeight: 800,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  summaryRoute: {
    background: "rgba(255,255,255,.06)",
    padding: 14,
    borderRadius: 16,
    marginTop: 16,
  },
  summarySmall: {
    fontSize: 12,
    color: "rgba(255,255,255,.65)",
  },
  summaryMain: {
    fontWeight: 800,
    marginTop: 5,
  },
  summaryDest: {
    color: "#e3ff00",
    marginTop: 6,
    fontWeight: 700,
  },
  summaryMini: {
    background: "rgba(255,255,255,.06)",
    padding: 14,
    borderRadius: 16,
  },
  summaryMiniValue: {
    fontWeight: 800,
    marginTop: 5,
  },
  totalBox: {
    background: "#018348",
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
  },
  summarySmallWhite: {
    fontSize: 13,
    opacity: 0.85,
  },
  totalValue: {
    fontSize: 38,
    fontWeight: 900,
    marginTop: 6,
  },
  reserveText: {
    marginTop: 4,
    opacity: 0.9,
    fontSize: 13,
  },
  primaryButton: {
    marginTop: 14,
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "#e3ff00",
    color: "#018348",
    padding: "15px 16px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 900,
    fontSize: 16,
    boxSizing: "border-box",
  },
  secondaryButton: {
    marginTop: 10,
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "1px solid rgba(255,255,255,.14)",
    color: "white",
    padding: "15px 16px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 800,
    fontSize: 15,
    boxSizing: "border-box",
  },
  destinations: {
    display: "grid",
    gap: 10,
    marginTop: 14,
  },
  destinationBtn: {
    width: "100%",
    background: "#f8fafc",
    border: "1px solid #dbe3ec",
    borderRadius: 16,
    padding: "14px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    cursor: "pointer",
  },
  selectText: {
    color: "#018348",
    fontWeight: 800,
    fontSize: 13,
  },
  benefits: {
    display: "grid",
    gap: 10,
    marginTop: 14,
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "14px 14px",
    borderRadius: 16,
    fontWeight: 700,
  },
  testimonials: {
    display: "grid",
    gap: 10,
    marginTop: 14,
  },
  testimonialBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
  },
  stars: {
    color: "#018348",
    fontWeight: 900,
    letterSpacing: 2,
    marginBottom: 8,
  },
  testimonialText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 1.5,
  },
  floatingWhatsApp: {
    position: "fixed",
    right: 18,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#018348",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 14px 24px rgba(1,131,72,.28)",
    textDecoration: "none",
    zIndex: 999,
  },
};