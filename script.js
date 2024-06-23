// Récupération des différents éléments
const titleItem = document.querySelector(".title");
const timeItem = document.querySelector(".actions .text-secondary");
const heroItem = document.querySelector("#hero");
const sliderControler = document.querySelector(".slider__controler");
const menuBtn = document.querySelector(".menu__toggle");
const mobileNav = document.getElementsByClassName("nav__menu")[0];
const navLinks = [...document.querySelectorAll(".nav__link")];

// Création de la variable slides qui va stocker les slides
let slides = [
  {
    title: "Méduse exotique",
    image: "img/slide-1.png",
    time: "60 min",
    thumb: {
      number: "01",
      title: "Méduse exotique",
      subtitle: "TOUS LES MARDIS | 18H",
    },
  },
  {
    title: "Plongée en haute mer",
    image: "img/slide-2.png",
    time: "90 min",
    thumb: {
      number: "02",
      title: "Plongée en haute mer",
      subtitle: "TOUS LES VENDREDIS | 20H",
    },
  },
  {
    title: "En pleine jungle",
    image: "img/slide-3.png",
    time: "60 min",
    thumb: {
      number: "03",
      title: "En pleine jungle",
      subtitle: "LE 23 NOVEMBRE | 18H",
    },
  },
];
// Création de la variable currentIndex
let currentIndex = 0;

slides.forEach((slide, index) => {
  let { thumb } = slide;
  // Création d'un élément HTML div
  const thumbItem = document.createElement("div");
  thumbItem.classList.add("slider__thumb");
  if (index === 0) {
    thumbItem.classList.add("active");
  }
  // Mise en place de la structure HTML
  thumbItem.innerHTML = `
    <div class="slider__thumb--left">
              <h2>${thumb.number}</h2>
            </div>
            <div class="slider__thumb--right">
              <h3 class="thumb__title">${thumb.title}</h3>
              <h4 class="thumb__subtitle">${thumb.subtitle}</h4>
    </div>
    `;
  thumbItem.id = `thumb-${thumb.number}`;
  // Ajout de la div créée dans le DOM
  sliderControler.appendChild(thumbItem);
});

// Récupération de la div ayant la classee slider__thumb
const thumbs = document.querySelectorAll(".slider__thumb");
// Création de la variable animationInterval et de la constante interval
let animationInterval;
const interval = 6000; // 6s

// Déclaration de la fonction updateSlide ayant comme paramètre index qui va permttre de mettre à jour le slider
const updateSlide = (index) => {
  let { title, time, image, thumb } = slides[index];
  titleItem.textContent = title;
  timeItem.textContent = time;
  heroItem.style.transition = "background 0.5s ease-in-out";
  heroItem.style.background = `url("${image}") no-repeat top/cover`;
  //heroItem.offsetHeight;
  thumbs.forEach((thumb) => {
    thumb.classList.remove("active");
  });
  document.getElementById(`thumb-${thumb.number}`).classList.add("active");
  currentIndex = index;
};

// Déclaration de la fonction startAnimation qui va permettre de mettre en place l'animation autoplay
const startAnimation = () => {
  // La méthode setInterval() appelle à plusieurs reprises une fonction ou exécute un extrait de code, avec un délai fixe entre chaque appel.
  // Cette méthode renvoie un ID d'intervalle qui identifie de manière unique l'intervalle
  animationInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    // Appel de la fonction updateSlides
    updateSlide(currentIndex);
  }, interval);
};

// Appel de la fonction startAnimation
startAnimation();

// Déclaration de la fonction stopAnimation qui va permettre de stopper l'animation autoplay
const stopAnimation = () => {
  // Suppression de l'intervalle
  clearInterval(animationInterval);
};

thumbs.forEach((thumb, index) => {
  // Ecoute de l'événement "click"
  thumb.addEventListener("click", () => {
    // Appel de la fonction stopAnimation
    stopAnimation();
    // Appel de la fonction updateSlide ayant comme paramètre index
    updateSlide(index);

    setTimeout(() => {
      // Appel de la fonction stoptAnimation
      stopAnimation();
      // Appel de la fonction startAnimation
      startAnimation();
    }, 500);
  });
});

// Déclaration de la fonction toggleNav pour activer /désactiver la navigation mobile
const toggleNav = () => {
  mobileNav.classList.toggle("active");
};

// Ecoute de l'événement click sur le menu burger et appel de la fonction toggleNav
menuBtn.addEventListener("click", toggleNav);

navLinks.forEach((nav) =>
  // Ecoute de l'événement click
  nav.addEventListener("click", (e) => {
    // Évite que l'évènement courant ne se propage plus loin dans les phases de capture et de déploiement.
    e.stopPropagation();
    // Apeel de la fonction toggleNav
    toggleNav();
  })
);
