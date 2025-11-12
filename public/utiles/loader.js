// loader.js
// Exported as an ES module

// Inject CSS styles (only once)
if (!document.getElementById("global-loader-style")) {
  const style = document.createElement("style");
  style.id = "global-loader-style";
  style.textContent = `
    @keyframes loadbody {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-50%); }
      100% { transform: translateY(0px); }
    }
    .loading {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .bino {
      width: 200px;
      height: 200px;
      border-radius: 100%;
      background: #2daee2;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
    }
    .bino_head {
      margin-top: 2%;
      width: 60%;
      height: 30%;
      background-color: aliceblue;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: end;
      gap: 15%;
    }
    .eye {
      margin-bottom: 10%;
      background-color: #2daee2;
      width: 15%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
    }
    .load {
      animation: loadbody 1.25s infinite ease-in-out;
    }
    .load .bino_head div {
      animation: loadbody 1.25s infinite ease-in-out;
    }
  `;
  document.head.appendChild(style);
}

// Create loader element (only once)
const loader = document.createElement("div");
  loader.className = "loading";
  loader.innerHTML = `
    <div class="bino load">
      <div class="bino_head">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
    </div>
  `;
const loaderElement = loader;

// Current parent reference
let currentParent = document.body;

// Exported API
const Loader = {
  show: (element) => {
    // detach from old parent
    if (loaderElement.parentElement) loaderElement.parentElement.removeChild(loaderElement);

    // decide new parent
    currentParent = element instanceof HTMLElement ? element : document.body;

    // ensure parent has positioning
    const computed = getComputedStyle(currentParent);
    if (computed.position === "static" || !computed.position) {
     // currentParent.style.position = "relative";
      currentParent.style.display = "flex";
      currentParent.style.justifyContent = "center";
      currentParent.style.alignItems = "center";
    }

    // attach loader to parent
    currentParent.appendChild(loaderElement);
    loaderElement.classList.remove("hidden");
  },
  hide: () => {
    if (loaderElement.parentElement) {
      loaderElement.parentElement.removeChild(loaderElement);
    }
  }
};

export default Loader;
