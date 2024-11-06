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
          UpdateIcon("ci:copy");
        }, 2000);
      }
  
      span.style.display = "flex";
      span.style.justifyContent = "space-between";
      span.style.alignItems = "center";
      span.style.paddingRight = "1.6rem";
  
      ButtonCopy.setAttribute(
        "class",
        "flex justify-center items-center cursor-pointer gap-2 text-gray-600 transition-all hover:text-gray-200"
      );
  
      icon.setAttribute("icon", "ci:copy");
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
  
    Section.forEach((element) => {
      const header = element.querySelectorAll("span")[0];
      const body = element.querySelectorAll("pre")[0];
      RenderButtonCopy(header, body);
    });
  }