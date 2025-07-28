export function InsertButtonCopy() {
  function AddLineNumbers(codeElement: HTMLElement) {
    if (codeElement.querySelector(".line-numbers")) {
      return;
    }

    const lines = codeElement.querySelectorAll(".line");
    if (lines.length === 0) return;



    const lineNumbersContainer = document.createElement("div");
    lineNumbersContainer.className = "line-numbers";

    lines.forEach((line, index) => {
      const lineNumber = document.createElement("span");
      lineNumber.className = "line-number";
      lineNumber.textContent = (index + 1).toString();

      const lineHeight = window.getComputedStyle(line as Element).lineHeight;
      if (lineHeight !== "normal") {
        lineNumber.style.lineHeight = lineHeight;
      }

      lineNumbersContainer.appendChild(lineNumber);
    });



    const codeContainer = codeElement.closest("pre");
    if (codeContainer) {
      codeContainer.style.position = "relative";
      codeContainer.style.paddingLeft = "4rem";
      codeContainer.insertBefore(lineNumbersContainer, codeElement);
    }
  }

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

    ButtonCopy.setAttribute("class", "button-copy");

    icon.setAttribute("icon", "solar:copy-bold-duotone");
    icon.setAttribute("class", "flex justify-center items-center text-[22px]");

    text.innerText = "Copy";
    text.style.fontSize = "1.6rem";

    ButtonCopy.appendChild(icon);
    ButtonCopy.appendChild(text);

    span.appendChild(ButtonCopy);
    ButtonCopy.addEventListener("click", Copy);
  }

  const Section = document.querySelectorAll("[data-code-block-pro-font-family]");

  const post = document.getElementById("post");
  const imagesPost = post.querySelectorAll("img") as NodeListOf<HTMLImageElement>;

  imagesPost.forEach((image: HTMLImageElement) => {
    if (!image.className.includes("rounded-full")) {
      image.height > 60
        ? (image.style.borderRadius = "12px")
        : (image.style.borderRadius = "4px");
    }
  });

  Section.forEach((element: HTMLDivElement) => {
    element.style.borderRadius = "6px";
    element.style.overflow = "hidden";

    const header = element.querySelectorAll("span")[0];
    const body = element.querySelectorAll("pre")[0];
    RenderButtonCopy(header, body);
  });

  const ShikiBlocks = document.querySelectorAll("pre.shiki");
  ShikiBlocks.forEach((preElement: HTMLPreElement) => {
    const codeElement = preElement.querySelector("code");
    if (codeElement) {
      AddLineNumbers(codeElement);
    }
  });
}
