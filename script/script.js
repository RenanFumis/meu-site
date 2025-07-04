// Array de frases dinâmicas
const frases = [
  "A resposta pra vida, o universo e tudo mais é... 42! - Guia do Mochileiro das Galáxias",
  "Ou você morre como um herói, ou vive o suficiente para se tornar o vilão. – Harvey Dent",
  "Você não entendeu, garoto. Esse não é um corpo. Isso é um instrumento. E eu sou o maestro. - Batman",
  "Nós estamos todos presos neste tempo, como insetos em âmbar. – Dr. Manhattan",
  "O mundo nunca muda por si só. Ele precisa de um empurrão. – Rorschach",
  "Que a Força esteja com você. – Star Wars",
  "Faça. Ou não faça. Tentativa não há. - Yoda",
  "Bazinga! – Sheldon Cooper",
  "A física pode te levar do ponto A ao ponto B, mas o que realmente importa é Star Trek. – Sheldon Cooper",
  "As lendas são escritas por aqueles que venceram a batalha! – Cavaleiros dos Zodiacos",
  "Mesmo que minha vida se apague, meu cosmo brilhará para sempre! – Seiya",
  "Este não é nem meu poder final! – Freeza",
  "Seu verme!. – Vegeta",
  "O destino não é algo que se espera, é algo que se conquista! – Yusuke Urameshi",
  "Lembre-se: um guerreiro não se define apenas por sua força, mas por seu coração. – Genkai",
  "Com grandes poderes vêm grandes responsabilidades. – Tio Ben",
  "Às vezes, ser o herói significa abrir mão do que mais queremos. – Peter Parker",
  "Temos que pegar! – Ash Ketchum",
  "Eu quero ser o melhor que ninguém jamais foi! - Pokémon",
];

// Função para selecionar uma frase aleatória
function selecionarFraseAleatoria() {
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
  return fraseAleatoria;
}

// Função para exibir a frase dinâmica
function exibirFraseDinamica() {
  const elementoFrase = document.getElementById("dynamic-text");
  console.log("Procurando elemento dynamic-text:", elementoFrase);

  if (elementoFrase) {
    const fraseSelecionada = selecionarFraseAleatoria();
    console.log("Frase selecionada:", fraseSelecionada);
    elementoFrase.textContent = fraseSelecionada;
    console.log("Frase aplicada com sucesso!");
  } else {
    console.error("Elemento dynamic-text não encontrado!");
    // Tenta novamente após um pequeno delay
    setTimeout(() => {
      const elementoRetry = document.getElementById("dynamic-text");
      if (elementoRetry) {
        const fraseSelecionada = selecionarFraseAleatoria();
        elementoRetry.textContent = fraseSelecionada;
        console.log("Frase aplicada na segunda tentativa!");
      }
    }, 100);
  }
}

// Função para garantir que a frase dinâmica seja exibida
function garantirFraseDinamica() {
  const elementoFrase = document.getElementById("dynamic-text");
  if (elementoFrase && !elementoFrase.textContent.trim()) {
    const fraseSelecionada = selecionarFraseAleatoria();
    elementoFrase.textContent = fraseSelecionada;
    console.log("Frase dinâmica garantida!");
  }
}

// Função para scroll suave
function scrollSuave(secao) {
  const elemento = document.querySelector(secao);
  if (elemento) {
    elemento.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Função para adicionar efeito de fade-in aos elementos
function adicionarEfeitoFadeIn() {
  const elementos = document.querySelectorAll(".skill-card, .projeto-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elementos.forEach((elemento) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(20px)";
    elemento.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(elemento);
  });
}

// Função para atualizar navegação ativa
function atualizarNavegacaoAtiva() {
  const secoes = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll("nav a");

  let secaoAtual = "";

  secoes.forEach((secao) => {
    const secaoTop = secao.offsetTop;
    const secaoAltura = secao.clientHeight;
    if (window.scrollY >= secaoTop - 200) {
      secaoAtual = secao.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("ativo");
    if (link.getAttribute("href") === `#${secaoAtual}`) {
      link.classList.add("ativo");
    }
  });
}

// Função para adicionar eventos de navegação
function adicionarEventosNavegacao() {
  const links = document.querySelectorAll('nav a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const secao = link.getAttribute("href");
      scrollSuave(secao);

      // Fecha o menu mobile se estiver aberto
      fecharMenuMobile();
    });
  });

  // Adiciona evento específico para o logo
  const logoLink = document.querySelector(".nav-brand a");
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      scrollSuave("#hero");

      // Fecha o menu mobile se estiver aberto
      fecharMenuMobile();
    });
  }
}

// Função para adicionar efeito de digitação no hero
function adicionarEfeitoDigitacao() {
  const heroDescription = document.querySelector(".hero-description");
  if (heroDescription) {
    const textoOriginal = heroDescription.textContent;
    heroDescription.textContent = "";

    let i = 0;
    const velocidade = 50; // milissegundos por caractere

    function digitar() {
      if (i < textoOriginal.length) {
        heroDescription.textContent += textoOriginal.charAt(i);
        i++;
        setTimeout(digitar, velocidade);
      }
    }

    // Inicia o efeito após um pequeno delay
    setTimeout(digitar, 1000);
  }
}

// Função para adicionar animação de contador nas habilidades
function animarContadores() {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "pulse 0.6s ease-in-out";
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(card);
  });
}

// Função para gerenciar o menu hambúrguer
function gerenciarMenuHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        fecharMenuMobile();
      }
    });

    // Fecha o menu ao redimensionar a tela
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        fecharMenuMobile();
      }
    });
  }
}

// Função para fechar o menu mobile
function fecharMenuMobile() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.style.overflow = "";
  }
}

// Função para adicionar efeito de parallax no hero
function adicionarParallaxHero() {
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Exibe a frase dinâmica
  exibirFraseDinamica();

  // Adiciona eventos de navegação
  adicionarEventosNavegacao();

  // Adiciona efeitos de fade-in
  adicionarEfeitoFadeIn();

  // Adiciona animação de contadores
  animarContadores();

  // Adiciona efeito de digitação no hero
  adicionarEfeitoDigitacao();

  // Adiciona gerenciamento do menu hambúrguer
  gerenciarMenuHamburger();

  // Adiciona efeito parallax no hero
  adicionarParallaxHero();

  // Adiciona listener para scroll
  window.addEventListener("scroll", atualizarNavegacaoAtiva);

  // Atualiza navegação na carga inicial
  atualizarNavegacaoAtiva();

  // Garante que a frase dinâmica seja exibida
  setTimeout(garantirFraseDinamica, 500);
});

// Também executa quando a página terminar de carregar
window.addEventListener("load", function () {
  garantirFraseDinamica();
});

// Adiciona CSS para animações
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  nav a.ativo {
    color: #F7F8E5 !important;
    font-weight: 600;
  }
  
  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(247, 248, 229, 0.3); }
    50% { box-shadow: 0 0 20px rgba(247, 248, 229, 0.6); }
    100% { box-shadow: 0 0 5px rgba(247, 248, 229, 0.3); }
  }
  
  .skill-card:hover,
  .projeto-card:hover {
    animation: glow 2s ease-in-out infinite;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .nav-menu.active {
    animation: slideIn 0.3s ease-out;
  }
`;
document.head.appendChild(style);
