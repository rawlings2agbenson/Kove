import React, { useState, useEffect, useRef } from "react";
const BUSINESS = {
  name: "KOVE STUDIO",
  tagline: "Premium Streetwear. Lagos & Beyond.",
  logo: "KV",
  whatsapp: "2348100000000",
  ig: "@kovestudio",
  tiktok: "@kovestudio",
  announcement: "🔥 New Summer Drop live now — Free delivery on orders above ₦30,000",
};

const CATEGORIES = ["All", "Tops", "Bottoms", "Accessories", "Footwear"];

const PRODUCTS = [
  { id: 1, name: "Woven Cargo Overshirt", price: 42000, category: "Tops", status: "available", emoji: "🧥", description: "Heavy-duty woven cargo overshirt in sand olive. Drop-shoulder fit, utility pockets, button-down front. One size fits most.", colors: ["Sand Olive", "Jet Black"], sizes: ["S", "M", "L", "XL"] },
  { id: 2, name: "Baggy Tech Jogger", price: 28000, category: "Bottoms", status: "last few", emoji: "👖", description: "Ultra-wide tech fabric jogger with elastic waistband and reflective side tape. Premium matte finish.", colors: ["Ash Grey", "All Black"], sizes: ["S", "M", "L"] },
  { id: 3, name: "Structured Box Tee", price: 18500, category: "Tops", status: "available", emoji: "👕", description: "230gsm heavyweight cotton tee with dropped shoulders and boxy silhouette. Screen-printed KOVE graphic on back.", colors: ["White", "Black", "Bone"], sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 4, name: "Utility Bucket Hat", price: 12000, category: "Accessories", status: "sold out", emoji: "🪣", description: "6-panel woven bucket hat with embroidered logo patch. Water-resistant outer shell.", colors: ["Olive", "Cream"], sizes: ["One Size"] },
  { id: 5, name: "Crossbody Micro Bag", price: 22000, category: "Accessories", status: "available", emoji: "👜", description: "Compact crossbody bag in textured faux leather. Magnetic snap closure, interior slip pocket.", colors: ["Black", "Tan"], sizes: ["One Size"] },
  { id: 6, name: "Low-Top Canvas Sneaker", price: 35000, category: "Footwear", status: "last few", emoji: "👟", description: "Hand-crafted low-top canvas sneaker with rubber sole and woven KOVE tongue label.", colors: ["Cream/Gum", "Black/White"], sizes: ["39", "40", "41", "42", "43", "44"] },
  { id: 7, name: "Wide Leg Chino", price: 31000, category: "Bottoms", status: "available", emoji: "👔", description: "Ultra wide-leg chino cut from stretch cotton. Clean front pleat, tapered cuff, relaxed rise.", colors: ["Camel", "Charcoal"], sizes: ["S", "M", "L", "XL"] },
  { id: 8, name: "Layered Chain Necklace", price: 9500, category: "Accessories", status: "available", emoji: "📿", description: "Three-layer stainless steel chain necklace with matte finish. Lobster clasp, adjustable length.", colors: ["Silver", "Gold"], sizes: ["One Size"] },
];

const statusConfig = {
  available: { label: "Available", color: "#00e5a0", bg: "rgba(0,229,160,0.12)" },
  "last few": { label: "Last Few", color: "#ffb547", bg: "rgba(255,181,71,0.12)" },
  "sold out": { label: "Sold Out", color: "#ff5c5c", bg: "rgba(255,92,92,0.12)" },
};

function formatPrice(n) {
  return "₦" + n.toLocaleString("en-NG");
}

function buildWhatsAppMsg(product, color, size) {
  return encodeURIComponent(
    `Hi ${BUSINESS.name} 👋\n\nI'd like to order:\n\n*${product.name}*\nPrice: ${formatPrice(product.price)}\nColor: ${color}\nSize: ${size}\n\nPlease share your delivery details. Thank you!`
  );
}

function ProductModal({ product, onClose }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const isSoldOut = product.status === "sold out";
  const st = statusConfig[product.status];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${buildWhatsAppMsg(product, color, size)}`;

  const handleShare = () => {
    const text = `Check out ${product.name} — ${formatPrice(product.price)} on ${BUSINESS.name}'s store!`;
    if (navigator.share) {
      navigator.share({ title: product.name, text });
    } else {
      navigator.clipboard?.writeText(text + " " + window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        <div style={styles.modalEmoji}>{product.emoji}</div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ ...styles.statusTag, color: st.color, background: st.bg }}>{st.label}</span>
        </div>

        <h2 style={styles.modalName}>{product.name}</h2>
        <p style={styles.modalPrice}>{formatPrice(product.price)}</p>
        <p style={styles.modalDesc}>{product.description}</p>

        <div style={styles.optionGroup}>
          <p style={styles.optionLabel}>Colour</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {product.colors.map(c => (
              <button key={c} onClick={() => setColor(c)}
                style={{ ...styles.optionBtn, ...(color === c ? styles.optionBtnActive : {}) }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.optionGroup}>
          <p style={styles.optionLabel}>Size</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {product.sizes.map(s => (
              <button key={s} onClick={() => setSize(s)}
                style={{ ...styles.optionBtn, ...(size === s ? styles.optionBtnActive : {}) }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <a href={isSoldOut ? undefined : whatsappUrl} target="_blank" rel="noreferrer"
            style={{ ...styles.whatsappBtn, ...(isSoldOut ? styles.whatsappBtnDisabled : {}) }}
            onClick={isSoldOut ? e => e.preventDefault() : undefined}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {isSoldOut ? "Out of Stock" : "Order on WhatsApp"}
          </a>
          <button style={styles.shareBtn} onClick={handleShare}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const st = statusConfig[product.status];
  const isSoldOut = product.status === "sold out";
  return (
    <div style={{ ...styles.card, opacity: isSoldOut ? 0.65 : 1 }} onClick={() => !isSoldOut && onClick(product)}>
      <div style={styles.cardEmoji}>{product.emoji}</div>
      <div style={styles.cardBody}>
        <span style={{ ...styles.statusTag, color: st.color, background: st.bg, fontSize: 10 }}>{st.label}</span>
        <p style={styles.cardName}>{product.name}</p>
        <p style={styles.cardPrice}>{formatPrice(product.price)}</p>
      </div>
      {!isSoldOut && (
        <div style={styles.cardArrow}>→</div>
      )}
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const bannerRef = useRef(null);

  const filtered = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({ title: BUSINESS.name, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={styles.root}>
      {/* Ambient BG */}
      <div style={styles.ambientTop} />
      <div style={styles.ambientBottom} />

      {/* Announcement Banner */}
      {bannerVisible && (
        <div style={styles.banner} ref={bannerRef}>
          <span style={styles.bannerText}>{BUSINESS.announcement}</span>
          <button style={styles.bannerClose} onClick={() => setBannerVisible(false)}>✕</button>
        </div>
      )}

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoWrap}>
            <div style={styles.logo}>{BUSINESS.logo}</div>
          </div>
          <h1 style={styles.brandName}>{BUSINESS.name}</h1>
          <p style={styles.tagline}>{BUSINESS.tagline}</p>
          <div style={styles.socials}>
            <span style={styles.socialPill}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              {BUSINESS.ig}
            </span>
            <span style={styles.socialPill}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.85 1.56V6.79a4.84 4.84 0 0 1-1.08-.1z"/></svg>
              {BUSINESS.tiktok}
            </span>
          </div>
          <button style={styles.shareProfileBtn} onClick={handleShareProfile}>
            {copied ? "✓ Copied!" : "Share Store"}
          </button>
        </div>

        {/* Category Tabs */}
        <div style={styles.tabs}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ ...styles.tab, ...(activeCategory === cat ? styles.tabActive : {}) }}>
              {cat}
              {cat !== "All" && (
                <span style={styles.tabCount}>
                  {PRODUCTS.filter(p => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div style={styles.statsBar}>
          <span style={styles.statItem}>
            <span style={{ color: "#00e5a0" }}>●</span> {PRODUCTS.filter(p => p.status === "available").length} Available
          </span>
          <span style={styles.statItem}>
            <span style={{ color: "#ffb547" }}>●</span> {PRODUCTS.filter(p => p.status === "last few").length} Last Few
          </span>
          <span style={styles.statItem}>
            <span style={{ color: "#ff5c5c" }}>●</span> {PRODUCTS.filter(p => p.status === "sold out").length} Sold Out
          </span>
        </div>

        {/* Product Grid */}
        <div style={styles.grid}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>Powered by <strong style={{ color: "#00e5a0" }}>Droplink</strong></p>
          <p style={{ fontSize: 11, color: "#555", marginTop: 4 }}>© 2026 {BUSINESS.name}</p>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#f0f0f0",
    fontFamily: "'Syne', 'Outfit', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  ambientTop: {
    position: "fixed", top: -100, left: "50%", transform: "translateX(-50%)",
    width: 600, height: 300,
    background: "radial-gradient(ellipse, rgba(0,229,160,0.07) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  ambientBottom: {
    position: "fixed", bottom: -100, right: -100,
    width: 400, height: 400,
    background: "radial-gradient(ellipse, rgba(255,181,71,0.05) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  banner: {
    background: "linear-gradient(90deg, #00e5a0, #00b37a)",
    color: "#000",
    padding: "10px 40px 10px 16px",
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", zIndex: 10,
  },
  bannerText: {
    fontSize: 12, fontWeight: 700, letterSpacing: 0.3, textAlign: "center",
  },
  bannerClose: {
    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", fontSize: 14,
    color: "#000", fontWeight: 700, padding: 4,
  },
  container: {
    maxWidth: 480, margin: "0 auto", padding: "0 16px 40px", position: "relative", zIndex: 1,
  },
  header: {
    textAlign: "center", padding: "32px 0 16px",
  },
  logoWrap: {
    display: "flex", justifyContent: "center", marginBottom: 12,
  },
  logo: {
    width: 64, height: 64, borderRadius: 20,
    background: "linear-gradient(135deg, #00e5a0, #00b37a)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, fontWeight: 900, color: "#000", letterSpacing: 1,
    boxShadow: "0 0 30px rgba(0,229,160,0.3)",
  },
  brandName: {
    fontSize: 28, fontWeight: 900, letterSpacing: 3, margin: "0 0 6px",
    textTransform: "uppercase",
  },
  tagline: {
    fontSize: 13, color: "#888", margin: "0 0 14px", letterSpacing: 0.5,
  },
  socials: {
    display: "flex", gap: 8, justifyContent: "center", marginBottom: 14,
  },
  socialPill: {
    display: "flex", alignItems: "center", gap: 5,
    background: "#1a1a1a", border: "1px solid #252525",
    borderRadius: 20, padding: "5px 10px",
    fontSize: 11, color: "#aaa",
  },
  shareProfileBtn: {
    background: "transparent", border: "1px solid #2a2a2a",
    color: "#aaa", borderRadius: 20,
    padding: "7px 20px", fontSize: 12, cursor: "pointer",
    letterSpacing: 0.5, fontFamily: "inherit",
    transition: "all 0.2s",
  },
  tabs: {
    display: "flex", gap: 8, overflowX: "auto", padding: "8px 0 16px",
    scrollbarWidth: "none",
  },
  tab: {
    background: "#141414", border: "1px solid #222",
    color: "#666", borderRadius: 20, padding: "8px 16px",
    fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
    fontFamily: "inherit", fontWeight: 600, letterSpacing: 0.5,
    display: "flex", alignItems: "center", gap: 5,
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#00e5a0", border: "1px solid #00e5a0",
    color: "#000",
  },
  tabCount: {
    background: "rgba(255,255,255,0.15)",
    borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700,
  },
  statsBar: {
    display: "flex", gap: 16, marginBottom: 20,
    padding: "10px 14px",
    background: "#111", borderRadius: 12,
    border: "1px solid #1c1c1c",
  },
  statItem: {
    fontSize: 11, color: "#777", display: "flex", alignItems: "center", gap: 5,
  },
  grid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  card: {
    background: "#111", border: "1px solid #1e1e1e",
    borderRadius: 16, overflow: "hidden", cursor: "pointer",
    transition: "transform 0.2s, border-color 0.2s",
    position: "relative",
    ":hover": { borderColor: "#00e5a0" },
  },
  cardEmoji: {
    fontSize: 48, textAlign: "center", padding: "24px 0 12px",
    background: "#161616",
    display: "block",
  },
  cardBody: {
    padding: "10px 12px 14px",
  },
  statusTag: {
    fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
    borderRadius: 6, padding: "2px 7px",
    textTransform: "uppercase", display: "inline-block", marginBottom: 6,
  },
  cardName: {
    fontSize: 13, fontWeight: 700, margin: "0 0 4px",
    lineHeight: 1.3, color: "#eee",
  },
  cardPrice: {
    fontSize: 14, fontWeight: 800, color: "#00e5a0", margin: 0,
  },
  cardArrow: {
    position: "absolute", bottom: 12, right: 12,
    fontSize: 14, color: "#333",
  },
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(8px)",
    zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center",
    padding: "0",
  },
  modal: {
    background: "#111", borderRadius: "24px 24px 0 0",
    border: "1px solid #222", borderBottom: "none",
    padding: "28px 20px 40px",
    width: "100%", maxWidth: 480,
    maxHeight: "90vh", overflowY: "auto",
    position: "relative",
  },
  closeBtn: {
    position: "absolute", top: 16, right: 16,
    background: "#1e1e1e", border: "none", borderRadius: "50%",
    width: 32, height: 32, cursor: "pointer", color: "#fff",
    fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "inherit",
  },
  modalEmoji: {
    fontSize: 64, textAlign: "center", marginBottom: 16,
  },
  modalName: {
    fontSize: 22, fontWeight: 900, margin: "6px 0 4px", letterSpacing: 0.5,
  },
  modalPrice: {
    fontSize: 24, fontWeight: 800, color: "#00e5a0", margin: "0 0 12px",
  },
  modalDesc: {
    fontSize: 13, color: "#888", lineHeight: 1.7, margin: "0 0 20px",
  },
  optionGroup: {
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 11, color: "#555", fontWeight: 700, letterSpacing: 1,
    textTransform: "uppercase", margin: "0 0 8px",
  },
  optionBtn: {
    background: "#1a1a1a", border: "1px solid #2a2a2a",
    color: "#888", borderRadius: 8, padding: "6px 14px",
    fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
    transition: "all 0.15s",
  },
  optionBtnActive: {
    background: "#00e5a0", border: "1px solid #00e5a0", color: "#000",
  },
  whatsappBtn: {
    flex: 1, background: "#25d366",
    border: "none", borderRadius: 12,
    color: "#000", fontWeight: 800, fontSize: 14,
    padding: "14px 16px", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "inherit", textDecoration: "none",
    letterSpacing: 0.3,
  },
  whatsappBtnDisabled: {
    background: "#222", color: "#555", cursor: "not-allowed",
  },
  shareBtn: {
    background: "#1a1a1a", border: "1px solid #2a2a2a",
    borderRadius: 12, padding: "14px 16px",
    cursor: "pointer", color: "#aaa",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  footer: {
    textAlign: "center", marginTop: 40, paddingTop: 20,
    borderTop: "1px solid #1a1a1a",
  },
  footerText: {
    fontSize: 12, color: "#444",
  },
