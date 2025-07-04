// Módulo de Interface do Usuário (UI)
export class UIManager {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupHamburgerMenu();
    this.setupIntersectionObserver();
    this.setupInitialAnimations();
  }

  // Configurar smooth scrolling para links internos
  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Calcular offset para compensar o header fixo
          const headerHeight =
            document.querySelector("header")?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px de margem extra

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }

        // Fechar menu hamburguer no mobile após clicar em qualquer link
        this.closeHamburgerMenu();
      });
    });
  }

  // Configurar menu hamburger
  setupHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav ul");

    if (hamburger && nav) {
      hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
        hamburger.classList.toggle("active");
      });
    }
  }

  // Fechar menu hamburger
  closeHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if (hamburger && navMenu && window.innerWidth <= 768) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  }

  // Configurar Intersection Observer para animações
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  // Configurar animações iniciais
  setupInitialAnimations() {
    // Aplicar fade-in na seção hero imediatamente
    const hero = document.querySelector(".hero");
    if (hero) {
      setTimeout(() => {
        hero.classList.add("fade-in");
      }, 100);
    }

    // Aplicar fade-in na frase dinâmica
    const fraseDinamica = document.querySelector(".frase-dinamica");
    if (fraseDinamica) {
      setTimeout(() => {
        fraseDinamica.classList.add("fade-in");
      }, 200);
    }
  }

  // Adicionar elemento para observação
  observeElement(element) {
    if (this.observer) {
      this.observer.observe(element);
    }
  }

  // Remover elemento da observação
  unobserveElement(element) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  // Aplicar fade-in manualmente
  applyFadeIn(element) {
    if (element) {
      element.classList.add("fade-in");
    }
  }

  // Remover fade-in
  removeFadeIn(element) {
    if (element) {
      element.classList.remove("fade-in");
    }
  }

  // Verificar se elemento está visível
  isElementVisible(element) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
