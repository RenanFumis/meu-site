// Módulo Principal da Aplicação
import { DynamicPhrasesManager } from "./dynamicPhrases.js";
import { I18nManager } from "./i18n.js";
import { TypewriterManager } from "./typewriter.js";
import { UIManager } from "./ui.js";

export class App {
  constructor() {
    this.i18nManager = null;
    this.typewriterManager = null;
    this.dynamicPhrasesManager = null;
    this.uiManager = null;
  }

  // Inicializar aplicação
  async init() {
    try {
      // Inicializar todos os módulos
      this.i18nManager = new I18nManager();
      this.typewriterManager = new TypewriterManager();
      this.dynamicPhrasesManager = new DynamicPhrasesManager();
      this.uiManager = new UIManager();

      // Disponibilizar módulos globalmente para compatibilidade
      window.i18nManager = this.i18nManager;
      window.typewriterManager = this.typewriterManager;
      window.dynamicPhrasesManager = this.dynamicPhrasesManager;
      window.uiManager = this.uiManager;

      // Configurar botões de idioma
      this.i18nManager.setupLanguageButtons();

      // Carregar idioma padrão
      await this.i18nManager.loadLanguage("pt-BR");

      // Exibir frase aleatória inicial
      this.dynamicPhrasesManager.exibirFraseAleatoria();

      console.log("Aplicação inicializada com sucesso!");
    } catch (error) {
      console.error("Erro ao inicializar aplicação:", error);
    }
  }

  // Obter instância de um módulo específico
  getModule(moduleName) {
    switch (moduleName) {
      case "i18n":
        return this.i18nManager;
      case "typewriter":
        return this.typewriterManager;
      case "phrases":
        return this.dynamicPhrasesManager;
      case "ui":
        return this.uiManager;
      default:
        console.warn(`Módulo '${moduleName}' não encontrado`);
        return null;
    }
  }

  // Reinicializar módulo específico
  async reinitModule(moduleName) {
    const module = this.getModule(moduleName);
    if (module && typeof module.init === "function") {
      await module.init();
    }
  }

  // Destruir aplicação (cleanup)
  destroy() {
    // Limpar timeouts e observers
    if (this.typewriterManager) {
      this.typewriterManager.resetTypewriterState();
    }

    if (this.uiManager && this.uiManager.observer) {
      this.uiManager.observer.disconnect();
    }

    // Limpar referências globais
    window.i18nManager = null;
    window.typewriterManager = null;
    window.dynamicPhrasesManager = null;
    window.uiManager = null;

    console.log("Aplicação destruída");
  }
}
