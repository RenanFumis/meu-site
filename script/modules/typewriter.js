// Módulo de Efeito de Digitação (Typewriter)
export class TypewriterManager {
  constructor() {
    this.typewriterTimeout = null;
    this.isTypewriterActive = false;
  }

  // Aplicar efeito de digitação
  applyTypewriterEffect(element, text) {
    // Cancelar animação anterior se existir
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }

    // Resetar estado ativo para permitir nova animação
    this.isTypewriterActive = false;

    // Limpar o elemento e remover classe typing
    element.innerHTML = "";
    element.classList.remove("typing");

    // Pequeno delay para garantir que a limpeza foi aplicada
    setTimeout(() => {
      this.isTypewriterActive = true;
      element.classList.add("typing");

      let i = 0;
      // Velocidade adaptativa baseada no tamanho da tela
      const isMobile = window.innerWidth <= 768;
      const speed = isMobile ? 80 : 60; // mais lento no mobile para melhor legibilidade

      const type = () => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          this.typewriterTimeout = setTimeout(type, speed);
        } else {
          // Remover a classe typing quando terminar
          this.typewriterTimeout = setTimeout(() => {
            element.classList.remove("typing");
            this.typewriterTimeout = null;
            this.isTypewriterActive = false;
          }, 1000);
        }
      };

      type();
    }, 50);
  }

  // Resetar o estado da animação
  resetTypewriterState() {
    if (this.typewriterTimeout) {
      clearTimeout(this.typewriterTimeout);
      this.typewriterTimeout = null;
    }
    this.isTypewriterActive = false;

    const heroDescription = document.querySelector(".hero-description");
    if (heroDescription) {
      heroDescription.classList.remove("typing");
    }
  }

  // Efeito de digitação simples (método alternativo)
  typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  // Verificar se a animação está ativa
  isActive() {
    return this.isTypewriterActive;
  }
}
