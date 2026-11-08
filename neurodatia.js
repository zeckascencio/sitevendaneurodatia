document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#currentYear').textContent=new Date().getFullYear();
  if(window.Swiper){new Swiper('.solution-swiper',{slidesPerView:1,spaceBetween:22,loop:false,keyboard:{enabled:true},pagination:{el:'.solution-swiper .swiper-pagination',clickable:true},navigation:{nextEl:'.product-slider-button-next',prevEl:'.product-slider-button-prev'},breakpoints:{640:{slidesPerView:2},992:{slidesPerView:3},1200:{slidesPerView:4}}});}
  const audience=document.querySelector('#leadType');
  document.querySelectorAll('[data-select-audience]').forEach(el=>el.addEventListener('click',()=>{audience.value=el.dataset.selectAudience;}));
  const f=document.querySelector('#leadForm');const status=document.querySelector('#leadFeedback');
  f.addEventListener('submit',e=>{e.preventDefault();
    if(!f.checkValidity()){f.reportValidity();status.textContent='Preencha os campos obrigatórios para preparar sua solicitação.';return;}
    const v=id=>document.querySelector('#'+id).value.trim();
    const params=new URLSearchParams(location.search);const tracking=['utm_source','utm_medium','utm_campaign'].map(k=>params.get(k)?k+': '+params.get(k):null).filter(Boolean).join(' | ');
    const subject='NeurodatIA — solicitação '+(v('leadType')==='professor'?'de plano individual':'de proposta institucional');
    const body=['Olá, gostaria de conhecer o NeurodatIA.','', 'Nome: '+v('leadName'),'E-mail: '+v('leadEmail'),'Perfil: '+v('leadType'),'Instituição: '+(v('leadSchool')||'Não informada'),'Desafio: '+v('leadNeed'),'Mensagem: '+(v('leadMsg')||'Não informada'),tracking?'Origem: '+tracking:'','', 'Solicito informações sobre recursos disponíveis, valores, condições e demonstração.'].filter(x=>x!==null).join('\n');
    const addr=window.NEURODATIA_EMAIL||'';
    if(addr){location.href='mailto:'+encodeURIComponent(addr)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);status.textContent='Seu aplicativo de e-mail será aberto. Confira e envie a mensagem.';}
    else{navigator.clipboard?.writeText(subject+'\n\n'+body).then(()=>{status.textContent='Mensagem copiada. Ainda falta configurar o e-mail de atendimento no arquivo config-comercial.js.';}).catch(()=>{status.textContent='Configure o e-mail em config-comercial.js antes de publicar o formulário.';});}
  });
});