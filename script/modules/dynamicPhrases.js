// Módulo de Frases Dinâmicas
export class DynamicPhrasesManager {
  constructor() {
    this.frasesPorIdioma = {
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
  }

  // Exibir frase aleatória
  exibirFraseAleatoria() {
    const fraseElement = document.getElementById("dynamic-text");
    if (fraseElement) {
      const currentLanguage =
        window.i18nManager?.getCurrentLanguage() || "pt-BR";
      const frases = this.frasesPorIdioma[currentLanguage];

      if (frases && frases.length > 0) {
        const fraseAleatoria =
          frases[Math.floor(Math.random() * frases.length)];
        fraseElement.textContent = fraseAleatoria;
      }
    }
  }

  // Adicionar nova frase para um idioma específico
  addPhrase(language, phrase) {
    if (!this.frasesPorIdioma[language]) {
      this.frasesPorIdioma[language] = [];
    }
    this.frasesPorIdioma[language].push(phrase);
  }

  // Remover frase específica
  removePhrase(language, phrase) {
    if (this.frasesPorIdioma[language]) {
      const index = this.frasesPorIdioma[language].indexOf(phrase);
      if (index > -1) {
        this.frasesPorIdioma[language].splice(index, 1);
      }
    }
  }

  // Obter todas as frases de um idioma
  getPhrases(language) {
    return this.frasesPorIdioma[language] || [];
  }

  // Obter número total de frases por idioma
  getPhraseCount(language) {
    return this.frasesPorIdioma[language]?.length || 0;
  }
}
