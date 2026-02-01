const diaryCardBody = document.querySelector('.diary-card-body');
let diaryId = 0;
let now = '000000';

// 다이어리 추가 버튼 클릭
function showAddDiaryDiv(){
  if (document.querySelector(".add-diary-div")) return;

  closeAllDiary();

  const date = new Date();
  now = String(date.getFullYear()).slice(-2) + String((date.getMonth() + 1)).padStart(2, '0') + String(date.getDate()).padStart(2, '0');

  const addDiaryDiv = document.createElement("div");
  addDiaryDiv.classList.add("diary");
  addDiaryDiv.classList.add("add-diary-div");
  addDiaryDiv.innerHTML = `
  <div class="diary-date">
    <span>${now}</span>
  </div>
  <div class="diary-content">
    <textarea class="diary-content-textarea"></textarea>
  </div>
  <div class="diary-btns">
        <span onclick="saveDiary()" class="material-symbols-outlined">check</span>
        <span class="!hidden material-symbols-outlined">edit</span>
        <span onclick="closeAddDiary()" class="material-symbols-outlined">close</span>
  </div>
  `
  diaryCardBody.append(addDiaryDiv);
  const addDiaryTextarea = document.querySelector('.diary-content-textarea');
  addDiaryTextarea.focus();
  diaryCardBody.scrollLeft = diaryCardBody.scrollWidth;
}

// 다이어리 저장
function saveDiary(){
  const addDiaryDiv = document.querySelector(".add-diary-div");
  const textarea = addDiaryDiv.querySelector(".diary-content-textarea");
  const content = textarea.value.trim();

if(!content) return;

  const diaryDiv = document.createElement("div");
  diaryDiv.classList.add("diary");
  diaryDiv.id = 'diary-' + String(diaryId);
  diaryId++;

  diaryDiv.innerHTML = `
    <div class="diary-date">
      <span>${now}</span>
    </div>
    <div class="diary-content">
      <p class="diary-content-phrase">
        ${content}
      </p>
      <textarea class="hidden diary-content-textarea"></textarea>
      </div>
    <div class="diary-btns">
        <span class="!hidden edit-diary-done material-symbols-outlined">check</span>
        <span class="edit-diary material-symbols-outlined">edit</span>
        <span class="delete-diary material-symbols-outlined">close</span>
    </div>
    `

    // 수정 시작 버튼
    diaryDiv.querySelector('.edit-diary').addEventListener("click", (e)=>{
      closeAllDiary();

      const diary = e.target.closest('.diary');
      const diaryContent = diary.querySelector('.diary-content-phrase');
      const diaryContentTextarea = diary.querySelector(".diary-content-textarea")

      diaryContentTextarea.value = diaryContent.innerHTML.trim();
      diaryContent.classList.add("hidden");
      diaryContentTextarea.classList.remove("hidden");
      diaryContentTextarea.focus();

      diary.querySelector(".edit-diary").classList.add("!hidden");
      diary.querySelector(".edit-diary-done").classList.remove("!hidden");
    })

    // 수정 완료 버튼
    diaryDiv.querySelector('.edit-diary-done').addEventListener("click", (e)=>{
      const diary = e.target.closest(".diary");
      const diaryContent = diary.querySelector('.diary-content-phrase');
      const diaryContentTextarea = diary.querySelector(".diary-content-textarea")

      diaryContent.textContent = diaryContentTextarea.value.trim();

      diaryContent.classList.remove("hidden");
      diaryContentTextarea.classList.add("hidden");
      diary.querySelector(".edit-diary").classList.remove("!hidden");
      diary.querySelector(".edit-diary-done").classList.add("!hidden");
    });

    // 삭제 이벤트 등록
    diaryDiv.querySelector('.delete-diary').addEventListener('click', (e) => {
      if(confirm("일기를 삭제하시겠습니까?")){
        e.target.parentElement.parentElement.remove()
      } else { return };
    });


    diaryCardBody.append(diaryDiv);
    document.querySelector(".add-diary-div").remove();
}

// 다이어리 취소 버튼 클릭
function closeAddDiary(){
  // 입력창 삭제
  const addDiaryDiv = document.querySelector('.add-diary-div');
  addDiaryDiv.remove();
}

// 작업중이 아닌 다이어리 비활성화
function closeAllDiary() {
  const diarys = document.querySelectorAll(".diary");
  const addDiaryDiv = document.querySelector(".add-diary-div");

  // 추가중인 다이어리 닫기
  if (addDiaryDiv) closeAddDiary();

  diarys.forEach((diary) => {
    const phrase = diary.querySelector(".diary-content-phrase");
    const textarea = diary.querySelector(".diary-content-textarea");
    const editBtn = diary.querySelector(".edit-diary");
    const doneBtn = diary.querySelector(".edit-diary-done");

    if (!textarea || !phrase) return;

    // 수정 중이면 저장 후 닫기
    if (!textarea.classList.contains("hidden")) {
      phrase.textContent = textarea.value.trim() || phrase.textContent;

      textarea.classList.add("hidden");
      phrase.classList.remove("hidden");

      editBtn.classList.remove("!hidden");
      doneBtn.classList.add("!hidden");
    }
  });
}

