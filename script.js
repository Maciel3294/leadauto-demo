const modal=document.getElementById('modal'), closeBtn=document.getElementById('close'), pkg=document.getElementById('pkg'), price=document.getElementById('price'), payval=document.getElementById('payval'), spkg=document.getElementById('spkg'), order=document.getElementById('order');
let selectedPackage='10 Leads', selectedPrice=120;
document.querySelectorAll('[data-buy]').forEach(btn=>btn.addEventListener('click',()=>{
  selectedPackage=btn.dataset.package||'10 Leads';
  selectedPrice=Number(btn.dataset.price||120);
  pkg.textContent=selectedPackage; price.textContent=`R$ ${selectedPrice.toFixed(2).replace('.',',')}`;
  modal.classList.add('show');
  document.getElementById('formbox').classList.remove('hidden');
  document.getElementById('paybox').classList.add('hidden');
  document.getElementById('success').classList.add('hidden');
}));
closeBtn.addEventListener('click',()=>modal.classList.remove('show'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  payval.textContent=`R$ ${selectedPrice.toFixed(2).replace('.',',')}`;
  document.getElementById('method').textContent=document.querySelector('input[name="method"]:checked').value;
  document.getElementById('formbox').classList.add('hidden');
  document.getElementById('paybox').classList.remove('hidden');
});
document.getElementById('approve').addEventListener('click',()=>{
  order.textContent='#LA-'+Math.floor(100000+Math.random()*900000);
  spkg.textContent=selectedPackage;
  document.getElementById('paybox').classList.add('hidden');
  document.getElementById('success').classList.remove('hidden');
});
document.getElementById('download').addEventListener('click',()=>{
  const csv='Nome,WhatsApp,Região,Interesse\nCliente Demonstrativo,(11) 99999-0000,São Paulo - SP,Seguro Auto';
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='leads-leadauto-demo.csv'; a.click(); URL.revokeObjectURL(a.href);
});
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav-links').classList.remove('open')));
