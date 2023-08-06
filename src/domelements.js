import { tasksArray } from ".";

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

  let dueDate = createCardSection("Due", task.dueDate);
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

  container.textContent = "This is the todo page.";

  return container;
};

export const inProgressContent = () => {
  let container = document.createElement("div");
  container.classList.add("section");
  container.classList.add("section-doing");

  container.textContent = "Doing";

  return container;
};
