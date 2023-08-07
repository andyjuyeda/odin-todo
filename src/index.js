import "./style.css";
import MicroModal from "micromodal";
import { format } from "date-fns";
import * as content from "./domelements";
import { openModalForNewTask } from "./domelements";

export let tasksArray = [];
if (localStorage.getItem('tasks')) {
  tasksArray = JSON.parse(localStorage.getItem('tasks'));
}


MicroModal.init();

const container = document.querySelector("#content");
export const updateContent = (contentFunc) => {
  container.innerHTML = "";
  container.appendChild(contentFunc());
};

let overviewButton = document.querySelector(".nav-btn.nav-overview");
overviewButton.addEventListener("click", () =>
  updateContent(content.overviewContent)
);

let todoButton = document.querySelector(".nav-btn.nav-todo");
todoButton.addEventListener("click", () => updateContent(content.todoContent));

let inProgressButton = document.querySelector(".nav-btn.nav-doing");
inProgressButton.addEventListener("click", () =>
  updateContent(content.inProgressContent)
);

let doneButton = document.querySelector(".nav-btn.nav-done");
doneButton.addEventListener("click", () => {
  updateContent(content.doneContent)
})



updateContent(content.overviewContent);
let today = format(new Date(), "yyyy-MM-dd");
document.querySelector("#due-date").setAttribute("min", today);
document.querySelector("button.new-task").addEventListener("click", () => openModalForNewTask());
