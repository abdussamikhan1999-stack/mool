/* MOOL — UI wiring: buttons, drawer, toast, nav, menu, signup, reveal
   Split from the original single-file index.html. Load order: catalog -> cart -> ui -> main. */

/* ---------- add buttons ---------- */
document.addEventListener("click",e=>{
  const add = e.target.closest("[data-add]");
  if(add){ flash(add); addToBag(add.dataset.add); }
  const b = e.target.closest("[data-bundle]");
  if(b){ flash(b); addToBag(b.dataset.bundle); }
});
function flash(btn){
  const t = btn.textContent;
  btn.classList.add("added"); btn.textContent="✓ Added";
  setTimeout(()=>{btn.classList.remove("added"); btn.textContent=t;},1100);
}

/* ---------- drawer ---------- */
function openCart(){ document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open"); document.body.classList.add("locked"); }
function closeCart(){ document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open"); document.body.classList.remove("locked"); }
async function fakeCheckout(){
  const ids = Object.keys(cart);
  if(!ids.length){ toast("Your bag is empty"); return; }
  try{
    const r = await fetch("/api/checkout",{
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ items: cart })
    });
    const data = await r.json();
    if(r.ok && data.ok){ toast(`Order ${data.order.id} placed · ${fmt(data.order.total)}`); }
    else { toast(data.error || "Checkout failed"); }
  }catch(e){ toast("Checkout failed — server unreachable"); }
}
window.openCart=openCart; window.closeCart=closeCart;
window.changeQty=changeQty; window.removeItem=removeItem; window.fakeCheckout=fakeCheckout;

/* ---------- toast ---------- */
let toastTimer;
function toast(msg){
  const el=document.getElementById("toast");
  document.getElementById("toastMsg").textContent=msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}

/* ---------- nav scroll ---------- */
const nav=document.getElementById("nav");
addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>24),{passive:true});

/* ---------- mobile menu ---------- */
const mt=document.getElementById("menuToggle"), mm=document.getElementById("mobileMenu");
mt.addEventListener("click",()=>{mt.classList.toggle("on");mm.classList.toggle("open");});
mm.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mt.classList.remove("on");mm.classList.remove("open");}));

/* ---------- signup ---------- */
document.getElementById("signupForm").addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("signupOk").classList.add("show");
  e.target.reset();
});

/* ---------- reveal on scroll ---------- */
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));

/* keyboard: Esc closes drawer */
addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
