const todos = [
  {
    text: "Do nothing",
    completed: false,
  },
  {
    text: "Make a todo list",
    completed: false,
  },
  {
    text: "get a job",
    completed: false,
  },
  {
    text: "algo",
    completed: false,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const list = document.getElementById("todo-list");
  const submitButton = document.getElementById("submit-button");
  const todoInput = document.getElementById("todo-input");

  const toggleSubmitButton = () => {
    if (todoInput.value.trim() === "") {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  };

  toggleSubmitButton();

  todoInput.addEventListener("input", toggleSubmitButton);
  todoInput.focus();

  const addListItem = ({ text, completed = false }) => {
    const listItem = document.createElement("li");
    const leftContainer = document.createElement("div");
    leftContainer.className = "left-container";

    const listItemText = document.createElement("span");
    listItemText.textContent = text;

    const listItemCheckbox = document.createElement("input");
    listItemCheckbox.type = "checkbox";
    listItemCheckbox.checked = completed;
    listItemCheckbox.setAttribute("aria-label", `Mark ${text} as complete`);
    listItemCheckbox.addEventListener("change", () => {
      if (listItemCheckbox.checked) {
        listItemCheckbox.setAttribute(
          "aria-label",
          `Mark ${text} as incomplete`
        );
      } else {
        listItemCheckbox.setAttribute("aria-label", `Mark ${text} as complete`);
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.setAttribute("aria-label", `Delete ${text}`);
    deleteButton.addEventListener("click", () => {
      list.removeChild(listItem);
    });

    leftContainer.appendChild(listItemCheckbox);
    leftContainer.appendChild(listItemText);
    listItem.appendChild(leftContainer);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
  };

  todos.forEach(addListItem);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addListItem({ text: todoInput.value.trim() });
    form.reset();
  });
});
