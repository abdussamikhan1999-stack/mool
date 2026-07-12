/* MOOL — bootstrap: render product grid + initial cart paint
   Split from the original single-file index.html. Load order: catalog -> cart -> ui -> main. */

/* ---------- render product cards ---------- */
const grid = document.getElementById("prodGrid");
grid.innerHTML = PRODUCTS.map(p=>`
  <div class="prod rv ${p.hero?'hero-prod':''}">
    <span class="role-tag">${p.tag}</span>
    <h3>${p.name}</h3>
    <div class="fn">${p.fn}</div>
    <p class="claim">${p.claim}</p>
    <div class="spec">
      <span>Active · <b>${p.active}</b></span>
      <span>${p.size}</span>
    </div>
    <div class="buy">
      <div class="price"><small>MRP</small>${fmt(p.price)}</div>
      <button class="add-btn" data-add="${p.id}">Add to bag</button>
    </div>
  </div>`).join("");

renderCart();
