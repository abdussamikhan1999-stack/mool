/* MOOL — bootstrap: fetch catalogue from the server, render grid, initial cart paint.
   Load order: catalog -> cart -> ui -> main. Now client/server: products come from /api/products. */

function renderGrid(){
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
  // Cards are injected after the scroll-reveal observer ran, so reveal them now.
  document.querySelectorAll("#prodGrid .rv").forEach(el=>el.classList.add("in"));
}

async function boot(){
  try{
    const r = await fetch("/api/products");
    if(r.ok){
      const data = await r.json();
      if(Array.isArray(data.products) && data.products.length) PRODUCTS = data.products;
      if(data.bundles) BUNDLES = data.bundles;
      rebuildCatalog();
    }
  }catch(e){ /* offline / API down -> use embedded catalogue */ }
  renderGrid();
  renderCart();
}
boot();
