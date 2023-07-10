document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(`[data-elem='form']`);
  const input = document.querySelector(`[data-elem='input']`);
  const list = document.querySelector(`[data-elem='list']`);
  const itemEmpty = document.querySelector(`[data-elem='item-empty']`);
  const itemCompletedEmpty = document.querySelector(
    `[data-elem='completed-empty']`
  );
  const errorMessage = document.querySelector(`[data-elem='error-message']`);

  const btnClear = document.querySelector(`[data-btn='clear']`);
  const btnCompleted = document.querySelector(`[data-btn='mark-comleted']`);
  const btnAllTasks = document.querySelector(`[data-filter='all']`);
  const btnActiveTasks = document.querySelector(`[data-filter='active']`);
  const btnCompletedTasks = document.querySelector(`[data-filter='completed']`);

  isListEmpty();
  form.addEventListener("submit", addTask);
  list.addEventListener("click", markTaskCompleted);
  btnClear.addEventListener("click", clearCompletedTasks);
  btnCompletedTasks.addEventListener("click", showcompletedTasks);

  input.oninput = function () {
    if (errorMessage.classList.contains("active")) {
      errorMessage.classList.remove("active");
    }
  };

  function addTask(event) {
    event.preventDefault();

    if (input.value == "") {
      errorMessage.classList.add("active");
      return;
    } else {
      errorMessage.classList.remove("active");
    }

    const taskText = input.value;

    appendItemTemplate(taskText);
    input.value = "";
    input.focus();
    isListEmpty();
  }

  function appendItemTemplate(taskText) {
    const template = `<li class="list__item list__item-task">
    <span class="list__item-text">${taskText}</span>
    <div class="list__item-check" data-elem="mark-comleted"></div></li>`;

    list.insertAdjacentHTML("beforeend", template);
  }

  function isListEmpty() {
    if (list.children.length == 1) {
      itemEmpty.classList.add("active");
    } else {
      itemEmpty.classList.remove("active");
    }
  }

  function clearCompletedTasks() {
    const allCompletedTasks = document.querySelectorAll(
      ".list__item.completed"
    );
    if (allCompletedTasks.length > 0) {
      allCompletedTasks.forEach(function (item) {
        item.remove();
      });
    }
  }

  function markTaskCompleted(event) {
    if (event.target.dataset.elem == "mark-comleted") {
      const parentItem = event.target.closest(".list__item");
      parentItem.classList.add("completed");
    }
  }

  function showcompletedTasks() {
    btnCompletedTasks.classList.toggle("active");

    const allTask = document.querySelectorAll(".list__item-task");

    if (allTask.length !== 0) {
      allTask.forEach(function (item) {
        if (!item.classList.contains("completed")) {
          item.classList.add("hide");
        }
      });
    } else {
      // вывести сообщение что список пуст
      //itemCompletedEmpty.classList.add("active");
    }

    checkActiveTab();
  }
});

//здесь надо доработать проверку показывать снова все задачи, если таб не активен
function checkActiveTab() {
  if (btnCompletedTasks.classList.contains("active")) {
    return;
  }

  const allTask = document.querySelectorAll(".list__item-task");

  allTask.forEach(function (item) {
    if (!item.classList.contains("completed")) {
      item.classList.remove("hide");
    }
  });
}
