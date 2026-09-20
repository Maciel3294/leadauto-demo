const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

let selected = { package: "10 Leads", price: 120 };

const checkoutModal = $("#checkoutModal");
const paymentModal = $("#paymentModal");
const accessModal = $("#accessModal");

function openModal(el){ el.classList.add("open"); el.setAttribute("aria-hidden","false"); }
function closeModal(el){ el.classList.remove("open"); el.setAttribute("aria-hidden","true"); }

function money(v){ return Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }

$$(".btn-package").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    selected = { package: btn.dataset.package, price: Number(btn.dataset.price) };
    $("#selectedPackage").textContent = selected.package;
    $("#selectedPrice").textContent = money(selected.price);
    openModal(checkoutModal);
  });
});

$$(".modal-close").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    closeModal(btn.closest(".modal"));
  });
});

$$(".modal").forEach(modal=>{
  modal.addEventListener("click", e=>{
    if(e.target === modal) closeModal(modal);
  });
});

$("#checkoutForm").addEventListener("submit", e=>{
  e.preventDefault();
  const method = $('input[name="payment"]:checked').value;
  $("#payAmount").textContent = money(selected.price);
  $("#payMethod").textContent = method;
  closeModal(checkoutModal);
  openModal(paymentModal);
});

$("#approvePayment").addEventListener("click", ()=>{
  $("#orderPackage").textContent = `Pacote • ${selected.package}`;
  $("#orderNumber").textContent = "#LA-" + Math.floor(100000 + Math.random()*900000);
  closeModal(paymentModal);
  openModal(accessModal);
});

$(".menu-toggle").addEventListener("click", ()=>{
  $(".nav-links").classList.toggle("open");
});

$$(".nav-links a").forEach(a=>{
  a.addEventListener("click", ()=> $(".nav-links").classList.remove("open"));
});

document.addEventListener("keydown", e=>{
  if(e.key === "Escape") $$(".modal.open").forEach(closeModal);
});
