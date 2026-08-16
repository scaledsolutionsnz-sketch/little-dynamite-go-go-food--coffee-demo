// Little Dynamite Go Go Food & Coffee - site interactions

// intro overlay
window.addEventListener('load', function(){
  var intro = document.getElementById('intro');
  if(intro){ setTimeout(function(){ intro.classList.add('gone'); }, 900); }
});

// nav scroll state
var nav = document.querySelector('header.nav');
function onScroll(){ if(nav){ nav.classList.toggle('scrolled', window.scrollY > 40); } }
window.addEventListener('scroll', onScroll); onScroll();

// mobile menu
var burger = document.getElementById('burger');
var mmenu = document.getElementById('mobileMenu');
if(burger && mmenu){
  burger.addEventListener('click', function(){ mmenu.classList.toggle('open'); });
  mmenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ mmenu.classList.remove('open'); }); });
}

// hero rotating slides
var slides = document.querySelectorAll('.hero-slide');
if(slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  var i = 0;
  setInterval(function(){
    slides[i].classList.remove('on');
    i = (i + 1) % slides.length;
    slides[i].classList.add('on');
  }, 5200);
}

// reveal on scroll
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

// Gmail compose links (built in JS so the address is never raw in the HTML)
document.querySelectorAll('a[data-gmail]').forEach(function(a){
  var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
  a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
           '&su=' + (a.getAttribute('data-su') || '') +
           '&body=' + (a.getAttribute('data-body') || '');
  a.target = '_blank';
  a.rel = 'noopener';
});
