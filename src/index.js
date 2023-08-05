import "./style.css";
import MicroModal from "micromodal";
import { format } from "date-fns";
import * as content from "./domelements";
import { Task, formData } from "./tasks";

let tasksArray = [];

MicroModal.init();

const container = document.querySelector("#content");
const updateContent = (contentFunc) => {
  container.innerHTML = "";
  container.appendChild(contentFunc());
};

let overviewButton = document.querySelector(".nav-btn.overview");
overviewButton.addEventListener("click", () =>
  updateContent(content.overviewContent)
);

let todoButton = document.querySelector(".nav-btn.todo");
todoButton.addEventListener("click", () => updateContent(content.todoContent));

let inProgressButton = document.querySelector(".nav-btn.in-progress");
inProgressButton.addEventListener("click", () =>
  updateContent(content.inProgressContent)
);

document.querySelector("form#new-task").addEventListener("submit", (e) => {
  e.preventDefault();
  let data = formData.receiveData();
  let newTask = Task(
    data.taskName,
    data.taskDescription,
    data.taskDueDate,
    data.taskPriority,
    data.taskNotes
  );
  tasksArray.push(newTask);
  console.log(tasksArray);
});

updateContent(content.overviewContent);
let today = format(new Date(), "yyyy-MM-dd");
document.querySelector("#due-date").setAttribute("min", today);
