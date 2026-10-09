import "./style.css";
import { createScene } from "./scene.js";

const lines = [
  "> boot lexicon://rajkumar",
  "> load identity .............. ok",
  "> mount python / fastapi / llm",
  "> hydrate production ......... LIVE",
  "> handshake ready",
];

const log = document.getElementById("boot-log");
const boot = document.getElementById("boot");
const canvas = document.getElementById("webgl");
let i = 0;

function typeBoot() {
  if (i < lines.length) {
    log.textContent += lines[i] + "\n";
    i += 1;
    setTimeout(typeBoot, 280);
  } else {
    setTimeout(() => {
      boot.classList.remove("show");
      boot.classList.add("hide");
      createScene(canvas);
      canvas.classList.add("ready");
      setTimeout(() => boot.remove(), 500);
    }, 450);
  }
}

setTimeout(() => {
  boot.classList.add("show");
  setTimeout(typeBoot, 350);
}, 500);

const modal = document.getElementById("resume-modal");
const closeBtn = document.getElementById("close-resume");

function openResume() {
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeResume() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-resume-preview]").forEach((el) => {
  el.addEventListener("click", openResume);
});
closeBtn.addEventListener("click", closeResume);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeResume();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeResume();
});
