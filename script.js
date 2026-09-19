/*
  ============================================================
  ÁREA DE CONFIGURAÇÃO
  Edite somente os dados dentro de "portfolioData".
  O layout não precisa ser alterado.
  ============================================================
*/

const portfolioData = {
  name: "[SEU NOME]",
  role: "[SEU CARGO / ÁREA PROFISSIONAL]",
  bio: "Profissional em desenvolvimento, com experiência em diferentes áreas e interesse em continuar aprendendo, desenvolver novas habilidades e contribuir com equipes e empresas.",
  about: "[EDITAR] Escreva aqui uma apresentação profissional sobre você, sua trajetória, seus interesses e o que busca para sua carreira.",
  goals: "[EDITAR] Escreva aqui seus objetivos profissionais e as áreas nas quais deseja continuar crescendo.",

  stats: [
    { value: "2", label: "anos de experiência" },
    { value: "1", label: "empresa com experiência" },
    { value: "[X]", label: "cursos" },
    { value: "[X]", label: "habilidades" }
  ],

  links: {
    linkedin: "https://www.linkedin.com/",
    whatsapp: "https://wa.me/55SEUNUMERO",
    email: "mailto:SEUEMAIL@EMAIL.COM",
    github: ""
  },

  experiences: [
    {
      company: "Celesc",
      role: "Jovem Aprendiz",
      period: "2 anos",
      location: "[EDITAR LOCAL]",
      description: "Experiência profissional de 2 anos, com atuação em diferentes setores da empresa.",
      activities: [
        "Atuação no Almoxarifado durante o primeiro ano.",
        "Atuação na Administração Central durante o segundo ano.",
        "[EDITAR] Adicione aqui atividades específicas que você realmente realizou."
      ],
      skills: ["Organização", "Trabalho em equipe", "Comunicação", "Rotinas administrativas", "Responsabilidade profissional"]
    }
    /*
    Para adicionar outra experiência, copie o bloco acima e altere os dados.
    */
  ],

  professionalSkills: [
    "Organização",
    "Comunicação",
    "Trabalho em equipe",
    "Responsabilidade",
    "Proatividade",
    "Atendimento",
    "Rotinas administrativas"
  ],

  technicalSkills: [
    "[EDITAR] Conhecimento técnico",
    "[EDITAR] Ferramenta / software",
    "[EDITAR] Outra habilidade"
  ],

  courses: [
    /*
    Exemplo:
    {
      category: "Tecnologia",
      title: "Nome do curso",
      institution: "Instituição",
      year: "2026",
      hours: "20h",
      description: "Descrição curta.",
      certificate: "certificados/curso.pdf"
    }
    */
  ],

  education: [
    {
      title: "[EDITAR] Ensino / Curso",
      institution: "[EDITAR] Instituição",
      period: "[EDITAR] Período",
      status: "[EDITAR] Concluído / Em andamento",
      icon: "✦"
    }
  ],

  projects: [
    {
      title: "Portfólio profissional",
      description: "Meu próprio portfólio online, desenvolvido para apresentar minha trajetória profissional, habilidades e projetos.",
      technologies: ["HTML", "CSS", "JavaScript"],
      image: "",
      link: "#inicio",
      github: ""
    },
    {
      title: "[EDITAR] Projeto",
      description: "[EDITAR] Descrição do projeto.",
      technologies: ["[TECNOLOGIA]"],
      image: "",
      link: "",
      github: ""
    }
  ],

  milestones: [
    { year: "[ANO]", title: "Primeira experiência", text: "[EDITAR] Descreva este momento." },
    { year: "[ANO]", title: "Experiência profissional", text: "Início da trajetória profissional." },
    { year: "[ANO]", title: "Novo setor", text: "[EDITAR] Descreva a mudança ou aprendizado." },
    { year: "[ANO]", title: "Novo conhecimento", text: "[EDITAR] Curso, projeto ou habilidade." },
    { year: "Próximo", title: "Próximo objetivo", text: "[EDITAR] Onde você quer chegar." }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function safeUrl(url) {
  return url && url.trim() ? url : "";
}

function renderSocials() {
  const container = $("#heroSocials");
  const labels = { linkedin: "LinkedIn", whatsapp: "WhatsApp", email: "E-mail", github: "GitHub" };
  container.innerHTML = Object.entries(portfolioData.links)
    .filter(([, url]) => safeUrl(url))
    .map(([key, url]) => `<a href="${url}" ${key !== "email" ? 'target="_blank" rel="noopener noreferrer"' : ""}>${labels[key]}</a>`)
    .join("");
}

function renderStats() {
  $("#stats").innerHTML = portfolioData.stats.map(s =>
    `<div class="stat"><strong>${s.value}</strong><span>${s.label}</span></div>`
  ).join("");
}

function renderExperiences() {
  $("#experienceTimeline").innerHTML = portfolioData.experiences.map((exp, i) => `
    <article class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="experience-card">
        <div class="experience-summary" data-exp="${i}">
          <div>
            <h3>${exp.role} — ${exp.company}</h3>
            <div class="meta">${exp.period} · ${exp.location}</div>
          </div>
          <div class="expand">+</div>
        </div>
        <div class="experience-details">
          <div class="experience-inner">
            <p>${exp.description}</p>
            <h4>Principais atividades</h4>
            <ul class="list">${exp.activities.map(a => `<li>${a}</li>`).join("")}</ul>
            <h4>Habilidades desenvolvidas</h4>
            <div class="chips">${exp.skills.map(s => `<span class="chip">${s}</span>`).join("")}</div>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  $$(".experience-summary").forEach(summary => {
    summary.addEventListener("click", () => {
      const card = summary.closest(".experience-card");
      const details = $(".experience-details", card);
      const icon = $(".expand", card);
      const open = card.classList.toggle("open");
      details.style.maxHeight = open ? details.scrollHeight + "px" : "0px";
      icon.textContent = open ? "−" : "+";
    });
  });
}

function renderSkills() {
  $("#professionalSkills").innerHTML = portfolioData.professionalSkills.map(s => `<span class="skill-tag">${s}</span>`).join("");
  $("#technicalSkills").innerHTML = portfolioData.technicalSkills.map(s => `<span class="skill-tag">${s}</span>`).join("");
}

let activeCourseFilter = "Todos";

function renderCourses() {
  const categories = ["Todos", ...new Set(portfolioData.courses.map(c => c.category))];
  $("#courseFilters").innerHTML = categories.map(c =>
    `<button class="filter-btn ${c === activeCourseFilter ? "active" : ""}" data-filter="${c}">${c}</button>`
  ).join("");

  const filtered = activeCourseFilter === "Todos"
    ? portfolioData.courses
    : portfolioData.courses.filter(c => c.category === activeCourseFilter);

  $("#coursesGrid").innerHTML = filtered.length
    ? filtered.map((c, i) => `
      <article class="course-card reveal">
        <div class="card-body">
          <span class="card-kicker">${c.category}</span>
          <h3 class="card-title">${c.title}</h3>
          <p class="card-text">${c.institution} · ${c.year} · ${c.hours}</p>
          <p class="card-text" style="margin-top:10px">${c.description}</p>
          <div class="card-actions">
            ${safeUrl(c.certificate) ? `<a class="text-btn" href="${c.certificate}" target="_blank" rel="noopener noreferrer">Ver certificado ↗</a>` : `<button class="text-btn" data-course="${i}">Detalhes</button>`}
          </div>
        </div>
      </article>
    `).join("")
    : `<div class="glass" style="padding:28px;grid-column:1/-1;color:var(--muted)">[EDITAR] Adicione seus cursos no objeto <strong>courses</strong> do arquivo script.js.</div>`;

  $$(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
    activeCourseFilter = btn.dataset.filter;
    renderCourses();
    observeReveals();
  }));
}

function renderEducation() {
  $("#educationGrid").innerHTML = portfolioData.education.map(e => `
    <article class="education-card reveal">
      <div class="education-icon">${e.icon}</div>
      <p class="card-kicker">Formação</p>
      <h3 class="card-title">${e.title}</h3>
      <p class="card-text">${e.institution}</p>
      <p class="card-text">${e.period} · ${e.status}</p>
    </article>
  `).join("");
}

function renderProjects() {
  $("#projectsGrid").innerHTML = portfolioData.projects.map(p => `
    <article class="project-card reveal">
      <div class="project-thumb">
        ${safeUrl(p.image) ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : `<div class="project-placeholder">&lt;/&gt;</div>`}
      </div>
      <div class="card-body">
        <span class="card-kicker">Projeto</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-text">${p.description}</p>
        <div class="chips">${p.technologies.map(t => `<span class="chip">${t}</span>`).join("")}</div>
        <div class="card-actions">
          ${safeUrl(p.link) ? `<a class="text-btn" href="${p.link}" target="_blank" rel="noopener noreferrer">Ver projeto ↗</a>` : ""}
          ${safeUrl(p.github) ? `<a class="text-btn" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>` : ""}
        </div>
      </div>
    </article>
  `).join("");
}

function renderMilestones() {
  $("#milestones").innerHTML = portfolioData.milestones.map(m => `
    <article class="milestone reveal">
      <span class="year">${m.year}</span>
      <h3>${m.title}</h3>
      <p>${m.text}</p>
    </article>
  `).join("");
}

function renderContacts() {
  const items = [
    ["WhatsApp", portfolioData.links.whatsapp],
    ["E-mail", portfolioData.links.email],
    ["LinkedIn", portfolioData.links.linkedin],
    ["GitHub", portfolioData.links.github]
  ].filter(([, url]) => safeUrl(url));

  $("#contactLinks").innerHTML = items.map(([label, url]) =>
    `<a class="contact-link" href="${url}" ${url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener noreferrer"'}>${label} ↗</a>`
  ).join("");

  $("#footerLinks").innerHTML = items.map(([label, url]) =>
    `<a href="${url}" ${url.startsWith("mailto:") ? "" : 'target="_blank" rel="noopener noreferrer'}">${label}</a>`
  ).join("");
}

function openModal(title, content, label = "Detalhes") {
  $("#modalTitle").textContent = title;
  $("#modalLabel").textContent = label;
  $("#modalContent").innerHTML = content;
  $("#modal").classList.add("open");
  $("#modal").setAttribute("aria-hidden", "false");
}

function closeModal() {
  $("#modal").classList.remove("open");
  $("#modal").setAttribute("aria-hidden", "true");
}

$$("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function observeReveals() {
  const items = $$(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach(el => observer.observe(el));
}

function setupNavigation() {
  const toggle = $("#menuToggle");
  const nav = $("#nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  const sections = $$("main section[id]");
  const navLinks = $$("#nav a");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(s => sectionObserver.observe(s));
}

function setupBackTop() {
  const btn = $("#backTop");
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 500), { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function setupCursorGlow() {
  const glow = $(".cursor-glow");
  if (!glow) return;
  window.addEventListener("pointermove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  }, { passive: true });
}

function applyData() {
  document.title = `${portfolioData.name} | Portfólio Profissional`;
  $("#brandName").textContent = portfolioData.name;
  $("#heroName").textContent = portfolioData.name;
  $("#heroRole").textContent = portfolioData.role;
  $("#heroBio").textContent = portfolioData.bio;
  $("#aboutText").textContent = portfolioData.about;
  $("#goalsText").textContent = portfolioData.goals;
  $("#footerName").textContent = portfolioData.name;
  $("#footerName2").textContent = portfolioData.name;
  $("#year").textContent = new Date().getFullYear();

  renderSocials();
  renderStats();
  renderExperiences();
  renderSkills();
  renderCourses();
  renderEducation();
  renderProjects();
  renderMilestones();
  renderContacts();
}

applyData();
setupNavigation();
setupBackTop();
setupCursorGlow();
observeReveals();
