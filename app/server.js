const express = require("express");
const path = require("path");
const { PRODUCTS, BUNDLES, itemById } = require("./data");

const app = express();
app.use(express.json());

// --- API ---------------------------------------------------------------
app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// Catalogue now served by the server (front-end fetches this).
app.get("/api/products", (_req, res) => res.json({ products: PRODUCTS, bundles: BUNDLES }));

// Real server-side checkout: validates the cart and prices it on the server
// (client prices can't be trusted). Orders are in-memory for now.
const orders = [];
app.post("/api/checkout", (req, res) => {
  const items = (req.body && req.body.items) || {};
  const lines = [];
  let total = 0;
  for (const [id, qtyRaw] of Object.entries(items)) {
    const qty = parseInt(qtyRaw, 10);
    if (!Number.isInteger(qty) || qty <= 0) continue;
    const item = itemById(id);
    if (!item) return res.status(400).json({ error: `Unknown item: ${id}` });
    total += item.price * qty;
    lines.push({ id, name: item.name, qty, price: item.price });
  }
  if (!lines.length) return res.status(400).json({ error: "Cart is empty." });

  const order = {
    id: "MOOL-" + (1001 + orders.length),
    lines,
    total,
    currency: "INR",
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.json({
    ok: true,
    order,
    note: "Order created server-side. Payment (Razorpay) integration is the next stage.",
  });
});

// --- Static front-end --------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`MOOL app listening on http://localhost:${port}`));
