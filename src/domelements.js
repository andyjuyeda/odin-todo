export const overviewContent = () => {
    let container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('overview');

    container.textContent = "Overview";

    return container;
};

export const todoContent = () => {
    let container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('todo');

    container.textContent = "This is the todo page.";

    return container;
}

export const inProgressContent = () => {
    let container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('in-progress');

    container.textContent = "In Progress";

    return container;
}
