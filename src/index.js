import './style.css';
import * as content from './domelements';

const container = document.querySelector('#content');
const updateContent = (contentFunc) => {
    container.innerHTML = "";
    container.appendChild(contentFunc());
}

let overviewButton = document.querySelector('.nav-btn.overview');
overviewButton.addEventListener('click', () => updateContent(content.overviewContent));

let todoButton = document.querySelector('.nav-btn.todo');
todoButton.addEventListener('click', () => updateContent(content.todoContent));

let inProgressButton = document.querySelector('.nav-btn.in-progress');
inProgressButton.addEventListener('click', () => updateContent(content.inProgressContent));

updateContent(content.overviewContent());
