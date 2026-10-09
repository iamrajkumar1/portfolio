import "./style.css";
import { createScene } from "./scene.js";

const lines = [
  "> boot lexicon://rajkumar",
  "> load identity .............. ok",
  "> mount python / fastapi / llm",
  "> handshake ready",
];

const log = document.getElementById("boot-log");
const boot = document.getElementById("boot");
let i = 0;

function typeBoot() {
  if (i < lines.length) {
    log.textContent += lines[i] + "\n";
    i += 1;
    setTimeout(typeBoot, 90);
  } else {
    setTimeout(() => {
      boot.classList.add("hide");
      setTimeout(() => boot.remove(), 500);
    }, 220);
  }
}

createScene(document.getElementById("webgl"));
typeBoot();

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
