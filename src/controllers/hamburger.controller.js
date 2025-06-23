const d = document;
export default function HamburgerButton(hamburgerBtn, panel) {
  d.addEventListener("click", (e) => {
    if (
      e.target.matches(hamburgerBtn) ||
      e.target.matches(`${hamburgerBtn} *`)
    ) {
      d.querySelector("body").classList.toggle("no-scroll");
      d.querySelector(hamburgerBtn).classList.toggle("is-active");
      d.querySelector(panel).classList.toggle("activate-menu");
    }
  });
}

d.addEventListener("DOMContentLoaded", (e) => {
  HamburgerButton(".hamburger", ".menu");
});
