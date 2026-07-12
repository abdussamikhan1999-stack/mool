/* MOOL — cart state + drawer render
   Split from the original single-file index.html. Load order: catalog -> cart -> ui -> main. */

/* ---------- cart state ---------- */
const cart = {};   // id -> qty

function bagQty(){ return Object.values(cart).reduce((a,b)=>a+b,0); }

function leafSVG(){
  return `<svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 46 L20 10" stroke="#9DB79A" stroke-width="1.6"/>
    <path d="M20 18 C13 14 8 16 4 10 M20 18 C27 14 32 16 36 10
             M20 28 C12 24 7 26 3 20 M20 28 C28 24 33 26 37 20" stroke="#9DB79A" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`;
}

function renderCart(){
  const body = document.getElementById("drawerBody");
  const foot = document.getElementById("drawerFoot");
  const ids = Object.keys(cart);
  if(ids.length===0){
    body.innerHTML = `<div class="cart-empty">
      <div class="em-mark serif">मूल</div>
      <p>Your bag is empty.</p>
      <a href="#routine" class="btn btn-ghost" onclick="closeCart()">Shop the routine</a>
    </div>`;
    foot.style.display="none";
  } else {
    body.innerHTML = ids.map(id=>{
      const p = CATALOG[id]; const q = cart[id];
      return `<div class="ci">
        <div class="swatch">${leafSVG()}</div>
        <div class="info">
          <h4>${p.name}</h4>
          <div class="sz">${p.size}</div>
          <div class="qty">
            <button onclick="changeQty('${id}',-1)" aria-label="Decrease">−</button>
            <span>${q}</span>
            <button onclick="changeQty('${id}',1)" aria-label="Increase">+</button>
          </div>
        </div>
        <div class="right">
          <div class="p">${fmt(p.price*q)}</div>
          <button class="rm" onclick="removeItem('${id}')">Remove</button>
        </div>
      </div>`;
    }).join("");
    const sub = ids.reduce((s,id)=>s+CATALOG[id].price*cart[id],0);
    document.getElementById("subtotal").textContent = fmt(sub);
    foot.style.display="block";
  }
  const count = document.getElementById("bagCount");
  count.textContent = bagQty();
  count.classList.remove("bump"); void count.offsetWidth; count.classList.add("bump");
}

function addToBag(id){
  cart[id] = (cart[id]||0)+1;
  renderCart();
  toast(`${CATALOG[id].name} added`);
}
function changeQty(id,d){
  cart[id]=(cart[id]||0)+d;
  if(cart[id]<=0) delete cart[id];
  renderCart();
}
function removeItem(id){ delete cart[id]; renderCart(); }
