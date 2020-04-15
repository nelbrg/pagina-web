function init() {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    "radial-gradient(#283760, #0B1023)",
    "radial-gradient(#4E3022, #161616)",
    "radial-gradient(#4E4342, #161616)",
  ];
  /* ESTOS SON LOS DEGRADADOS
      DE CADA PAGINA*/
  /**creamos un tracker para las paginas */
  let current = 0;
  /**para el scrolleo del mouse */
  let scrollSlide = 0;
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      changeDots(this); /** essta es para cambiar de color el punto */
      nextSlide(index); /**esta es para que cambie de persona */
      scrollSlide = index; //actualiza los contadores para que no se pierda entre clic y scroll
    });
  });
  /*esto es lo que activa el boton del menu*/
  function changeDots(dot) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }
  /**para el cambio de imagenes */
  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".hero .model-left");
    const currentLeft = currentPage.querySelector(".hero .model-left");
    const nextRight = nextPage.querySelector(".hero .model-right");
    const currentRight = currentPage.querySelector(".hero .model-right");
    const nextText = nextPage.querySelector(".details");
    const portofolio = document.querySelector(".portofolio");
    /** parte para el contador de tiempo */
    const tl = new TimelineMax({
      // Esto es para que no permita cambiar hasta que termine la animacion actual
      onStart: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function () {
        slides.forEach((slide) => {
          slide.style.pointerEvents = "all";
        });
      },
    });
    /**esto hace la animacion como tal */
    tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
      /**permite cambiar el color de fondo con cada clic */
      .to(portofolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
      /**genera un degradado para los cambios de pagina de color y el texto */
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      /**Cambia a la siguiente pagina y la muestra */
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=0.6"
      ) /**quita la imagen anterior */
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.6")
      .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.8")
      /**hace que el texto desaparezca primero y luego se muestre el siguien*/
      .fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
      /**Resetea propiedades para que el hover funcione (el desplazamiento de las imagenes) */
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });

    current = pageNumber; /**actualza el numero de pagina para que no se solapen las pags */
  }

  //OPTIONAL
  /**para que detecte el scroll del mouse y cambie las paginas automaticamente */
  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500)); //para que funcione en celulares

  // Funcion para cambiar de color los botones con el scroll
  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    activeDot.classList.add("active");
  }

  /**cambia la pagina 0,1,2 segun el scrolleo */

  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }

    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide); //para cambiar el boton
    nextSlide(scrollSlide); //funcion qu ehace el cambio, utiliza el numero de pagina cono input
    console.log(scrollSlide); //para que muestre por consolo f12-consola el numero en el que se encuentra
  }

  // Esta parte es para la animacion de la barra de navegacion
  const hamburger = document.querySelector(".menu");
  const hamburgerLines = document.querySelectorAll(".menu line");
  const navOpen = document.querySelector(".nav-open");
  const contact = document.querySelector(".contact");
  const social = document.querySelector(".social");
  const logo = document.querySelector(".logo");

  const tl = new TimelineMax({ paused: true, reversed: true });
  // Este es el codigo para las animaciones cuando se hace clic, de hasta (fromto)
  tl.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
    .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
    .fromTo(logo, 0.2, { color: "white" }, { color: "black" }, "-=1")
    .fromTo(
      hamburgerLines,
      0.2,
      { stroke: "white" },
      { stroke: "black" },
      "-=1" //el -=1 es el que hace el cambio inmediato
    );

  // Esta parte es el evento de clic en el menu para que se despliegue y contraiga
  hamburger.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse(); //el reverse permite contraer
  });
}

/**ESTA FUNCION SACADA DE INTERNET ES LA QUE PERMITE HACER LO DEL SCROLL */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
init();
