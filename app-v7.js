// ====== CONFIGURAÇÃO ======
var SB_URL="https://uizfucwrlaeqcwthqqmp.supabase.co";
var SB_KEY="sb_publishable_gip2Msy7-Nv2iSDUrgtooA_R4q6EZis"; // chave pública (nunca uses a service_role aqui)
// ==========================
var CATS=["Todos","Roupa","Electrónicos","Casa","Comida","Outros"];
var sb=null,S={user:null,p:null,view:"feed",arg:null,tab:"det",q:"",cat:"Todos",mode:"in",sel:{},lang:"pt",atab:"res",likes:{},mine:{},unread:0,payOn:false};
var EN={"Início":"Home","Entrar":"Sign in","Painel":"Dashboard","Publicar":"Post","Renovar":"Renew","Mensagens":"Messages","Moderação":"Moderation","Sair":"Log out","Notificações":"Notifications","Tema claro":"Light theme","Tema escuro":"Dark theme","Conforto de visão":"Eye comfort","O que está à venda":"For sale","Procurar produto ou loja":"Search product or shop","Todos":"All","Roupa":"Clothes","Electrónicos":"Electronics","Casa":"Home goods","Comida":"Food","Outros":"Other","Ainda não há produtos aqui.":"No products here yet.","Ver e comentar":"View & comment","← Voltar":"← Back","Detalhes":"Details","Consulta privada":"Private enquiry","Comentários":"Comments","Contactar no WhatsApp":"Contact on WhatsApp","Denunciar":"Report","Comentar":"Comment","Escreve um comentário público":"Write a public comment","Enviar ao vendedor":"Send to seller","Entrar / Criar conta":"Sign in / Create account","Sou cliente":"I'm a customer","Quero vender":"I want to sell","Criar conta":"Create account","Nome":"Name","Palavra-passe":"Password","Nome da loja":"Shop name","Avaliar este vendedor":"Rate this seller","Enviar avaliação":"Submit rating","Sem avaliações":"No ratings","Painel do vendedor":"Seller dashboard","Os meus produtos":"My products","Publicar produto":"Post a product","Enviar para aprovação":"Send for approval","Pagar / Renovar":"Pay / Renew","Já paguei":"I have paid","Consultas privadas":"Private enquiries","Administração":"Administration","Aprovar":"Approve","Recusar":"Refuse","Confirmar":"Confirm","Resumo":"Summary","Aprovações":"Approvals","Pagamentos":"Payments","Denúncias":"Reports","Utilizadores":"Users","Clientes":"Customers","Vendedores":"Sellers","Produtos activos":"Active products","Por aprovar":"To approve","Novos (7 dias)":"New (7 days)","Produtos por categoria":"Products by category","Visitas ao site: em breve.":"Site visits: coming soon.","Ainda não tens notificações.":"You have no notifications yet.","Alguém":"Someone","gostou do teu produto":"liked your product","enviou uma consulta sobre":"sent an enquiry about","comentou em":"commented on","O teu produto foi aprovado:":"Your product was approved:","O teu produto foi recusado:":"Your product was refused:","Novo":"New","Entra para gostar.":"Sign in to like.","Entra para comentar.":"Sign in to comment.","Mensagem enviada.":"Message sent.","Número ou e-mail":"Phone number or e-mail","Número de telemóvel":"Phone number","Número de telemóvel (84...)":"Phone number (84...)","Número de telemóvel ou e-mail":"Phone number or e-mail","Papel actualizado.":"Role updated.","Publicado.":"Published.","Pagamento confirmado.":"Payment confirmed.","Nada por aprovar.":"Nothing to approve.","Nada por confirmar.":"Nothing to confirm.","Sem denúncias.":"No reports.","Apagar comentário":"Delete comment","Manter":"Keep","Avaliação enviada.":"Rating submitted.","Moderação ":"Moderation","A tua classificação: ":"Your rating: ","Ainda não há mensagens.":"No messages yet.","Ainda não publicaste nenhum produto.":"You have not posted any product yet.","Publicar novo produto":"Post a new product","Admin":"Admin"};
Object.assign(EN,{"Descrição da loja":"Shop description","Logótipo ou foto da loja":"Shop logo or photo","Horário (ex.: Seg–Sáb 8h–18h)":"Opening hours (e.g. Mon–Sat 8am–6pm)","Zona / bairro":"Area / neighbourhood","Falar no WhatsApp":"Chat on WhatsApp","Zona: ":"Area: ","Horário: ":"Hours: ","Editar produto":"Edit product","Guardar":"Save","Remover":"Remove","Editar":"Edit","Marcar como vendido":"Mark as sold","Voltar a vender":"Sell again","Apagar":"Delete","Vendido":"Sold","O meu perfil":"My profile","Perfil":"Profile","Mudar a palavra-passe":"Change password","Mudar palavra-passe":"Change password","Palavra-passe actual":"Current password","Nova palavra-passe":"New password","Partilhar":"Share","Este anúncio já não está disponível.":"This listing is no longer available.","Ver outros produtos":"See other products","Anúncio apagado.":"Listing deleted.","Apagar este anúncio?":"Delete this listing?","Palavra-passe alterada.":"Password changed.","WhatsApp da loja":"Shop WhatsApp","Compra e vende perto de ti":"Buy and sell near you","Descobre produtos de vendedores da tua zona e fala com eles directamente.":"Discover products from sellers in your area and talk to them directly.","Relatório":"Report","Relatório semanal":"Weekly report","Guardar em PDF":"Save as PDF","Visitas":"Visits","Clientes novos":"New customers","Vendedores novos":"New sellers","Produtos publicados":"Products posted","Gostos":"Likes","Pagamentos confirmados (MT)":"Payments confirmed (MT)","A processar…":"Processing…","A carregar…":"Loading…","Enviar":"Send","Tu":"You","Cliente":"Customer","Vendedor":"Seller","Conversas":"Conversations","Escreve uma mensagem":"Write a message","Escreve uma resposta":"Write a reply","Só tu e o vendedor vêem esta conversa.":"Only you and the seller can see this conversation.","O vendedor respondeu à tua consulta sobre":"The seller replied to your enquiry about","Ligar":"Turn on","Desligar":"Turn off","Guardado.":"Saved.","Verificar":"Verify","Retirar selo":"Remove badge"});
function tr(x){return(S.lang==="en"&&typeof x==="string"&&EN[x])?EN[x]:x;}
var app=document.getElementById("app"),top_=document.getElementById("top"),nav_=document.getElementById("nav");

function h(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=tr(x);return e;}
function add(p){for(var i=1;i<arguments.length;i++){var a=arguments[i];if(!a)continue;p.appendChild(typeof a==="string"?document.createTextNode(tr(a)):a);}return p;}
function btn(t,fn,c){var b=h("button",c||"",t);b.onclick=async function(){if(b.disabled)return;var old=b.textContent;b.disabled=true;b.classList.add("busy");b.textContent=tr("A processar…");try{await fn();}catch(e){err(e);}b.disabled=false;b.classList.remove("busy");b.textContent=old;};return b;}
function field(l,i){var w=h("div");add(w,h("label","",l),i);return w;}
function inp(ph,type){var i=h("input");i.placeholder=tr(ph);if(type)i.type=type;return i;}
function toast(m){var t=document.getElementById("toast");t.textContent=tr(m);t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(function(){t.hidden=true;},4000);}
function err(e){console.error(e);toast("Erro: "+(e&&e.message?e.message:e));}
function go(v,a){S.view=v;S.arg=a==null?null:a;if(v==="prod")S.tab="det";render();window.scrollTo(0,0);}
function role(){return S.p?S.p.role:"visitor";}
function money(n){return Number(n).toLocaleString("pt-PT")+" MT";}
function chk(r){if(r.error)throw r.error;return r.data;}
function wa(n,m){return "https://wa.me/"+String(n||"").replace(/\D/g,"")+"?text="+encodeURIComponent(m);}
function avatar(s,sz){var d=h("span","av"+(sz?" "+sz:""));if(s&&s.logo){var i=document.createElement("img");i.src=s.logo;i.alt="";d.appendChild(i);}else d.textContent=((s&&s.name)||"L").trim().charAt(0).toUpperCase();return d;}
function stars(id){var s=S.sel[id],w=h("span","muted");if(!s||!s.n){w.textContent="Sem avaliações";return w;}
  var k=Math.round(s.avg);add(w,h("span","stars","★★★★★".slice(0,k)+"☆☆☆☆☆".slice(0,5-k))," "+String(s.avg).replace(".",",")+" ("+s.n+")");return w;}
function openPhoto(list,i){
  var ov=h("div","lb"),img=document.createElement("img"),cnt=h("span","lbc"),sx=null;
  ov.setAttribute("role","dialog");ov.setAttribute("aria-label","Foto");img.alt="Foto do produto";
  function show(){img.src=list[i];cnt.textContent=list.length>1?(i+1)+" / "+list.length:"";}
  function close(){document.removeEventListener("keydown",key);ov.remove();}
  function step(d){i=(i+d+list.length)%list.length;show();}
  function key(e){if(e.key==="Escape")close();else if(e.key==="ArrowRight")step(1);else if(e.key==="ArrowLeft")step(-1);}
  var x=h("button","lbx","✕");x.setAttribute("aria-label","Fechar");x.onclick=function(e){e.stopPropagation();close();};
  ov.onclick=function(e){if(e.target!==img)close();};
  add(ov,img,cnt,x);
  if(list.length>1){var pv=h("button","lbn lbp","‹"),nx=h("button","lbn lbq","›");
    pv.onclick=function(e){e.stopPropagation();step(-1);};nx.onclick=function(e){e.stopPropagation();step(1);};add(ov,pv,nx);}
  ov.addEventListener("touchstart",function(e){sx=e.touches[0].clientX;},{passive:true});
  ov.addEventListener("touchend",function(e){if(sx==null||list.length<2)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)step(dx<0?1:-1);sx=null;},{passive:true});
  document.addEventListener("keydown",key);document.body.appendChild(ov);show();
}
function pic(p){var d=h("div","pic");if(p.photos&&p.photos.length){var i=document.createElement("img");i.src=p.photos[0];i.alt="Foto de "+p.name;d.appendChild(i);}else d.textContent=p.category;if(p.photos&&p.photos.length){d.style.cursor="zoom-in";d.onclick=function(){openPhoto(p.photos,0);};}return d;}

async function loadSellers(){
  var a=chk(await sb.from("public_sellers").select("*")),b=chk(await sb.from("seller_stats").select("*"));
  S.sel={};a.forEach(function(s){S.sel[s.id]={name:s.shop_name||"Loja",wa:s.whatsapp,active:s.active,ver:s.verified,logo:s.logo_url,desc:s.description,zone:s.zone,hours:s.hours};});
  b.forEach(function(s){if(S.sel[s.seller_id]){S.sel[s.seller_id].avg=Number(s.average);S.sel[s.seller_id].n=Number(s.total);}});
}
async function loadProfile(){
  if(!S.user){S.p=null;return;}
  var r=await sb.from("profiles").select("*").eq("id",S.user.id).maybeSingle();S.p=r.data||null;
}

async function loadUnread(){
  if(!S.user){S.unread=0;return;}
  var r=await sb.from("notifications").select("id",{count:"exact",head:true}).eq("read",false);S.unread=r.count||0;
  var b=document.getElementById("badge");if(b){b.textContent=S.unread;b.hidden=!S.unread;}
}
async function loadLikes(){
  var a=await sb.from("product_likes").select("*");S.likes={};(a.data||[]).forEach(function(x){S.likes[x.product_id]=Number(x.total);});
  S.mine={};if(S.user){var m=await sb.from("likes").select("product_id").eq("user_id",S.user.id);(m.data||[]).forEach(function(x){S.mine[x.product_id]=1;});}
}
function chrome(){
  top_.textContent="";var b=h("div","brand");add(b,h("span","seven","7"),"Ma",h("span","","R"),"keT");add(top_,b);
  if(S.user){var bell=h("button","hbtn","🔔");bell.setAttribute("aria-label",tr("Notificações"));var bd=h("span","badge",String(S.unread));bd.id="badge";bd.hidden=!S.unread;bell.appendChild(bd);bell.onclick=function(){go("notifs");};top_.appendChild(bell);}
  var lg=h("select");lg.setAttribute("aria-label","Language");[["pt","Português"],["en","English"]].forEach(function(o){var op=h("option","",o[1]);op.value=o[0];if(S.lang===o[0])op.selected=true;lg.appendChild(op);});
  lg.onchange=function(){S.lang=lg.value;try{localStorage.setItem("7m-lang",S.lang);}catch(e){}render();};
  var th=h("select");th.setAttribute("aria-label","Tema");
  [["light","Tema claro"],["dark","Tema escuro"],["comfort","Conforto de visão"]].forEach(function(o){var op=h("option","",o[1]);op.value=o[0];if(document.documentElement.dataset.theme===o[0])op.selected=true;th.appendChild(op);});
  th.onchange=function(){document.documentElement.dataset.theme=th.value;try{localStorage.setItem("7m-theme",th.value);}catch(e){}};
  add(top_,lg,th);
  if(S.user)top_.appendChild(btn("Sair",async function(){await sb.auth.signOut();S.view="feed";},"hbtn"));
  nav_.textContent="";
  var r=role(),it=[["feed","Início"]];
  if(r==="visitor")it.push(["login","Entrar"]);
  if(r==="seller"){it.push(["dash","Painel"],["publish","Publicar"]);if(S.payOn)it.push(["pay","Renovar"]);it.push(["msgs","Mensagens"]);}
  if(r==="admin"||r==="mod")it.push(["admin",r==="admin"?"Admin":"Moderação"]);
  if(S.user)it.push(["profile","Perfil"]);
  it.forEach(function(i){var b=btn(i[1],function(){go(i[0]);});if(S.view===i[0])b.setAttribute("aria-current","true");nav_.appendChild(b);});
}

function card(p){
  var c=h("article","post"),hd=h("div","row"),s=S.sel[p.seller_id]||{name:"Loja"};
  add(hd,avatar(s),btn(s.name+(s.ver?" ✔":""),function(){go("seller",p.seller_id);},"ghost"),stars(p.seller_id),h("span","muted",p.zone?"· "+p.zone:""));
  var lk=h("button","ghost");function lkt(){lk.textContent=(S.mine[p.id]?"♥ ":"♡ ")+(S.likes[p.id]||0);}lkt();
  lk.onclick=async function(){
    if(!S.user){toast("Entra para gostar.");return;}
    try{if(S.mine[p.id]){chk(await sb.from("likes").delete().eq("product_id",p.id).eq("user_id",S.user.id));delete S.mine[p.id];S.likes[p.id]=Math.max(0,(S.likes[p.id]||1)-1);}
    else{chk(await sb.from("likes").insert({product_id:p.id,user_id:S.user.id}));S.mine[p.id]=1;S.likes[p.id]=(S.likes[p.id]||0)+1;}lkt();}catch(e){err(e);}
  };
  var r=h("div","row");add(r,btn("Ver e comentar",function(){go("prod",p.id);}),lk);
  add(c,hd,pic(p),h("h3","",p.name),h("p","price",money(p.price)),r);return c;
}
async function vFeed(){
  var box=h("div");var hero=h("div","hero");add(hero,h("h1","","Compra e vende perto de ti"),h("p","","Descobre produtos de vendedores da tua zona e fala com eles directamente."));add(box,hero);
  var all=chk(await sb.from("products").select("*").eq("status","ativo").order("created_at",{ascending:false}));await loadLikes();
  var q=inp("Procurar produto ou loja","search");q.value=S.q;var list=h("div","grid"),chips=h("div","row");
  CATS.forEach(function(c){var b=btn(c,function(){S.cat=c;render();},"chip ghost");b.setAttribute("aria-pressed",String(S.cat===c));chips.appendChild(b);});
  function draw(){list.textContent="";var t=S.q.toLowerCase(),n=0;
    all.forEach(function(p){if(S.cat!=="Todos"&&p.category!==S.cat)return;
      if(t&&(p.name+" "+((S.sel[p.seller_id]||{}).name||"")).toLowerCase().indexOf(t)<0)return;n++;list.appendChild(card(p));});
    if(!n)list.appendChild(h("p","muted","Ainda não há produtos aqui."));}
  q.oninput=function(){S.q=q.value;draw();};hero.appendChild(q);add(box,chips,list);draw();return box;
}

function chat(list,mine,label,extra){
  var w=h("div","chat");if(!list.length)w.appendChild(h("p","muted","Ainda não há mensagens."));
  list.forEach(function(m){var me=mine(m),b=h("div","bub"+(me?" me":""));
    add(b,h("span","who",me?"Tu":label(m)),h("p","",m.body),h("small","",new Date(m.created_at).toLocaleString("pt-PT",{dateStyle:"short",timeStyle:"short"})));
    if(extra)extra(m,b);w.appendChild(b);});return w;
}
function composer(ph,send){
  var w=h("div","row"),i=inp(ph);i.style.flex="1";
  add(w,i,btn("Enviar",async function(){var t=i.value.trim();if(!t)return;await send(t);render();}));return w;
}
async function vProd(){
  var p=chk(await sb.from("products").select("*").eq("id",S.arg).maybeSingle());
  if(!p){var nb=h("div","box");add(nb,h("p","","Este anúncio já não está disponível."),btn("Ver outros produtos",function(){go("feed");}));return nb;}
  var s=S.sel[p.seller_id]||{name:"Loja"},box=h("div");
  add(box,btn("← Voltar",function(){go("feed");},"ghost"),h("h2","",p.name),h("p","price",money(p.price)),p.status==="vendido"?h("span","tag pend","Vendido"):null);
  var tabs=h("div","tabs");
  [["det","Detalhes"],["priv","Consulta privada"],["com","Comentários"]].forEach(function(t){var b=btn(t[1],function(){S.tab=t[0];render();});b.setAttribute("aria-selected",String(S.tab===t[0]));tabs.appendChild(b);});
  var body=h("div","box");add(box,tabs,body);var r=role();
  if(S.tab==="det"){
    if(p.photos&&p.photos.length){body.appendChild(pic(p));if(p.photos.length>1){var ph=h("div","ph");p.photos.forEach(function(u,n){var i=document.createElement("img");i.src=u;i.alt="Foto "+(n+1);i.style.cursor="zoom-in";i.onclick=function(){openPhoto(p.photos,n);};ph.appendChild(i);});body.appendChild(ph);}}
    add(body,h("p","",p.description||""),h("p","muted","Zona: "+(p.zone||"—")+" · Categoria: "+p.category),h("div","row"),btn(s.name+(s.ver?" ✔":""),function(){go("seller",p.seller_id);},"ghost")," ",stars(p.seller_id));
    var a=h("a","b wa","Contactar no WhatsApp");a.href=wa(s.wa,"Olá! Vi \""+p.name+"\" no 7MaRkeT.");a.target="_blank";a.rel="noopener noreferrer";
    a.onclick=function(){if(r==="client")sb.from("contacts").upsert({client_id:S.user.id,seller_id:p.seller_id},{onConflict:"client_id,seller_id",ignoreDuplicates:true}).then(function(){});};
    add(body,h("div","row"),a,btn("Partilhar",function(){
      var url=location.origin+location.pathname+"#p/"+p.id,txt=p.name+" – "+money(p.price)+" no 7MaRkeT";
      if(navigator.share)return navigator.share({title:p.name,text:txt,url:url}).catch(function(){});
      window.open("https://wa.me/?text="+encodeURIComponent(txt+"\n"+url),"_blank");},"ghost"));
  }else if(S.tab==="priv"){
    if(r!=="client")add(body,h("p","",r==="visitor"?"Entra com a tua conta de cliente para enviar uma consulta.":"Só clientes enviam consultas."),r==="visitor"?btn("Entrar",function(){go("login");}):null);
    else{
      add(body,h("p","muted","Só tu e o vendedor vêem esta conversa."));
      var ms=chk(await sb.from("messages").select("*").eq("product_id",p.id).eq("client_id",S.user.id).order("created_at"));
      add(body,chat(ms,function(m){return m.sender_id===S.user.id;},function(){return s.name;}));
      body.appendChild(composer("Escreve uma mensagem",async function(t){
        chk(await sb.from("messages").insert({product_id:p.id,client_id:S.user.id,sender_id:S.user.id,body:t}));
        await sb.from("contacts").upsert({client_id:S.user.id,seller_id:p.seller_id},{onConflict:"client_id,seller_id",ignoreDuplicates:true});}));
    }
  }else{
    var cs=chk(await sb.from("comments_public").select("*").eq("product_id",p.id).order("created_at"));
    add(body,chat(cs,function(c){return S.user&&c.user_id===S.user.id;},function(c){return c.author+(c.user_id===p.seller_id?" · "+tr("Vendedor"):"");},function(c,b){
      if(S.user&&c.user_id!==S.user.id){var d=h("button","ghost sm","Denunciar");d.onclick=async function(){try{chk(await sb.from("reports").insert({comment_id:c.id,reporter_id:S.user.id}));toast("Denúncia enviada.");}catch(e){err(e);}};b.appendChild(d);}}));
    if(!S.user)add(body,h("p","muted","Entra para comentar."),btn("Entrar",function(){go("login");}));
    else body.appendChild(composer("Escreve um comentário público",async function(t){chk(await sb.from("comments").insert({product_id:p.id,user_id:S.user.id,body:t}));}));
  }
  return box;
}

async function vSeller(){
  var id=S.arg,s=S.sel[id]||{name:"Loja"},box=h("div");add(box,btn("← Voltar",function(){go("feed");},"ghost"));
  var hd=h("div","box shophead"),tx=h("div");add(hd,avatar(s,"big"));
  add(tx,h("h2","",s.name+(s.ver?" ✔":"")),stars(id));
  if(s.zone)add(tx,h("p","muted",tr("Zona: ")+s.zone));
  if(s.hours)add(tx,h("p","muted",tr("Horário: ")+s.hours));
  if(s.desc)add(tx,h("p","",s.desc));
  if(s.wa){var wb=h("a","b wa","Falar no WhatsApp");wb.href=wa(s.wa,"Olá! Vi a tua loja no 7MaRkeT.");wb.target="_blank";wb.rel="noopener noreferrer";
    wb.onclick=function(){if(role()==="client")sb.from("contacts").upsert({client_id:S.user.id,seller_id:id},{onConflict:"client_id,seller_id",ignoreDuplicates:true}).then(function(){});};
    add(tx,h("div","row"),wb);}
  hd.appendChild(tx);box.appendChild(hd);
  var r=h("div","box");add(r,h("h3","","Avaliar este vendedor"));
  if(role()==="client"){
    var mine=chk(await sb.from("ratings").select("stars").eq("client_id",S.user.id).eq("seller_id",id)),ct=chk(await sb.from("contacts").select("seller_id").eq("client_id",S.user.id).eq("seller_id",id));
    if(mine.length)add(r,h("p","","A tua avaliação: "+mine[0].stars+" de 5. Obrigado!"));
    else if(!ct.length)add(r,h("p","muted","Para avaliar, primeiro contacta o vendedor (consulta privada ou WhatsApp)."));
    else{var o=h("select","f");[5,4,3,2,1].forEach(function(n){var op=h("option","",n+" de 5");op.value=n;o.appendChild(op);});
      add(r,o,h("div","row"),btn("Enviar avaliação",async function(){chk(await sb.from("ratings").insert({client_id:S.user.id,seller_id:id,stars:+o.value}));await loadSellers();toast("Avaliação enviada.");render();}));}
  }else add(r,h("p","muted",role()==="visitor"?"Só clientes com conta podem avaliar.":"Só clientes avaliam vendedores."));
  box.appendChild(r);await loadLikes();
  chk(await sb.from("products").select("*").eq("seller_id",id).eq("status","ativo")).forEach(function(p){box.appendChild(card(p));});return box;
}

function pseudo(v){v=v.trim();if(v.indexOf("@")>-1)return v.toLowerCase();var d=v.replace(/\D/g,"");if(d.length===9)d="258"+d;return d+"@7market.app";}
function vLogin(){
  var box=h("div");add(box,h("h2","","Entrar / Criar conta"));
  var tabs=h("div","tabs");
  [["in","Entrar"],["client","Sou cliente"],["seller","Quero vender"]].forEach(function(t){var b=btn(t[1],function(){S.mode=t[0];render();});b.setAttribute("aria-selected",String(S.mode===t[0]));tabs.appendChild(b);});
  var f=h("div","box"),ph=inp("Número de telemóvel (84...)","tel"),pw=inp("Palavra-passe (mínimo 6 caracteres)","password");box.appendChild(tabs);
  if(S.mode==="in"){ph.placeholder=tr("Número de telemóvel ou e-mail");ph.type="text";
    add(f,field("Número ou e-mail",ph),field("Palavra-passe",pw),h("div","row"),btn("Entrar",async function(){chk(await sb.auth.signInWithPassword({email:pseudo(ph.value),password:pw.value}));S.view="feed";}));}
  else{var nm=inp("O teu nome"),sn=inp("Nome da loja"),sw=inp("WhatsApp da loja (258...)","tel");
    add(f,field("Nome",nm),field("Número de telemóvel",ph),field("Palavra-passe",pw));
    if(S.mode==="seller")add(f,field("Nome da loja",sn),field("WhatsApp da loja",sw));
    add(f,h("p","muted","Guarda bem a tua palavra-passe: por agora, se a esqueceres, tens de pedir ajuda ao administrador."),h("div","row"),btn("Criar conta",async function(){
      if(ph.value.replace(/\D/g,"").length<9){toast("Escreve um número de telemóvel válido.");return;}
      if(pw.value.length<6){toast("A palavra-passe precisa de pelo menos 6 caracteres.");return;}
      var d={name:nm.value.trim(),phone:ph.value.trim(),role:S.mode};if(S.mode==="seller"){d.shop_name=sn.value.trim();d.whatsapp=sw.value.trim()||ph.value.trim();}
      var r=chk(await sb.auth.signUp({email:pseudo(ph.value),password:pw.value,options:{data:d}}));
      if(!r.session){toast("Conta criada, mas precisa de confirmação. Fala com o administrador.");S.mode="in";render();}else{S.view=S.mode==="seller"?"dash":"feed";}}));}
  box.appendChild(f);return box;
}

async function vDash(){
  var box=h("div");add(box,h("h2","","Painel do vendedor"));var st=h("div","box"),pu=S.p.paid_until?new Date(S.p.paid_until):null,d=pu?Math.ceil((pu-Date.now())/864e5):0,free=!S.payOn,on=free||d>0;
  add(st,h("h3","",free?(S.p.shop_name||"A tua loja"):(d>0?"Semana paga: faltam "+d+" dia(s)":"Sem pagamento activo: os teus anúncios estão escondidos")),h("p","","A tua classificação: "),stars(S.user.id));
  if(!free)add(st,h("div","row"),btn("Renovar",function(){go("pay");},d>0?"ghost":""));
  box.appendChild(st);add(box,h("h3","","Os meus produtos"));
  var ps=chk(await sb.from("products").select("*").eq("seller_id",S.user.id).order("created_at",{ascending:false}));
  if(!ps.length)box.appendChild(h("p","muted","Ainda não publicaste nenhum produto."));
  ps.forEach(function(p){var it=h("div","item"),t=p.status==="pendente"?"À espera de aprovação":p.status==="recusado"?"Recusado":p.status==="vendido"?"Vendido":(on?"Activo":"Escondido");
    add(it,h("b","",p.name+" – "+money(p.price))," ",h("span","tag"+(p.status==="pendente"?" pend":""),t));
    var ac=h("div","row");add(ac,btn("Editar",function(){go("publish",p.id);},"ghost sm"));
    if(p.status==="ativo")ac.appendChild(btn("Marcar como vendido",async function(){chk(await sb.from("products").update({status:"vendido"}).eq("id",p.id));toast("Guardado.");render();},"ghost sm"));
    if(p.status==="vendido")ac.appendChild(btn("Voltar a vender",async function(){chk(await sb.from("products").update({status:"ativo"}).eq("id",p.id));toast("Guardado.");render();},"ghost sm"));
    ac.appendChild(btn("Apagar",async function(){if(!confirm(tr("Apagar este anúncio?")))return;chk(await sb.from("products").delete().eq("id",p.id));toast("Anúncio apagado.");render();},"no sm"));
    it.appendChild(ac);box.appendChild(it);});
  add(box,h("div","row"),btn("Publicar novo produto",function(){go("publish");}));return box;
}

function shrink(file){
  return new Promise(function(res){
    var img=new Image(),u=URL.createObjectURL(file);
    img.onload=function(){
      var k=Math.min(1,1280/Math.max(img.width,img.height)),c=document.createElement("canvas");
      c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);
      c.getContext("2d").drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);
      c.toBlob(function(b){res(b&&b.size<file.size?b:file);},"image/jpeg",0.78);
    };
    img.onerror=function(){res(file);};img.src=u;
  });
}
async function vPublish(){
  var ed=S.arg?chk(await sb.from("products").select("*").eq("id",S.arg).single()):null,box=h("div");
  add(box,h("h2","",ed?"Editar produto":"Publicar produto"));
  var n=inp("Nome do produto"),pr=inp("Preço em MT","number"),z=inp("Zona / bairro"),d=h("textarea"),c=h("select","f"),f=h("input"),prev=h("div","ph"),cur=h("div","ph"),keep=ed?(ed.photos||[]).slice():[];
  d.rows=3;CATS.slice(1).forEach(function(x){c.appendChild(h("option","",x));});f.type="file";f.accept="image/*";f.multiple=true;
  if(ed){n.value=ed.name;pr.value=ed.price;z.value=ed.zone||"";d.value=ed.description||"";c.value=ed.category;}
  function drawKeep(){cur.textContent="";keep.forEach(function(u,i){var w=h("div"),im=document.createElement("img");im.src=u;im.alt="Foto";add(w,im,btn("Remover",function(){keep.splice(i,1);drawKeep();},"ghost sm"));cur.appendChild(w);});}
  drawKeep();
  f.onchange=function(){prev.textContent="";Array.prototype.slice.call(f.files,0,4).forEach(function(file){var i=document.createElement("img");i.src=URL.createObjectURL(file);i.alt="Pré-visualização";prev.appendChild(i);});};
  add(box,field("Nome do produto",n),field("Preço (MT)",pr),field("Categoria",c),field("Zona / bairro",z),field("Descrição",d),cur,field("Fotos (até 4)",f),prev);
  if(ed)add(box,h("p","muted","Se mudares o nome, a descrição, a categoria ou as fotos, o anúncio volta a ser analisado pelo administrador."));
  add(box,h("div","row"),btn(ed?"Guardar":"Enviar para aprovação",async function(){
    if(!n.value.trim()||!pr.value){toast("Preenche o nome e o preço.");return;}
    var urls=keep.slice(),files=Array.prototype.slice.call(f.files,0,Math.max(0,4-keep.length));
    for(var i=0;i<files.length;i++){var path=S.user.id+"/"+Date.now()+"-"+i;var f2=await shrink(files[i]);chk(await sb.storage.from("photos").upload(path,f2,{contentType:f2.type||"image/jpeg"}));urls.push(sb.storage.from("photos").getPublicUrl(path).data.publicUrl);}
    var row={name:n.value.trim(),price:Number(pr.value),category:c.value,zone:z.value.trim(),description:d.value.trim(),photos:urls};
    if(ed){chk(await sb.from("products").update(row).eq("id",ed.id));toast("Guardado.");}
    else{row.seller_id=S.user.id;chk(await sb.from("products").insert(row));toast("Enviado. O administrador vai aprovar.");}
    go("dash");}));
  return box;
}
function vPay(){
  var box=h("div");add(box,h("h2","","Pagar / Renovar"));
  if(!S.payOn)return vDash();
  var o=h("select","f");[["10","1 semana – 10 MT"],["40","4 semanas – 40 MT"]].forEach(function(x){var op=h("option","",x[1]);op.value=x[0];o.appendChild(op);});
  var r=inp("Referência da transferência e-Mola");
  add(box,h("p","","Envia o valor por e-Mola para o número do administrador (84 000 0000, a definir) e escreve aqui a referência que recebeste."),field("Período",o),field("Referência",r),h("div","row"),
    btn("Já paguei",async function(){if(!r.value.trim()){toast("Falta a referência.");return;}
      chk(await sb.from("payments").insert({seller_id:S.user.id,amount:+o.value,ref:r.value.trim()}));toast("Recebido. O administrador vai confirmar.");go("dash");}));return box;
}

async function vMsgs(){
  var box=h("div");add(box,h("h2","","Conversas"));
  var m=chk(await sb.from("messages").select("*, products(name)").order("created_at",{ascending:false})),seen={};
  if(!m.length)box.appendChild(h("p","muted","Ainda não há mensagens."));
  m.forEach(function(x){var k=x.product_id+"|"+x.client_id;if(seen[k])return;seen[k]=1;
    var it=h("div","item");add(it,h("b","",tr("Cliente")+" "+x.client_id.slice(0,4)+" · "+(x.products?x.products.name:"")),h("p","muted",(x.sender_id===S.user.id?tr("Tu")+": ":"")+x.body));
    it.style.cursor="pointer";it.onclick=function(){go("thread",{pid:x.product_id,cid:x.client_id});};box.appendChild(it);});
  return box;
}
async function vNotifs(){
  var box=h("div");add(box,h("h2","","Notificações"));
  var n=chk(await sb.from("notifications").select("*, products(name)").order("created_at",{ascending:false}).limit(50));
  if(!n.length)box.appendChild(h("p","muted","Ainda não tens notificações."));
  var T={like:"gostou do teu produto",message:"enviou uma consulta sobre",comment:"comentou em",approved:"O teu produto foi aprovado:",refused:"O teu produto foi recusado:",reply:"O vendedor respondeu à tua consulta sobre"};
  n.forEach(function(x){var it=h("div","item"),nm=x.products?x.products.name:"",st=(x.kind==="approved"||x.kind==="refused"||x.kind==="reply");
    it.appendChild(h("p","",st?tr(T[x.kind])+" "+nm:tr("Alguém")+" "+tr(T[x.kind])+" "+nm));
    add(it,h("span","muted",new Date(x.created_at).toLocaleString("pt-PT")));if(!x.read)add(it," ",h("span","tag pend","Novo"));
    it.style.cursor="pointer";
    it.onclick=function(){if(x.kind==="message"){go("msgs");}else if(x.product_id){S.view="prod";S.arg=x.product_id;S.tab=x.kind==="reply"?"priv":"det";render();}};
    box.appendChild(it);});
  sb.from("notifications").update({read:true}).eq("read",false).then(function(){S.unread=0;var b=document.getElementById("badge");if(b)b.hidden=true;});
  return box;
}
async function vThread(){
  var a=S.arg,pr=chk(await sb.from("products").select("name").eq("id",a.pid).single()),box=h("div");
  add(box,btn("← Voltar",function(){go("msgs");},"ghost"),h("h2","",pr.name));
  var ms=chk(await sb.from("messages").select("*").eq("product_id",a.pid).eq("client_id",a.cid).order("created_at"));
  add(box,chat(ms,function(m){return m.sender_id===S.user.id;},function(){return tr("Cliente");}));
  box.appendChild(composer("Escreve uma resposta",async function(t){chk(await sb.from("messages").insert({product_id:a.pid,client_id:a.cid,sender_id:S.user.id,body:t}));}));
  return box;
}

async function vAdmin(){
  var full=role()==="admin",box=h("div");add(box,h("h2","",full?"Administração":"Moderação"));
  await loadSellers();
  var tabs=h("div","tabs"),T=[["res","Resumo"],["apr","Aprovações"],["den","Denúncias"]];
  if(full){T.splice(2,0,["pag","Pagamentos"]);T.push(["rel","Relatório"],["usr","Utilizadores"]);}
  if(!T.some(function(t){return t[0]===S.atab;}))S.atab="res";
  T.forEach(function(t){var b=btn(t[1],function(){S.atab=t[0];render();});b.setAttribute("aria-selected",String(S.atab===t[0]));tabs.appendChild(b);});
  var body=h("div","box"),a=S.atab;add(box,tabs,body);
  async function cnt(tb,f){var q=sb.from(tb).select("id",{count:"exact",head:true});if(f)q=f(q);var r=await q;return r.count||0;}
  if(a==="res"){
    var wk=new Date(Date.now()-7*864e5).toISOString();
    var v=await Promise.all([cnt("profiles",function(q){return q.eq("role","client");}),cnt("profiles",function(q){return q.eq("role","seller");}),cnt("products",function(q){return q.eq("status","ativo");}),cnt("products",function(q){return q.eq("status","pendente");}),cnt("reports"),cnt("profiles",function(q){return q.gte("created_at",wk);})]);
    var L=[["Clientes",v[0]],["Vendedores",v[1]],["Produtos activos",v[2]],["Por aprovar",v[3]],["Denúncias",v[4]],["Novos (7 dias)",v[5]]],st=h("div","stat");
    L.forEach(function(c){var d=h("div");add(d,h("b","",String(c[1])),h("span","muted",c[0]));st.appendChild(d);});body.appendChild(st);
    var ps=chk(await sb.from("products").select("category")),by={};ps.forEach(function(p){by[p.category]=(by[p.category]||0)+1;});
    var mx=Math.max.apply(null,Object.keys(by).map(function(k){return by[k];}).concat([1]));
    add(body,h("h3","","Produtos por categoria"));
    Object.keys(by).forEach(function(k){var r=h("div","brow"),bar=h("div","bar");bar.style.width=(by[k]/mx*100)+"%";add(r,h("span","",k+" ("+by[k]+")"),bar);body.appendChild(r);});
    if(full){
      var d7=new Date(Date.now()-6*864e5).toISOString().slice(0,10);
      var vs=chk(await sb.from("visits").select("*").gte("day",d7).order("day")),vt=0;vs.forEach(function(x){vt+=x.total;});
      add(body,h("h3","","Visitas (últimos 7 dias): "+vt));
      var vm=Math.max.apply(null,vs.map(function(x){return x.total;}).concat([1]));
      vs.forEach(function(x){var r=h("div","brow"),bar=h("div","bar");bar.style.width=(x.total/vm*100)+"%";add(r,h("span","",x.day.slice(8,10)+"/"+x.day.slice(5,7)+" ("+x.total+")"),bar);body.appendChild(r);});
    }
    if(full){var sw=h("div","row");add(sw,h("b","","Pagamentos dos vendedores: "+(S.payOn?"ligados":"desligados")),btn(S.payOn?"Desligar":"Ligar",async function(){chk(await sb.from("app_settings").update({payments_enabled:!S.payOn}).eq("id",1));S.payOn=!S.payOn;toast("Guardado.");render();}));body.appendChild(sw);}
  }
  if(a==="pag"){
    var pays=chk(await sb.from("payments").select("*").eq("status","pendente").order("created_at"));
    if(!pays.length)body.appendChild(h("p","muted","Nada por confirmar."));
    pays.forEach(function(p){var it=h("div","item");add(it,h("b","",((S.sel[p.seller_id]||{}).name||"Vendedor")+" – "+p.amount+" MT"),h("span","muted"," · ref. "+p.ref)," ",
      btn("Confirmar",async function(){chk(await sb.rpc("confirm_payment",{pid:p.id}));toast("Pagamento confirmado.");render();},"ok"));body.appendChild(it);});
  }
  if(a==="apr"){
    var pend=chk(await sb.from("products").select("*").eq("status","pendente").order("created_at"));
    if(!pend.length)body.appendChild(h("p","muted","Nada por aprovar."));
    pend.forEach(function(p){var it=h("div","item");add(it,h("b","",p.name+" ("+((S.sel[p.seller_id]||{}).name||"Vendedor")+")"),h("span","muted"," · "+money(p.price))," ",
      btn("Aprovar",async function(){chk(await sb.from("products").update({status:"ativo"}).eq("id",p.id));toast("Publicado.");render();},"ok")," ",
      btn("Recusar",async function(){chk(await sb.from("products").update({status:"recusado"}).eq("id",p.id));render();},"no"));body.appendChild(it);});
  }
  if(a==="den"){
    var rp=chk(await sb.from("reports").select("id, comment_id, comments(body)").order("created_at"));
    if(!rp.length)body.appendChild(h("p","muted","Sem denúncias."));
    rp.forEach(function(r){var it=h("div","item");add(it,h("p","",r.comments?r.comments.body:"(comentário apagado)"),
      btn("Apagar comentário",async function(){chk(await sb.from("comments").delete().eq("id",r.comment_id));toast("Apagado.");render();},"no")," ",
      btn("Manter",async function(){chk(await sb.from("reports").delete().eq("id",r.id));render();},"ghost"));body.appendChild(it);});
  }
  if(a==="rel"){
    var pad=function(n){return(n<10?"0":"")+n;},iso=function(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());};
    var mon=new Date();mon.setDate(mon.getDate()-((mon.getDay()+6)%7));
    var ws=S.week||iso(mon),sel=h("select");sel.setAttribute("aria-label","Semana");
    for(var i=0;i<8;i++){var dd=new Date(mon);dd.setDate(dd.getDate()-7*i);var v0=iso(dd),e=new Date(dd);e.setDate(e.getDate()+6);
      var op=h("option","",pad(dd.getDate())+"/"+pad(dd.getMonth()+1)+" a "+pad(e.getDate())+"/"+pad(e.getMonth()+1));op.value=v0;if(v0===ws)op.selected=true;sel.appendChild(op);}
    sel.onchange=function(){S.week=sel.value;render();};
    var rr=chk(await sb.rpc("weekly_report",{week_start:ws}));
    add(body,h("h3","","Relatório semanal"),sel);
    var L2=[["Visitas",rr.visitas],["Clientes novos",rr.clientes],["Vendedores novos",rr.vendedores],["Produtos publicados",rr.produtos],["Comentários",rr.comentarios],["Mensagens",rr.mensagens],["Gostos",rr.gostos],["Denúncias",rr.denuncias],["Pagamentos confirmados (MT)",rr.pagamentos]],st2=h("div","stat");
    L2.forEach(function(c){var d=h("div");add(d,h("b","",String(c[1]||0)),h("span","muted",c[0]));st2.appendChild(d);});
    add(body,st2,h("div","row no-print"),btn("Guardar em PDF",function(){window.print();}));
  }
  if(a==="usr"){
    var us=chk(await sb.from("profiles").select("id,name,phone,role,shop_name,verified").order("created_at",{ascending:false}).limit(100));
    us.forEach(function(u){var it=h("div","item");add(it,h("b","",u.shop_name||u.name),h("span","muted"," · "+(u.phone||"—")+" · "));
      if(u.id===S.user.id||u.role==="admin")add(it,h("span","tag",u.role));
      else{var sl=h("select");["client","seller","mod"].forEach(function(r){var o=h("option","",r);o.value=r;if(u.role===r)o.selected=true;sl.appendChild(o);});
        sl.onchange=async function(){chk(await sb.from("profiles").update({role:sl.value}).eq("id",u.id));toast("Papel actualizado.");};it.appendChild(sl);if(u.role==="seller")it.appendChild(btn(u.verified?"Retirar selo":"Verificar",async function(){chk(await sb.from("profiles").update({verified:!u.verified}).eq("id",u.id));toast("Guardado.");render();},"ghost"));}
      body.appendChild(it);});
    add(body,h("p","muted","Escolhe mod para criar um segundo administrador com poderes limitados."));
  }
  return box;
}
async function vProfile(){
  var box=h("div");add(box,h("h2","","O meu perfil"));
  var f=h("div","box"),nm=inp("Nome"),sn=inp("Nome da loja"),sw=inp("WhatsApp da loja"),ds=h("textarea"),zn=inp("Zona / bairro"),hr=inp("Horário (ex.: Seg–Sáb 8h–18h)"),lg=h("input"),lgp=h("div","ph"),newLogo=null;nm.value=S.p.name||"";
  add(f,field("Nome",nm));
  if(S.p.role==="seller"){
    sn.value=S.p.shop_name||"";sw.value=S.p.whatsapp||"";ds.value=S.p.description||"";zn.value=S.p.zone||"";hr.value=S.p.hours||"";ds.rows=3;ds.maxLength=300;
    lg.type="file";lg.accept="image/*";
    if(S.p.logo_url)lgp.appendChild(avatar({logo:S.p.logo_url,name:S.p.shop_name},"big"));
    lg.onchange=function(){newLogo=lg.files[0]||null;lgp.textContent="";if(newLogo){var i=document.createElement("img");i.src=URL.createObjectURL(newLogo);i.alt="Logótipo";lgp.appendChild(i);}};
    add(f,field("Nome da loja",sn),field("Logótipo ou foto da loja",lg),lgp,field("Descrição da loja",ds),field("Zona / bairro",zn),field("Horário (ex.: Seg–Sáb 8h–18h)",hr),field("WhatsApp da loja",sw));}
  add(f,h("p","muted","Número de telemóvel: "+(S.p.phone||"—")),h("div","row"),btn("Guardar",async function(){
    var u={name:nm.value.trim()};
    if(S.p.role==="seller"){u.shop_name=sn.value.trim();u.whatsapp=sw.value.trim();u.description=ds.value.trim().slice(0,300);u.zone=zn.value.trim();u.hours=hr.value.trim();
      if(newLogo){var f2=await shrink(newLogo),path=S.user.id+"/logo-"+Date.now();chk(await sb.storage.from("photos").upload(path,f2,{contentType:f2.type||"image/jpeg"}));u.logo_url=sb.storage.from("photos").getPublicUrl(path).data.publicUrl;}}
    chk(await sb.from("profiles").update(u).eq("id",S.user.id));await loadProfile();await loadSellers();toast("Guardado.");render();}));
  var g=h("div","box"),o=inp("Palavra-passe actual","password"),n1=inp("Nova palavra-passe (mínimo 6)","password");
  add(g,h("h3","","Mudar a palavra-passe"),field("Palavra-passe actual",o),field("Nova palavra-passe",n1),h("div","row"),btn("Mudar palavra-passe",async function(){
    if(n1.value.length<6){toast("A palavra-passe precisa de pelo menos 6 caracteres.");return;}
    chk(await sb.auth.signInWithPassword({email:S.user.email,password:o.value}));
    chk(await sb.auth.updateUser({password:n1.value}));o.value="";n1.value="";toast("Palavra-passe alterada.");}));
  add(box,f,g);return box;
}
var V={profile:vProfile,thread:vThread,notifs:vNotifs,feed:vFeed,prod:vProd,seller:vSeller,login:vLogin,dash:vDash,publish:vPublish,pay:vPay,msgs:vMsgs,admin:vAdmin};
var busy=0;
async function render(){
  var k=++busy;try{history.replaceState(null,"",S.view==="prod"?"#p/"+S.arg:location.pathname+location.search);}catch(e){}app.className=S.view==="feed"?"wide":"narrow";chrome();loadUnread();app.textContent="";app.appendChild(h("p","muted","A carregar…"));
  try{var el=await V[S.view]();if(k!==busy)return;app.textContent="";app.appendChild(el);}
  catch(e){if(k!==busy)return;app.textContent="";app.appendChild(h("p","muted","Não foi possível carregar: "+(e.message||e)));}
}
(async function(){
  try{var t=localStorage.getItem("7m-theme");if(t)document.documentElement.dataset.theme=t;var lg0=localStorage.getItem("7m-lang");if(lg0)S.lang=lg0;}catch(e){}
  if(SB_URL.indexOf("COLE_AQUI")===0){chrome();app.appendChild(h("p","box","Falta pôr o Project URL do Supabase no início do ficheiro (variável SB_URL)."));return;}
  sb=supabase.createClient(SB_URL,SB_KEY);
  try{if(!sessionStorage.getItem("7m-v")){sessionStorage.setItem("7m-v","1");sb.rpc("register_visit").then(function(){});}}catch(e){}
  try{var fs=await sb.from("app_settings").select("payments_enabled").eq("id",1).maybeSingle();S.payOn=!!(fs.data&&fs.data.payments_enabled);}catch(e){S.payOn=false;}
  var s=await sb.auth.getSession();S.user=s.data.session?s.data.session.user:null;await loadProfile();await loadSellers().catch(function(){});
  sb.auth.onAuthStateChange(function(ev,sess){var u=sess?sess.user:null;if((u&&u.id)===(S.user&&S.user.id)&&ev!=="SIGNED_OUT")return;
    S.user=u;setTimeout(async function(){await loadProfile();await loadSellers().catch(function(){});render();},0);});
  var hm=location.hash.match(/^#p\/(\d+)$/);if(hm){S.view="prod";S.arg=+hm[1];}
  render();
})();
