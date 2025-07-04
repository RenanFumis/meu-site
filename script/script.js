// Sistema de Internacionalização
let currentLanguage = "pt-BR";

// Função para carregar o idioma selecionado
function loadLanguage(lang) {
  currentLanguage = lang;
  fetch(`/script/languages/${lang}.js`)
    .then((response) => response.text())
    .then((text) => {
      // Executar o script de idioma
      eval(text);
      updateContent();
      updateLanguageButton();
    })
    .catch((error) => {
      console.error("Erro ao carregar idioma:", error);
    });
}

// Função para atualizar o conteúdo da página
function updateContent() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[key]) {
      // Se for o hero-description, aplicar efeito de digitação
      if (element.classList.contains("hero-description")) {
        applyTypewriterEffect(element, translations[key]);
      } else {
        element.textContent = translations[key];
      }
    }
  });

  // Atualizar frase dinâmica
  exibirFraseAleatoria();
}

// Função para aplicar efeito de digitação
function applyTypewriterEffect(element, text) {
  element.classList.add("typing");
  element.innerHTML = "";

  let i = 0;
  // Velocidade adaptativa baseada no tamanho da tela
  const isMobile = window.innerWidth <= 768;
  const speed = isMobile ? 80 : 60; // mais lento no mobile para melhor legibilidade

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remover a classe typing quando terminar
      setTimeout(() => {
        element.classList.remove("typing");
      }, 1000);
    }
  }

  type();
}

// Função para atualizar o botão de idioma
function updateLanguageButton() {
  const langSwitcherNav = document.querySelector(".lang-switcher-nav");
  const langSwitcherDesktop = document.querySelector(".lang-switcher-desktop");
  const langOptions = document.querySelectorAll(".lang-option");

  if (langSwitcherNav) {
    langSwitcherNav.setAttribute("data-current", currentLanguage);
  }

  if (langSwitcherDesktop) {
    langSwitcherDesktop.setAttribute("data-current", currentLanguage);
  }

  langOptions.forEach((option) => {
    option.classList.remove("active");
    if (option.getAttribute("data-lang") === currentLanguage) {
      option.classList.add("active");
    }
  });
}

// Inicializar sistema de idiomas
document.addEventListener("DOMContentLoaded", function () {
  // Carregar idioma padrão
  loadLanguage("pt-BR");

  // Configurar botões de idioma do menu e desktop
  document
    .querySelectorAll(
      ".lang-switcher-nav .lang-option, .lang-switcher-desktop .lang-option"
    )
    .forEach((option) => {
      option.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang");
        loadLanguage(lang);

        // Fechar menu hamburguer no mobile após selecionar idioma
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        if (hamburger && navMenu && window.innerWidth <= 768) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        }
      });
    });
});

// Frases dinâmicas por idioma
const frasesPorIdioma = {
  "pt-BR": [
    "Que a força esteja com você! — Star Wars",
    "Vida longa e próspera! — Spock",
    "Bazinga! — Sheldon Cooper",
    "A resposta pra vida, o universo e tudo mais é... 42! — Guia do Mochileiro das Galáxias",
    "Com grandes poderes vêm grandes responsabilidades. — Tio Ben",
    "Eu sou o Batman! — Batman",
    "Eu sou Groot! — Groot",
    "Faça. Ou não faça. Tentativa não há. — Yoda",
    "Winter is coming! — Game of Thrones",
    "Wakanda para sempre! — Pantera Negra",
  ],
  "en-US": [
    "May the Force be with you! — Star Wars",
    "Live long and prosper! — Spock",
    "Bazinga! — Sheldon Cooper",
    "The answer to life, the universe and everything is... 42! — Hitchhiker's Guide to the Galaxy",
    "With great power comes great responsibility. — Uncle Ben",
    "I'm Batman! — Batman",
    "I am Groot! — Groot",
    "Do. Or do not. There is no try. — Yoda",
    "Winter is coming! — Game of Thrones",
    "Wakanda forever! — Black Panther",
  ],
  "he-IL": [
    "שהכוח יהיה איתך! — מלחמת הכוכבים",
    "חיים ארוכים ומשגשגים! — ספוק",
    "באזינגה! — שלדון קופר",
    "התשובה לחיים, היקום והכל היא... 42! — מדריך הטרמפיסט לגלקסיה",
    "עם כוח גדול באה אחריות גדולה. — הדוד בן",
    "אני באטמן! — באטמן",
    "אני גרוט! — גרוט",
    "עשה. או אל תעשה. אין לנסות. — יודה",
    "החורף מגיע! — משחקי הכס",
    "וקאנדה לנצח! — הפנתר השחור",
  ],
};

function exibirFraseAleatoria() {
  const fraseElement = document.getElementById("dynamic-text");
  if (fraseElement && frasesPorIdioma[currentLanguage]) {
    const frases = frasesPorIdioma[currentLanguage];
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    fraseElement.textContent = fraseAleatoria;
  }
}

// Efeito de digitação
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Smooth scrolling para links internos
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calcular offset para compensar o header fixo
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px de margem extra

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }

      // Fechar menu hamburguer no mobile após clicar em qualquer link
      const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");
      if (hamburger && navMenu && window.innerWidth <= 768) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Menu hamburger
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav ul");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Efeito de fade-in para seções
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Exibir frase aleatória na seção dinâmica
  exibirFraseAleatoria();
});
