const todoCardBody = document.querySelector(".todo-card-body");
let todoId = 0;

// 투두 추가버튼 클릭
function showAddTodoDiv(){
  if (document.querySelector(".add-todo-div")) return;

  closeAllEdits();

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
  todoDiv.id = 'todo-' + String(todoId);
  todoId++;

  todoDiv.innerHTML = `
    <input class="done-todo" type="checkbox"/>
    <span class="todo-title">${title}</span>
    <input class="hidden todo-title-input" />
    <div>
      <span class="edit-todo ml-auto material-symbols-outlined">edit</span>
      <span class="edit-todo-done !hidden material-symbols-outlined">
        check
      </span>
      <span class="delete-todo ml-auto material-symbols-outlined">close</span>
    </div>
  `;

// 수정 시작 버튼
todoDiv.querySelector(".edit-todo").addEventListener("click", (e) => {
  closeAllEdits();

  const todo = e.target.closest(".todo");

  const todoTitle = todo.querySelector(".todo-title");
  const todoTitleInput = todo.querySelector(".todo-title-input");

  todoTitleInput.value = todoTitle.textContent;

  todoTitle.classList.add("hidden");
  todoTitleInput.classList.remove("hidden");
  todoTitleInput.focus();

  todo.querySelector(".edit-todo").classList.add("!hidden");
  todo.querySelector(".edit-todo-done").classList.remove("!hidden");
});


// 수정 완료 버튼
  todoDiv.querySelector(".edit-todo-done").addEventListener("click", (e) => {
    const todo = e.target.closest(".todo");

    const todoTitle = todo.querySelector(".todo-title");
    const todoTitleInput = todo.querySelector(".todo-title-input");

    todoTitle.textContent = todoTitleInput.value.trim();

    todoTitleInput.classList.add("hidden");
    todoTitle.classList.remove("hidden");

    todo.querySelector(".edit-todo").classList.remove("!hidden");
    todo.querySelector(".edit-todo-done").classList.add("!hidden");
  });

  // 삭제 이벤트 등록
  todoDiv.querySelector('.delete-todo').addEventListener('click', (e) => {
    if(confirm("할 일을 삭제하시겠습니까?")){
      e.target.parentElement.parentElement.remove()
    } else { return };
  });

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

// 작업중이 아닌 투두 비활성화
function closeAllEdits() {
  const todos = document.querySelectorAll(".todo");
  const addTodoDiv = document.querySelector(".add-todo-div");

  if(addTodoDiv){
    closeAddTodo();
  }

  todos.forEach((todo) => {
    const title = todo.querySelector(".todo-title");
    const input = todo.querySelector(".todo-title-input");
    const editBtn = todo.querySelector(".edit-todo");
    const doneBtn = todo.querySelector(".edit-todo-done");

    if (!input) return;

    // 수정 중이면 저장하고 닫기
    if (!input.classList.contains("hidden")) {
      title.textContent = input.value.trim() || title.textContent;

      input.classList.add("hidden");
      title.classList.remove("hidden");

      editBtn.classList.remove("!hidden");
      doneBtn.classList.add("!hidden");
    }
  });
}


// 투두 취소
function closeAddTodo(){
  // 입력창 삭제
  const addTodoDiv = document.querySelector('.add-todo-div');
  addTodoDiv.remove();
}
