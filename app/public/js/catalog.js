/* MOOL — catalogue (data, no DOM)
   Split from the original single-file index.html. Load order: catalog -> cart -> ui -> main. */

/* ---------- catalogue (embedded fallback; refreshed from /api/products) ---------- */
let PRODUCTS = [
  { id:"tonic", hero:true, tag:"Hero · Daily scalp reset", name:"Rosemary Scalp Tonic",
    fn:"Leave-in · every night",
    claim:"A lightweight leave-in that refreshes the scalp and supports stronger, fuller-looking roots — without the weight of an oil.",
    active:"Rosemary", size:"100 mL", price:799 },
  { id:"bhringraj", tag:"Co-anchor · Pre-wash strength", name:"Bhringraj Root Strength Oil",
    fn:"Pre-wash · 2–3× a week",
    claim:"A concentrated pre-wash oil that conditions dry roots and lengths and helps reduce the feel of breakage.",
    active:"Bhringraj", size:"100 mL", price:499 },
  { id:"neeli", tag:"Weekly intensive", name:"Neelibhringadi Intensive Oil",
    fn:"Deep-condition · 1–2× a week",
    claim:"A richer weekly oil for hair that feels dry, rough or overworked — for softness, shine and stronger-looking lengths.",
    active:"Neeli + Bhringraj", size:"100 mL", price:599 },
  { id:"shampoo", tag:"Clarifying cleanse", name:"Rosemary Strength Shampoo",
    fn:"Cleanse · as needed",
    claim:"A gentle cleanser that clears scalp buildup and leaves hair fresh — not stripped. Pairs with the tonic and oils.",
    active:"Rosemary", size:"200 mL", price:499 }
];
let BUNDLES = {
  duo:    { id:"duo",    name:"Root Reset Duo",          size:"2-piece set", price:999 },
  ritual: { id:"ritual", name:"Complete Root Ritual",    size:"4-piece · refill", price:1299 }
};
let CATALOG = {};
function rebuildCatalog(){
  CATALOG = {};
  PRODUCTS.forEach(p=>CATALOG[p.id]=p);
  Object.values(BUNDLES).forEach(b=>CATALOG[b.id]=b);
}
rebuildCatalog();

const fmt = n => "₹" + n.toLocaleString("en-IN");
