`use strict`

const local = navigator.language;

const optionsDate = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
}


const navAllBtn = document.querySelectorAll(".nav__list-item-btn");
const navListUl = document.querySelector(".nav__list");
const navListItem = document.querySelector(".nav__list-item-btn");
const AllblockContent = document.querySelectorAll(".main__block");

// Кнопка посмотреть гарантии , находится в блоке about
const AllbtnAboutWarranty = document.querySelectorAll(".about__warranty-btn");

// После загрузки страницы

document.addEventListener("DOMContentLoaded", function (e) {

function showCardsPractics () {
  const containerCardsPractic = document.querySelector(".wrapper-cards-practice");
  containerCardsPractic.addEventListener("click", function (e) {
    e.preventDefault();
    const card = e.target.closest(".template-card");
    const cardPreview = e.target.closest(".fullscreen-preview"); 

    if(e.target === document.querySelector(".template-card__button")) {
      
      document.querySelector(`.fullscreen-preview-${card.dataset.prof}`).classList.add("fullscreen-preview-active");
    }

    if(e.target === document.querySelector(".fullscreen-preview__close")) {
      
      cardPreview.classList.remove("fullscreen-preview-active");
    }

    if(e.target === cardPreview) {
      cardPreview.classList.remove("fullscreen-preview-active");
    }


  })
}

showCardsPractics();

    
      // При загрузке проверяем, удалялся ли блок бегущей строки, если да, то удаляем снова
  // if (localStorage.getItem("deleteMarquee") === "true") {
  //   const marquee = document.querySelector('.marquee');
  //   marquee.remove();
  // }

    // При загрузке проверяем, удалялся ли блок о скидке, если да, то удаляем снова
  // if (localStorage.getItem("deledePromoDiscound") === "true") {
  //   const promoDiscount = document.querySelector('.promo__discount');
  //   promoDiscount.remove();
  // }
    
// function scrollToAdvantages () {
//     const aboutAdvantagesBtn = document.querySelector(".about__advantages-btn");
//     const blockaYourAdvantages = document.querySelector(".about__your-advantages");

//     aboutAdvantagesBtn.addEventListener("click", function (e) {
//       e.preventDefault();

//       blockaYourAdvantages.scrollIntoView({behavior: "smooth"});
//     });


//   }

//   scrollToAdvantages();


// -------------Начало логики открытия блоков-разделов!

    const hash = window.location.hash.replace('#', '');
    const initialBlock = hash || 'conditions'; // если хеша нет — показываем "conditions"
    openBlock(initialBlock);

      // Подгрузка стилей в html для блоков 
    function loadStyle(fileName) {
    // Тут кроется проблема, по условию у меня нет такого файла, потому что я наяал ставить версию , а в условии версии нет
    // поэтому стили подгружались со страки link.href = `css/${fileName}.css?v=30`; - до этого там было цыфра 3, подгругружалась 3 версия тсилей
      if(document.querySelector(`link[href="css/${fileName}.css"]`)) return ;

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `css/${fileName}.css?v=36`;
      document.head.appendChild(link);

    }

    function activeListItem (item) {

      navAllBtn.forEach(function (btn) {
        btn.classList.remove("nav__list-item-btn-active");
      });

      document.querySelector(`[data-block="${item}"]`).classList.add("nav__list-item-btn-active");
    }

  // Открытие нужного блока
    // function openBlock (block) {
    //     const promoDiscount = document.querySelector(".promo__discount");

    //     AllblockContent.forEach(function (block) {
    //     block.classList.add("hidden");
    //     });

    //     loadStyle(block);
    //     document.querySelector(`.main__${block}`).classList.remove("hidden");
    //     activeListItem(block);

    //     window.location.hash = block;
        


    // }

    function openBlock(block, addToHistory = true) {
      const promoDiscount = document.querySelector(".promo__discount");

      AllblockContent.forEach(function (block) {
        block.classList.add("hidden");
      });

      loadStyle(block);
      document.querySelector(`.main__${block}`).classList.remove("hidden");
      activeListItem(block);

      // 👇 ДОБАВЛЕНИЕ в историю, чтобы работала кнопка "назад"
      if (addToHistory) {
        history.pushState({ section: block }, '', `#${block}`);
      }
}


    // Клик на элемент внутри ul
    navListUl.addEventListener("click", function (e) {
    e.preventDefault();
    
    const target = e.target;

    if (target.classList.contains("nav__list-item-btn")) {

      loadStyle(target.dataset.block);

      openBlock(target.dataset.block);

      activeListItem(target.dataset.block);

      // Убераем мобильное меню при разрешении экрана меньше 1038
      if (window.innerWidth <= 1038) {
        showCloseMenu();
      }
      

      // window.location.hash = `#${target.dataset.block}`;
    }
  });


  // Открытие блока предложения


    document.querySelector(".about__proposal-left-plans-btn").addEventListener("click", function (e) {
      e.preventDefault();

      openBlock("conditions");
      loadStyle("conditions");

      activeListItem("conditions");

      // window.location.hash = 'conditions';

      window.scrollTo({
        top: 0,
        // behavior: "smooth"
      });
      
    });

  
  
 // Открытие блока цен, после нажатия на кнопку "Узнать подробнее" - подробнее о скидке 20%
if (document.querySelector(".promo__discount")) {
      document.querySelector(".promo__discount-cont-btn").addEventListener("click", function (e) {
    e.preventDefault();

    openBlock("prices");
    loadStyle("prices");

    activeListItem("prices");

    // window.location.hash = 'prices';

    window.scrollTo({
      top: 0,
      // behavior: "smooth"
    });
    
  });

}



// -----------------Закончилась логика открытия блоков-разделов!

  // Функционал вопрос-ответ в разделе "Гарантия"
  function frequentlyAskedQuestions () {
    const faqContainer = document.querySelector(".warranty__faq");
    
    
    faqContainer.addEventListener("click", function (e) {
      const target = e.target;
      // const item = target.closest(".warranty__faq-item");
      // const answer = item.querySelector('.warranty__answer');

      if (target.closest("a")) return;

      if (target.closest(".warranty__faq-item")) {
        // const arrow = document.querySelector(".fa-arrow-down");
        // arrow.classList.toggle("warranty__faq-item-i-show");

        target.closest(".warranty__faq-item").querySelector(".fa-arrow-down").classList.toggle("warranty__faq-item-i-show");

        target.closest(".warranty__faq-item").querySelector(".warranty__answer").classList.toggle("warranty__answer-open");
      }
    });
  }

  frequentlyAskedQuestions();


// Открытие меню в мобильной версии

function showMenuMobile () {
  const btnMenu = document.querySelector(".nav__burger");
  const navList = document.querySelector(".nav__list");
  const btnCloseMenu = document.querySelector(".menu-mobile-close");
  const overlayMenu = document.querySelector(".ul-wrapper");

  btnMenu.addEventListener("click", function (e) {
    
    document.body.classList.add("no-scroll");
    overlayMenu.classList.add("active-overlay");
    navList.classList.add("active-menu-mobile");
    btnCloseMenu.classList.add("active-btn-close-menu-mobile");
    
  });

  btnCloseMenu.addEventListener("click", function (e) {
    showCloseMenu();
  });

  overlayMenu.addEventListener("click", function (e) {
    if (!e.target.classList.contains("ul-wrapper")) return;
    showCloseMenu();
  });

}

showMenuMobile();

// Закрытие мобильного меню
function showCloseMenu () {

  const navList = document.querySelector(".nav__list");
  const btnCloseMenu = document.querySelector(".menu-mobile-close");
  const overlayMenu = document.querySelector(".ul-wrapper");

  document.body.classList.remove("no-scroll");
  overlayMenu.classList.remove("active-overlay");
  navList.classList.remove("active-menu-mobile");
  btnCloseMenu.classList.remove("active-btn-close-menu-mobile");

  navList.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.classList.contains("nav__list-item-btn")) {

        overlayMenu.classList.remove("active-overlay");
        navList.classList.remove("active-menu-mobile");

    }
  });
}

window.addEventListener("popstate", function (event) {
  const block = event.state?.section || window.location.hash.replace('#', '') || 'conditions';
  openBlock(block, false); // без добавления в историю
});

  
 
});


// document.addEventListener("DOMContentLoaded", function () {
//   const el = document.getElementById("typewriter");
//   const text = "  запуск для специалистов, выбор для клиентов.";
//   let j = 0;

//   function type() {
//     if (j <= text.length) {
//       el.textContent = text.substring(0, j++);
//       const delay = Math.random() * (120 - 70) + 70; // случайная задержка между 70–120мс
//       setTimeout(type, delay);
//     } else {
//       // подождать немного, прежде чем убрать курсор
//       setTimeout(() => {
//         el.classList.remove("typing");
//         el.style.borderRight = "none";
//       }, 500);
//     }
//   }

//   type();
// });

document.addEventListener("DOMContentLoaded", function () {
  const elAll = document.querySelectorAll(".typewriter");
  const text = "  запуск для специалистов, выбор для клиентов.";
  let j = 0;

  elAll.forEach(el => {
      function type() {
    if (j <= text.length) {
      el.textContent = text.substring(0, j++);
      const delay = Math.random() * (190 - 120) + 100; // случайная задержка между 70–120мс
      setTimeout(type, delay);
    } else {
      // подождать немного, прежде чем убрать курсор
      setTimeout(() => {
        el.classList.remove("typing");
        el.style.borderRight = "none";
      }, 500);
    }
  }

  type();

  });

});




