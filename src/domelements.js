import { tasksArray } from ".";

const createTaskCard = (task) => {
  let cardClasses = ["card", `priority-${task.priority}`];
  if (task.inProgress) {
    cardClasses.push("in-progress");
  }
  if (task.completed) {
    cardClasses.push("completed");
  }
  let taskCard = document.createElement("div");
  taskCard.classList.add(...cardClasses);

  let cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  let name = document.createElement("h4");
  name.textContent = task.name;
  cardTitle.appendChild(name);
  taskCard.appendChild(cardTitle);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let description = document.createElement("p");
  description.classList.add("task-description");
  description.textContent = task.description;
  cardBody.appendChild(description);
  let dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("task-due-date");

  let h5DueDate = document.createElement("h5");
  h5DueDate.textContent = "Due";
  dueDateDiv.appendChild(h5DueDate);

  let pDueDate = document.createElement("p");
  pDueDate.textContent = task.dueDate;
  dueDateDiv.appendChild(pDueDate);

  cardBody.appendChild(dueDateDiv);

  let priorityDiv = document.createElement("div");
  priorityDiv.classList.add("priority");

  let h5Priority = document.createElement("h5");
  h5Priority.textContent = "Priority";
  priorityDiv.appendChild(h5Priority);

  let pPriority = document.createElement("p");
  pPriority.textContent = task.priority;
  priorityDiv.appendChild(pPriority);

  cardBody.appendChild(priorityDiv);

  let notes = document.createElement("p");
  notes.classList.add("task-notes");
  notes.textContent = task.notes;
  cardBody.appendChild(notes);

  taskCard.appendChild(cardBody);

  return taskCard;
};

export const overviewContent = () => {
  let container = document.createElement("div");
  container.classList.add("container");
  container.classList.add("overview");

  for (let task of tasksArray) {
    container.appendChild(createTaskCard(task));
  }

  return container;
};

export const todoContent = () => {
  let container = document.createElement("div");
  container.classList.add("container");
  container.classList.add("todo");

  container.textContent = "This is the todo page.";

  return container;
};

export const inProgressContent = () => {
  let container = document.createElement("div");
  container.classList.add("container");
  container.classList.add("in-progress");

  container.textContent = "In Progress";

  return container;
};
