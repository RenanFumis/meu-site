// Módulo de Internacionalização (i18n)
export class I18nManager {
  constructor() {
    this.currentLanguage = "pt-BR";
    this.translations = {};
  }

  // Carregar idioma selecionado
  async loadLanguage(lang) {
    this.currentLanguage = lang;
    try {
      const response = await fetch(`/script/languages/${lang}.js`);
      const text = await response.text();

      // Executar o script de idioma
      eval(text);
      this.translations = window.translations || {};

      this.updateContent();
      this.updateLanguageButton();
    } catch (error) {
      console.error("Erro ao carregar idioma:", error);
    }
  }

  // Atualizar conteúdo da página
  updateContent() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (this.translations[key]) {
        // Se for o hero-description, aplicar efeito de digitação
        if (element.classList.contains("hero-description")) {
          window.typewriterManager.applyTypewriterEffect(
            element,
            this.translations[key]
          );
        } else {
          element.textContent = this.translations[key];
        }
      }
    });

    // Atualizar frase dinâmica
    window.dynamicPhrasesManager.exibirFraseAleatoria();
  }

  // Atualizar botão de idioma
  updateLanguageButton() {
    const langSwitcherNav = document.querySelector(".lang-switcher-nav");
    const langSwitcherDesktop = document.querySelector(
      ".lang-switcher-desktop"
    );
    const langOptions = document.querySelectorAll(".lang-option");

    if (langSwitcherNav) {
      langSwitcherNav.setAttribute("data-current", this.currentLanguage);
    }

    if (langSwitcherDesktop) {
      langSwitcherDesktop.setAttribute("data-current", this.currentLanguage);
    }

    langOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-lang") === this.currentLanguage) {
        option.classList.add("active");
      }
    });
  }

  // Configurar event listeners para botões de idioma
  setupLanguageButtons() {
    document
      .querySelectorAll(
        ".lang-switcher-nav .lang-option, .lang-switcher-desktop .lang-option"
      )
      .forEach((option) => {
        option.addEventListener("click", async () => {
          const lang = option.getAttribute("data-lang");
          await this.loadLanguage(lang);

          // Fechar menu hamburguer no mobile após selecionar idioma
          const hamburger = document.querySelector(".hamburger");
          const navMenu = document.querySelector(".nav-menu");
          if (hamburger && navMenu && window.innerWidth <= 768) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
          }
        });
      });
  }

  // Getter para idioma atual
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}
