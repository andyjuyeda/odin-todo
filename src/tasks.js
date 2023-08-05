export const Task = (
  name,
  description,
  dueDate,
  priority,
  notes,
  completed = false
) => {
  return {
    name,
    description,
    dueDate,
    priority,
    notes,
    completed,
    toggleCompleted() {
      this.completed = !this.completed;
    },
  };
};

export const formData = {
  receiveData: function () {
    let taskName = document.getElementById("task-name").value;
    let taskDescription = document.getElementById("description").value;
    let taskDueDate = document.getElementById("due-date").value;
    let taskPriority = document.getElementById("priority").value;
    let taskNotes = document.getElementById("notes").value;
    return { taskName, taskDescription, taskDueDate, taskPriority, taskNotes };
  },
};
