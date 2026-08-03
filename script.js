// ── Text ────────────────────────────────────────────────────────────────────
const ENGLISH_DISPLAY ="I'm Ntokozo Nkala\n<Software Engineer/>\nAn Engineer that integrates\ncreativity, passion, knowledge,\nskill and curiosity for problem solving\nand real world projects.";

// Binary is generated from the flat version (no newlines shown in binary)
const ENGLISH_FOR_BINARY = "I'm Ntokozo Nkala. Software Engineer. Front-end Developer";

function toBinary(str) {
  return str
    .split("")
    .map(ch => ch.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}

const BINARY  = toBinary(ENGLISH_FOR_BINARY);

// ── State ────────────────────────────────────────────────────────────────────
let showingBinary = true;
let typingTimer   = null;
let stopFlag      = false;

// ── DOM ──────────────────────────────────────────────────────────────────────
const output    = document.getElementById("codeOutput");
const cursor    = document.getElementById("cursor");
const area      = document.querySelector(".binary-area");
const toggleBtn = document.getElementById("toggleBtn");

// ── Typewriter ────────────────────────────────────────────────────────────────
function typeWrite(text, speed) {
  return new Promise(resolve => {
    output.textContent = "";
    stopFlag = false;
    area.classList.add("typing");

    let i = 0;
    function tick() {
      if (stopFlag) { area.classList.remove("typing"); resolve(); return; }
      if (i < text.length) {
        output.textContent += text[i++];
        typingTimer = setTimeout(tick, speed);
      } 
    }
    tick();
  });
}

function cancelTyping() {
  stopFlag = true;
  clearTimeout(typingTimer);
  area.classList.remove("typing");
}

// ── Toggle 
toggleBtn.addEventListener("click", async () => {
  cancelTyping();
  await new Promise(r => setTimeout(r, 20)); // let tick exit

  showingBinary = !showingBinary;

  if (showingBinary) {
    area.classList.remove("english-mode");
    await typeWrite(BINARY, 20);
  } else {
    area.classList.add("english-mode");
    await typeWrite(ENGLISH_DISPLAY, 60);
  }
});

// ── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    area.classList.remove("english-mode");
  typeWrite(BINARY, 9);
});

// ── Glass nav scroll ──────────────────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// ── Hamburger ────────────────────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});

navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    document.body.style.overflow = "";
  });
});

document.addEventListener("click", e => {
  if (navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    document.body.style.overflow = "";
  }
});

const eduToggle = document.getElementById("eduToggle");
const extraEdu = document.querySelector(".extra-edu");

eduToggle.addEventListener("click", () => {
  extraEdu.classList.toggle("hidden");
  eduToggle.textContent = extraEdu.classList.contains("hidden")
    ? "Read More"
    : "Read Less";
});


(function () {
  const SKILLS = [
    { 
      name:"HTML",       
      category:"MARKUP",     
      proficiency:98, 
      description:"Semantic markup, accessibility standards, SEO structure, and web standards compliance.", 
      stack:["HTML5","Semantic","Accessibility"] 
    },
    { 
      name:"CSS",        
      category:"STYLING",    
      proficiency:95, 
      description:"Responsive layouts, animations, custom properties, Flexbox and Grid mastery.", 
      stack:["CSS3","Flexbox","Grid"] 
    },
    { 
      name:"JAVASCRIPT", 
      category:"LANGUAGE",   
      proficiency:93,
       description:"DOM manipulation, async/await, ES6+ features, functional and OOP patterns.", 
       stack:["ES2024","DOM","Async/Await"] 
      },
    { 
      name:"REACT",      
      category:"FRAMEWORK",  
      proficiency:90, 
      description:"Component-driven UI architecture, hooks, context, and performance optimization.", 
      stack:["Hooks","Context","JSX"] 
    },
    { 
      name:"BOOTSTRAP",  
      category:"UI LIBRARY", 
      proficiency:96, 
      description:"Rapid UI prototyping with responsive grid systems, components, and utility classes.", 
      stack:["Grid","Components","Responsive"] 
    },
    { 
      name:"ANGULAR",    
      category:"FRAMEWORK",  
      proficiency:85,
       description:"Full-featured SPA framework with TypeScript, dependency injection, and RxJS.", 
       stack:["TypeScript","RxJS","NgModules"] 
      },
    { name:"JAVA",       
      category:"LANGUAGE",   
      proficiency:88, 
      description:"Object-oriented design, data structures, algorithms, and backend application development.", 
      stack:["OOP","Spring","JVM"] 
    },
    { name:"C",          
      category:"LANGUAGE",   
      proficiency:82, 
      description:"Low-level programming, memory management, pointers, and systems-level development.", 
      stack:["Pointers","Memory","Systems"] 
    }
  ];
 
  function buildLines(s) {
    const cat = s.category[0] + s.category.slice(1).toLowerCase();
    return [
      `<span class="j-cursor">></span> {`,
      `&nbsp; <span class="j-key">"engineer"</span>: "Ntokozo M. Nkala",`,
      `&nbsp; <span class="j-key">"skill"</span>: "",<span class="j-skillname">${s.name}</span>""`,
      `&nbsp; <span class="j-key">"category"</span>: "${cat}",`,
      `&nbsp; <span class="j-key">"proficiency"</span>: ,<span class="j-num">${s.proficiency}</span>`,
      `&nbsp; <span class="j-key">"description"</span>: <span class="j-desc">"${s.description}"</span>,`,
      `&nbsp; <span class="j-key">"stack"</span>: <span class="j-arr">[</span>`,
      ...s.stack.map((t, i) => `&nbsp;&nbsp;&nbsp; <span class="j-item">"${t}"</span>${i < s.stack.length - 1 ? ',' : ''}`),
      `&nbsp; <span class="j-arr">]</span>`,
      `}`
    ];
  }
 
  function renderJSON(skill) {
    document.getElementById('skJson').innerHTML = buildLines(skill)
      .map((l, i) => `<div class="sk-jline" style="animation-delay:${i * 26}ms">${l}</div>`)
      .join('');
  }
 
  function updateBar(val) {
    document.getElementById('skProfFill').style.width = val + '%';
    document.getElementById('skProfVal').textContent  = val + '%';
  }
 
  function select(idx) {
    document.querySelectorAll('.sk-card').forEach((c, i) =>
      c.classList.toggle('active', i === idx)
    );
    renderJSON(SKILLS[idx]);
    updateBar(SKILLS[idx].proficiency);
  }
 
  const grid = document.getElementById('skGrid');
  SKILLS.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'sk-card' + (i === 0 ? ' active' : '');
    card.innerHTML = `
      <div class="card-dot"></div>
      <span class="card-cat">${s.category}</span>
      <span class="card-name">${s.name}</span>
    `;
    card.addEventListener('click', () => select(i));
    grid.appendChild(card);
  });
 
  renderJSON(SKILLS[0]);
  updateBar(SKILLS[0].proficiency);
})();