const todoCardBody = document.querySelector(".todo-card-body");

// 투두 추가버튼 클릭
function showAddTodoDiv(){
    if (document.querySelector(".add-todo-div")) return;
  const addDiv = document.createElement("li");
  addDiv.classList.add("todo");
  addDiv.classList.add("add-todo-div");
  addDiv.innerHTML = `
  <input type="checkbox"/>
  <input id="todo-title" />
    <div class="add-todo-btns">
      <span onclick="saveTodo()" class="material-symbols-outlined">
        check
      </span>
      <span onclick="closeAddTodo()" class="material-symbols-outlined">
        close
      </span>
    </div>
  `
  todoCardBody.append(addDiv);
  const addDivInput = document.querySelector("#todo-title");
  addDivInput.focus();
  todoCardBody.scrollTop = todoCardBody.scrollHeight;
};

// 투두 정렬
function sortTodos() {
  const ul = document.querySelector("#todos");
  const todos = Array.from(ul.children);

  todos.sort((a, b) => {
    const aDone = a.classList.contains("done");
    const bDone = b.classList.contains("done");

    return aDone - bDone;
  });

  todos.forEach(todo => ul.appendChild(todo));
}

// 새 투두 저장
function saveTodo() {
  const input = document.querySelector("#todo-title");
  const title = input.value.trim();
  if (!title) return;

  const todoDiv = document.createElement("li");
  todoDiv.classList.add("todo");

  todoDiv.innerHTML = `
    <input class="done-todo" type="checkbox"/>
    <span>${title}</span>
    <span class="ml-auto material-symbols-outlined">close</span>
  `;

  const ul = document.querySelector("#todos");
  ul.append(todoDiv);

  document.querySelector(".add-todo-div").remove();

  const todoCheckbox = todoDiv.querySelector(".done-todo");

  todoCheckbox.addEventListener("change", () => {
    if (todoCheckbox.checked) {
      todoDiv.classList.add("done");
    } else {
      todoDiv.classList.remove("done");
    }

    sortTodos();
  });

  sortTodos();
}


// 새 투두 취소
function closeAddTodo(){
  // 입력창 삭제
  const addTodoDiv = document.querySelector('.add-todo-div');
  addTodoDiv.remove();
}
