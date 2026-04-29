import React, { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   BUSINESS CONFIG
───────────────────────────────────────────── */
const BUSINESS = {
  name: "KOVE STUDIO",
  tagline: "Premium Streetwear. Lagos & Beyond.",
  logo: "KV",
  whatsapp: "2349072739071", 
  ig: "@kovestudio",
  tiktok: "@kovestudio",
  announcement: "🔥 New Summer Drop live now — Free delivery on orders above ₦30,000",
};

const CATEGORIES = ["All", "Tops", "Bottoms", "Accessories", "Footwear"];

const PRODUCTS = [
  {
    id: 1,
    name: "Woven Cargo Overshirt",
    price: 42000,
    category: "Tops",
    status: "available",
    emoji: "🧥",
    description: "Heavy-duty woven cargo overshirt in sand olive. Drop-shoulder fit, utility pockets, button-down front. One size fits most.",
    colors: ["Sand Olive", "Jet Black"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Baggy Tech Jogger",
    price: 28000,
    category: "Bottoms",
    status: "last few",
    emoji: "👖",
    description: "Ultra-wide tech fabric jogger with elastic waistband and reflective side tape. Premium matte finish.",
    colors: ["Ash Grey", "All Black"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    name: "Structured Box Tee",
    price: 18500,
    category: "Tops",
    status: "available",
    emoji: "👕",
    description: "230gsm heavyweight cotton tee with dropped shoulders and boxy silhouette. Screen-printed KOVE graphic on back.",
    colors: ["White", "Black", "Bone"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 4,
    name: "Utility Bucket Hat",
    price: 12000,
    category: "Accessories",
    status: "sold out",
    emoji: "🪣",
    description: "6-panel woven bucket hat with embroidered logo patch. Water-resistant outer shell.",
    colors: ["Olive", "Cream"],
    sizes: ["One Size"],
  },
  {
    id: 5,
    name: "Crossbody Micro Bag",
    price: 22000,
    category: "Accessories",
    status: "available",
    emoji: "👜",
    description: "Compact crossbody bag in textured faux leather. Magnetic snap closure, interior slip pocket.",
    colors: ["Black", "Tan"],
    sizes: ["One Size"],
  },
  {
    id: 6,
    name: "Low-Top Canvas Sneaker",
    price: 35000,
    category: "Footwear",
    status: "last few",
    emoji: "👟",
    description: "Hand-crafted low-top canvas sneaker with rubber sole and woven KOVE tongue label.",
    colors: ["Cream/Gum", "Black/White"],
    sizes: ["39", "40", "41", "42", "43", "44"],
  },
  {
    id: 7,
    name: "Wide Leg Chino",
    price: 31000,
    category: "Bottoms",
    status: "available",
    emoji: "👔",
    description: "Ultra wide-leg chino cut from stretch cotton. Clean front pleat, tapered cuff, relaxed rise.",
    colors: ["Camel", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Layered Chain Necklace",
    price: 9500,
    category: "Accessories",
    status: "available",
    emoji: "📿",
    description: "Three-layer stainless steel chain necklace with matte finish. Lobster clasp, adjustable length.",
    colors: ["Silver", "Gold"],
    sizes: ["One Size"],
  },
];

const STATUS = {
  available: { label: "Available", color: "#00e5a0", bg: "rgba(0,229,160,0.12)" },
  "last few": { label: "Last Few", color: "#ffb547", bg: "rgba(255,181,71,0.12)" },
  "sold out": { label: "Sold Out", color: "#ff5c5c", bg: "rgba(255,92,92,0.12)" },
};

function formatPrice(n) {
  return "\u20a6" + n.toLocaleString("en-NG");
}

function buildWhatsAppMsg(product, color, size) {
  const msg = "Hi " + BUSINESS.name + " 👋\n\nI'd like to order:\n\n*" + product.name + "*\nPrice: " + formatPrice(product.price) + "\nColour: " + color + "\nSize: " + size + "\n\nPlease share delivery details. Thank you!";
  return encodeURIComponent(msg);
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function ProductModal({ product, onClose }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const isSoldOut = product.status === "sold out";
  const st = STATUS[product.status];
  const whatsappUrl = "https://wa.me/" + BUSINESS.whatsapp + "?text=" + buildWhatsAppMsg(product, color, size);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleShare = () => {
    const text = "Check out " + product.name + " — " + formatPrice(product.price) + " at " + BUSINESS.name + "!";
    if (navigator.share) {
      navigator.share({ title: product.name, text: text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text + " " + window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <button style={s.closeBtn} onClick={onClose}>✕</button>
        <div style={s.modalEmoji}>{product.emoji}</div>
        <span style={{ fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "2px 7px", textTransform: "uppercase", marginBottom: 8, display: "inline-block", color: st.color, background: st.bg }}>
          {st.label}
        </span>
        <h2 style={s.modalName}>{product.name}</h2>
        <p style={s.modalPrice}>{formatPrice(product.price)}</p>
        <p style={s.modalDesc}>{product.description}</p>

        <div style={s.optionGroup}>
          <p style={s.optionLabel}>Colour</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {product.colors.map((c) => (
              <button key={c} onClick={() => setColor(c)} style={color === c ? { ...s.optionBtn, ...s.optionBtnActive } : s.optionBtn}>{c}</button>
            ))}
          </div>
        </div>

        <div style={s.optionGroup}>
          <p style={s.optionLabel}>Size</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {product.sizes.map((sz) => (
              <button key={sz} onClick={() => setSize(sz)} style={size === sz ? { ...s.optionBtn, ...s.optionBtnActive } : s.optionBtn}>{sz}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          {isSoldOut ? (
            <div style={{ ...s.whatsappBtn, ...s.whatsappBtnDisabled, flex: 1 }}>Out of Stock</div>
          ) : (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" style={{ ...s.whatsappBtn, flex: 1, textDecoration: "none" }}>Order on WhatsApp</a>
          )}
          <button style={s.shareBtn} onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);
  const st = STATUS[product.status];
  const isSoldOut = product.status === "sold out";

  return (
    <div
      style={{ ...s.card, opacity: isSoldOut ? 0.55 : 1, cursor: isSoldOut ? "default" : "pointer", borderColor: hovered && !isSoldOut ? "#00e5a0" : "#1e1e1e" }}
      onClick={() => !isSoldOut && onClick(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.cardEmoji}>{product.emoji}</div>
      <div style={s.cardBody}>
        <span style={{ fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "2px 7px", textTransform: "uppercase", marginBottom: 6, display: "inline-block", color: st.color, background: st.bg }}>
          {st.label}
        </span>
        <p style={s.cardName}>{product.name}</p>
        <p style={s.cardPrice}>{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bannerVisible, setBannerVisible] = useState(true);

  const filtered = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div style={s.root}>
      {bannerVisible && (
        <div style={s.banner}>
          <span style={s.bannerText}>{BUSINESS.announcement}</span>
          <button style={s.bannerClose} onClick={() => setBannerVisible(false)}>✕</button>
        </div>
      )}

      <div style={s.container}>
        <div style={s.header}>
          <div style={s.logoWrap}><div style={s.logo}>{BUSINESS.logo}</div></div>
          <h1 style={s.brandName}>{BUSINESS.name}</h1>
          <p style={s.tagline}>{BUSINESS.tagline}</p>
        </div>

        <div style={s.tabsWrapper}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={activeCategory === cat ? { ...s.tab, ...s.tabActive } : s.tab}>{cat}</button>
          ))}
        </div>

        <div style={s.grid}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />
          ))}
        </div>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */

const s = {
  root: { minHeight: "100vh", background: "#0a0a0a", color: "#f0f0f0", fontFamily: "sans-serif", overflowX: "hidden" },
  banner: { background: "#00e5a0", color: "#000", padding: "10px", display: "flex", position: "relative", zIndex: 10 },
  bannerText: { fontSize: 12, fontWeight: 700, textAlign: "center", width: "100%" },
  bannerClose: { position: "absolute", right: 10, background: "none", border: "none", cursor: "pointer" },
  container: { maxWidth: 480, margin: "0 auto", padding: "16px" },
  header: { textAlign: "center", padding: "20px 0" },
  logoWrap: { display: "flex", justifyContent: "center", marginBottom: 10 },
  logo: { width: 60, height: 60, borderRadius: 15, background: "#00e5a0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#000" },
  brandName: { fontSize: 24, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase" },
  tagline: { fontSize: 13, color: "#777" },
  tabsWrapper: { display: "flex", gap: 8, overflowX: "auto", padding: "16px 0" },
  tab: { background: "#161616", border: "1px solid #242424", borderRadius: 10, padding: "8px 16px", color: "#777", cursor: "pointer" },
  tabActive: { borderColor: "#00e5a0", color: "#00e5a0" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  card: { background: "#121212", border: "1px solid #1e1e1e", borderRadius: 15, padding: 12, textAlign: "center" },
  cardEmoji: { fontSize: 40, marginBottom: 10 },
  cardName: { fontSize: 14, fontWeight: 700, margin: "0 0 4px" },
  cardPrice: { fontSize: 13, color: "#00e5a0" },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.9)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: "#161616", width: "100%", maxWidth: 400, borderRadius: 20, padding: 25, position: "relative", border: "1px solid #242424" },
  closeBtn: { position: "absolute", top: 15, right: 15, background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" },
  modalEmoji: { fontSize: 60, textAlign: "center" },
  modalName: { fontSize: 22, fontWeight: 800 },
  modalPrice: { fontSize: 18, color: "#00e5a0", fontWeight: 700 },
  modalDesc: { fontSize: 14, color: "#888", margin: "15px 0" },
  optionGroup: { marginBottom: 15 },
  optionLabel: { fontSize: 11, color: "#555", textTransform: "uppercase" },
  optionBtn: { background: "#0a0a0a", border: "1px solid #242424", color: "#eee", padding: "5px 10px", borderRadius: 5, marginRight: 5, cursor: "pointer" },
  optionBtnActive: { borderColor: "#00e5a0", color: "#00e5a0" },
  whatsappBtn: { background: "#00e5a0", color: "#000", padding: "12px", borderRadius: 10, fontWeight: 800, textAlign: "center" },
  whatsappBtnDisabled: { background: "#333", color: "#555" },
  shareBtn: { background: "#161616", border: "1px solid #242424", color: "#888", padding: "12px", borderRadius: 10, cursor: "pointer" }
};
