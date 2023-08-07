import { tasksArray } from ".";
import { Task, formData } from "./tasks";
import { updateContent } from ".";
import MicroModal from "micromodal";
import formatDistance from "date-fns/formatDistance";

function createCardSection(label, content) {
  let sectionDiv = document.createElement("div");

  let h5Element = document.createElement("h5");
  h5Element.textContent = label;
  sectionDiv.appendChild(h5Element);

  let pElement = document.createElement("p");
  pElement.textContent = content;
  sectionDiv.appendChild(pElement);

  return sectionDiv;
}

function formatDueDate(dueDateString) {
  const dueDateObj = new Date(dueDateString);
  const currentDate = new Date();
  const distance = formatDistance(dueDateObj, currentDate);
  return `${dueDateString} (${distance})`;
}

const createTaskCard = (task) => {
  let cardClasses = ["card", `priority-${task.priority}`, task.status];
  let taskCard = document.createElement("div");
  taskCard.classList.add(...cardClasses);

  let cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  let name = document.createElement("h3");
  name.textContent = task.name;
  cardTitle.appendChild(name);
  taskCard.appendChild(cardTitle);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let description = createCardSection("Description", task.description);
  cardBody.appendChild(description);

  let dueDate = createCardSection("Due", formatDueDate(task.dueDate));
  cardBody.appendChild(dueDate);

  let priority = createCardSection("Priority", task.priority);
  cardBody.appendChild(priority);

  let status = createCardSection("Status", task.status);
  cardBody.appendChild(status);

  let notes = createCardSection("Notes", task.notes);
  cardBody.appendChild(notes);

  let editIcon = document.createElement("div");
  editIcon.classList.add("edit-icon");
  let iconRegular = document.createElement("i");
  iconRegular.classList.add("bi");
  iconRegular.classList.add("bi-pencil");
  editIcon.appendChild(iconRegular);
  let iconFill = document.createElement("i");
  iconFill.classList.add("bi");
  iconFill.classList.add("bi-pencil-fill");
  editIcon.appendChild(iconFill);

  editIcon.addEventListener("click", () => openModalForEditTask(task));
  cardBody.appendChild(editIcon);

  taskCard.appendChild(cardBody);

  return taskCard;
};

export const overviewContent = () => {
  let container = document.createElement("div");
  container.classList.add("section");
  container.classList.add("section-overview");

  for (let task of tasksArray) {
    container.appendChild(createTaskCard(task));
  }

  return container;
};

export const todoContent = () => {
  let container = document.createElement("div");
  container.classList.add("section");
  container.classList.add("section-todo");

  const toDoTasksSorted = tasksArray
    .filter((task) => task.status === "ToDo")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  for (let task of toDoTasksSorted) {
    container.appendChild(createTaskCard(task));
  }

  return container;
};

export const inProgressContent = () => {
  let container = document.createElement("div");
  container.classList.add("section");
  container.classList.add("section-doing");

  const doingTasksSorted = tasksArray
    .filter((task) => task.status === "Doing")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  for (let task of doingTasksSorted) {
    container.appendChild(createTaskCard(task));
  }

  return container;
};

export const doneContent = () => {
  let container = document.createElement("div");
  container.classList.add("section");
  container.classList.add("section-done");

  const doneTasks = tasksArray.filter((task) => task.status === "Done");

  for (let task of doneTasks) {
    container.appendChild(createTaskCard(task));
  }

  return container;
};

let currentFormSubmitHandler;

export function openModalForNewTask() {
  document.getElementById("modal-1-title").textContent = "New Task";
  document.querySelector("#new-task button[type='submit']").textContent =
    "Create Task";

  let form = document.querySelector("form#new-task");
  form.reset();

  if (currentFormSubmitHandler) {
    form.removeEventListener("submit", currentFormSubmitHandler);
  }

  currentFormSubmitHandler = (e) => {
    e.preventDefault();
    let data = formData.receiveData();
    let newTask = Task(
      data.taskName,
      data.taskDescription,
      data.taskDueDate,
      data.taskPriority,
      data.taskStatus,
      data.taskNotes
    );
    tasksArray.push(newTask);
    e.target.reset();
    MicroModal.close("modal-1");
    updateContent(overviewContent);
  };

  form.addEventListener("submit", currentFormSubmitHandler);
}

export function openModalForEditTask(task) {
  const { name, description, dueDate, priority, status, notes } = task;

  MicroModal.show("modal-1");

  document.getElementById("modal-1-title").textContent = "Edit Task";
  document.querySelector("#new-task button[type='submit']").textContent =
    "Update Task";

  let form = document.querySelector("form#new-task");
  form.reset();

  document.querySelector("input#task-name").value = name;
  document.querySelector("input#description").value = description;
  document.querySelector("input#due-date").value = dueDate;
  document.querySelector("select#priority").value = priority;
  document.querySelector("select#status").value = status;
  document.querySelector("textarea#notes").value = notes; // use `.value` for textarea

  if (currentFormSubmitHandler) {
    form.removeEventListener("submit", currentFormSubmitHandler);
  }

  currentFormSubmitHandler = (e) => {
    e.preventDefault();
    let data = formData.receiveData();

    task.name = data.taskName;
    task.description = data.taskDescription;
    task.dueDate = data.taskDueDate;
    task.priority = data.taskPriority;
    task.status = data.taskStatus;
    task.notes = data.taskNotes;
    e.target.reset();
    MicroModal.close("modal-1");
    updateContent(overviewContent);
  };

  form.addEventListener("submit", currentFormSubmitHandler);

  let div = document.querySelector("#modal-1-content .buttons");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete Task";
  deleteButton.setAttribute("type", "button");
  div.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    const taskIndex = tasksArray.findIndex((t) => t === task);
    if (taskIndex !== -1) {
      tasksArray.splice(taskIndex, 1);
    }
    MicroModal.close("modal-1");
    updateContent(overviewContent);
  });
}
