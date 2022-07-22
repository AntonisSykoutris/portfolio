"use strict";

///////////////////////////////////////////////////////////
// Make mobile navigation work
const mobileNavigation = () => {
  const menu = document.querySelector(".btn-mobile-nav");
  const header = document.querySelector(".header");
  const setMenu = () => header.classList.toggle("nav-open");
  menu.addEventListener("click", setMenu);
};
mobileNavigation();

///////////////////////////////////////////////////////////
// Make copyright year the current year
const copyrightYear = () => {
  const copyright = document.querySelector(".copyright-year");
  const curYear = new Date().getFullYear();
  copyright.textContent = curYear;
};
copyrightYear();

///////////////////////////////////////////////////////////
//Smooth scrolling animation

document.body.addEventListener("click", e => {
  if (e.target.classList.contains("link")) return true;
  if (
    (e.target.hasAttribute("href") || e.target.classList.contains("logo")) &&
    !e.target.classList.contains("email-text")
  ) {
    e.preventDefault();

    const href = e.target.getAttribute("href");
    const headerEl = document.querySelector(".header");

    // For The logo because it is an image and doesnt have href
    if (!href) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href.startsWith("#") && href.length > 1) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    if (e.target.classList.contains("nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  }
});

///////////////////////////////////////////////////////////
// Sticky navigation

const stickyNavigation = () => {
  const sectionHeroEl = document.querySelector(".section-hero");
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      // console.log(ent);

      if (!ent.isIntersecting) document.body.classList.add("sticky");

      if (ent.isIntersecting) document.body.classList.remove("sticky");
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      rootMargin: "-80px" /* Manual margin for sticky nav(same as height of sticky 8rem = 80px) */,
    }
  );
  obs.observe(sectionHeroEl);
};
stickyNavigation();
///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
const checkFlexGap = () => {
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
};
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
