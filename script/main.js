// Arquivo Principal - Sistema Modular
import { App } from "./modules/app.js";

// Instância global da aplicação
let app = null;

// Inicializar aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", async function () {
  try {
    app = new App();
    await app.init();
  } catch (error) {
    console.error("Erro ao inicializar aplicação:", error);
  }
});

// Disponibilizar aplicação globalmente para debugging
window.app = app;
