export const kofiWidget = document.addEventListener("astro:page-load", () => {
  kofiWidgetOverlay.draw("sofidev", {
    type: "floating-chat",
    "floating-chat.donateButton.text": "Support me",
    "floating-chat.donateButton.background-color": "#00b9fe",
    "floating-chat.donateButton.text-color": "#fff",
  });
});
