export function InsertButtonCopy() {
  function RenderButtonCopy(span: HTMLSpanElement, body: HTMLPreElement) {
    const ButtonCopy = document.createElement("div");
    const icon = document.createElement("iconify-icon");
    const text = document.createElement("h3");

    function UpdateIcon(newIcon: string) {
      icon.setAttribute("icon", newIcon);
    }

    function Copy() {
      UpdateIcon("material-symbols:check");
      text.innerText = "Copied";
      const textCopy = body.innerText;
      navigator.clipboard.writeText(textCopy);
      setTimeout(() => {
        text.innerText = "Copy";
        UpdateIcon("solar:copy-bold-duotone");
      }, 2000);
    }

    span.style.display = "flex";
    span.style.justifyContent = "space-between";
    span.style.alignItems = "center";
    span.style.paddingRight = "1.6rem";

    ButtonCopy.setAttribute(
      "class",
      "button-copy"
    );

    icon.setAttribute("icon", "solar:copy-bold-duotone");
    icon.setAttribute("class", "flex justify-center items-center text-[22px]");

    text.innerText = "Copy";
    text.style.fontSize = "1.6rem";

    ButtonCopy.appendChild(icon);
    ButtonCopy.appendChild(text);

    span.appendChild(ButtonCopy);
    ButtonCopy.addEventListener("click", Copy);
  }

  const Section = document.querySelectorAll(
    ".wp-block-kevinbatdorf-code-block-pro"
  );

  // cambio el border-radius de todas las imágenes que estén dentro del id['post']
  const post = document.getElementById("post");
  const imagesPost = post.querySelectorAll(
    "img"
  ) as NodeListOf<HTMLImageElement>;

  imagesPost.forEach((image: HTMLImageElement) => {
    if (!image.className.includes("rounded-full")) {
      image.height > 60
        ? (image.style.borderRadius = "12px")
        : (image.style.borderRadius = "4px");
    }
  });

  Section.forEach((element: HTMLDivElement) => {
    // se agrega un borde al apartado del código para que se vea mejor
    element.style.borderRadius = "6px";
    element.style.overflow = "hidden";

    const header = element.querySelectorAll("span")[0];
    const body = element.querySelectorAll("pre")[0];
    RenderButtonCopy(header, body);
  });
}