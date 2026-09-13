document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localToday;

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.textContent = open ? "×" : "☰";
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("booking-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const matter = document.getElementById("matter").value.trim();

  if (!name || !date || !time) return;

  const message =
`Hello Advocate Sharon Dhanaraj, I would like to request an in-person appointment.

Name: ${name}
Preferred date: ${date}
Preferred time: ${time}
Matter: ${matter || "Not provided"}

Please review and confirm the appointment.`;

  const url = "https://wa.me/919847388026?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");

  document.getElementById("status").textContent =
    "WhatsApp opened with your appointment request.";
});


// Premium interaction layer
(() => {
  const progress = document.getElementById("scroll-progress");
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  reveals.forEach(el => observer.observe(el));

  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX-r.left}px`);
      card.style.setProperty("--my", `${e.clientY-r.top}px`);
    });
  });

  const heroPhoto = document.querySelector(".hero-photo");
  const heroInner = document.querySelector(".hero-inner");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduced && heroPhoto && heroInner) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, window.innerHeight);
      heroPhoto.style.transform = `translateY(${y * 0.10}px) scale(1.025)`;
      heroInner.style.transform = `translateY(${y * 0.035}px)`;
    }, {passive:true});
  }
})();


// Signature interaction layer
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const cursor = document.getElementById('cursor-glow');

  const scrollFX = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 20);
    if (!reduce) {
      document.querySelectorAll('[data-parallax-section] .parallax-layer').forEach(layer => {
        const speed = parseFloat(layer.dataset.speed || '0');
        const section = layer.closest('.hero');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const offset = (window.innerHeight/2 - (rect.top + rect.height/2)) * speed;
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    }
  };
  window.addEventListener('scroll', scrollFX, {passive:true});
  scrollFX();

  if (!reduce && window.matchMedia('(pointer:fine)').matches && cursor) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }, {passive:true});
  }

  // Gentle 3D tilt, deliberately restrained for a professional feel.
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX-r.left)/r.width-.5;
        const y = (e.clientY-r.top)/r.height-.5;
        card.style.transform = `perspective(900px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-8px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform=''; });
    });
  }

  // Active section indicator in the desktop navigation.
  const links = [...document.querySelectorAll('.desktop-nav a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, {rootMargin:'-35% 0px -55% 0px', threshold:0});
  sections.forEach(s => sectionObserver.observe(s));

  // Lightweight animated network particles in the hero.
  const canvas = document.getElementById('hero-particles');
  if (!canvas || reduce) return;
  const ctx = canvas.getContext('2d');
  let w=0,h=0,dpr=1, particles=[], raf;
  const resize=()=>{
    const r=canvas.getBoundingClientRect(); dpr=Math.min(window.devicePixelRatio||1,2); w=r.width; h=r.height;
    canvas.width=w*dpr; canvas.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=Math.min(46, Math.max(18, Math.floor(w/30)));
    particles=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.4,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16}));
  };
  const draw=()=>{
    ctx.clearRect(0,0,w,h);
    for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(213,173,99,.65)';ctx.fill();}
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){
      const a=particles[i],b=particles[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
      if(dist<105){ctx.strokeStyle=`rgba(213,173,99,${(1-dist/105)*.18})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    }
    raf=requestAnimationFrame(draw);
  };
  resize(); window.addEventListener('resize',resize,{passive:true}); draw();
})();

// Cinematic signature motion: layered parallax, pointer depth, and a clean intro reveal.
(() => {
  const preloader = document.getElementById('preloader');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  const photo = document.querySelector('.hero-photo');
  const frame = document.querySelector('.hero-photo-frame');
  const scale = document.querySelector('.hero-scale-mark');
  const inner = document.querySelector('.hero-inner');
  let ticking = false;

  const finishIntro = () => {
    document.body.classList.add('intro-complete');
    preloader?.classList.add('loaded');
  };
  if (document.readyState === 'complete') setTimeout(finishIntro, 120);
  else window.addEventListener('load', () => setTimeout(finishIntro, 250), {once:true});

  if (!reduce && hero) {
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight/2 - (rect.top + rect.height/2)) / (window.innerHeight/1.2)));
      if (photo) photo.style.transform = `translate3d(0, ${progress * -34}px, 0) scale(${1.06 + Math.abs(progress)*.025})`;
      if (frame) frame.style.transform = `translate3d(0, ${progress * 20}px, 0) scale(${1 + Math.abs(progress)*.008})`;
      if (scale) scale.style.transform = `translate3d(0, calc(-50% + ${progress * 34}px), 0) rotate(${progress * 3}deg)`;
      if (inner) inner.style.transform = `translate3d(0, ${progress * 12}px, 0)`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, {passive:true});
    update();

    if (window.matchMedia('(pointer:fine)').matches) {
      window.addEventListener('pointermove', e => {
        const x = (e.clientX / window.innerWidth - .5);
        const y = (e.clientY / window.innerHeight - .5);
        if (photo) photo.style.marginLeft = `${x * -8}px`;
        if (frame) frame.style.marginLeft = `${x * 5}px`;
        if (scale) scale.style.marginLeft = `${x * 12}px`;
        if (inner) inner.style.marginLeft = `${x * 2}px`;
      }, {passive:true});
    }
  }
})();
