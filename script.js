const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let state={pkg:'10 Leads',price:'120,00',payment:'Pix',name:'',order:'LA-'+Math.floor(1000+Math.random()*9000)};
const checkout=$('#checkout'),leadmodal=$('#leadmodal');
function open(m){m.classList.add('open');document.body.style.overflow='hidden'}
function close(m){m.classList.remove('open');if(!document.querySelector('.modal.open'))document.body.style.overflow=''}
$$('.buy').forEach(b=>b.onclick=()=>{state.pkg=b.dataset.pkg;state.price=b.dataset.price;$('#pkg').textContent=state.pkg;$('#price').textContent=state.price;$('#formview').classList.remove('hidden');$('#payview').classList.add('hidden');$('#success').classList.add('hidden');$('#form').reset();open(checkout)});
$$('[data-close]').forEach(x=>x.onclick=()=>close(x.closest('.modal')));
$('.menu').onclick=()=>document.querySelector('.header nav').classList.toggle('open');
$$('.header nav a').forEach(a=>a.onclick=()=>document.querySelector('.header nav').classList.remove('open'));
$$('.payments label').forEach(l=>l.onclick=()=>{state.payment=l.querySelector('input').value;$$('.payments label').forEach(x=>x.style.borderColor='');l.style.borderColor='#2788ff'});
$('#form').onsubmit=e=>{e.preventDefault();state.name=$('#name').value.trim();state.payment=document.querySelector('input[name=pay]:checked').value;$('#paytitle').textContent='Pagamento via '+state.payment;$('#payamount').textContent=state.price;$('#formview').classList.add('hidden');$('#payview').classList.remove('hidden')};
$('#back').onclick=()=>{$('#payview').classList.add('hidden');$('#formview').classList.remove('hidden')};
$('#approve').onclick=()=>{$('#payview').classList.add('hidden');$('#success').classList.remove('hidden')};
$('#leads').onclick=()=>{$('#greeting').textContent=(state.name||'Cliente')+' • pagamento aprovado';$('#order').textContent='#'+state.order;$('#leadpkg').textContent=state.pkg;close(checkout);open(leadmodal)};
$('#download').onclick=()=>{const rows=[['Nome','WhatsApp','Cidade','Veículo','Interesse','Status'],['João da Silva','(11) 99999-1001','São Paulo','Onix','Seguro Auto','Novo'],['Carlos Oliveira','(11) 99999-1002','Guarulhos','HB20','Seguro Auto','Novo'],['Marcos Santos','(11) 99999-1003','Osasco','Corolla','Seguro Auto','Novo'],['André Lima','(11) 99999-1004','Santo André','T-Cross','Seguro Auto','Novo'],['Rafael Costa','(11) 99999-1005','São Bernardo','Tracker','Seguro Auto','Novo']];const csv='\ufeff'+rows.map(r=>r.map(v=>'"'+v.replaceAll('"','""')+'"').join(';')).join('\n');const u=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=u;a.download='leads-seguro-auto-demo.csv';a.click();URL.revokeObjectURL(u)};
