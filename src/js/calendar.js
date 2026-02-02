document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const modalWrapper = document.querySelector("#calendar-modal-wrapper");
  const modalBox = document.querySelector("#calendar-modal-box");

  const saveBtn = document.querySelector("#save-btn");
  const confirmBtn = document.querySelector("#confirm-btn");

  const titleInput = document.querySelector("#event-title");
  const deleteBtn = document.querySelector("#delete-btn");

  let clickedDate = null;
  let selectedEvent = null;

  // 모달 열기 함수
  function openModal() {
    modalWrapper.classList.remove("!hidden");
    modalWrapper.classList.add("flex");
  }

  // 모달 닫기 함수
  function closeModal() {
  modalWrapper.classList.add("!hidden");
  modalWrapper.classList.remove("flex");

  titleInput.value = "";
  selectedEvent = null;
  clickedDate = null;

  deleteBtn.classList.add("!hidden"); // 항상 초기화
  saveBtn.textContent = "저장";
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: "auto",
    selectable: true,

    // 날짜 클릭 → 추가 모드
    dateClick: function (info) {
    if (!info.jsEvent.target.classList.contains("fc-daygrid-day-number")) {
      return; // 숫자가 아니면 무시
      }
      clickedDate = info.dateStr;
      selectedEvent = null;

      titleInput.value = "";

      saveBtn.textContent = "저장";
      confirmBtn.textContent = "취소";

      deleteBtn.classList.add("!hidden"); // 삭제 숨김

      openModal();
    },

    // 일정 클릭 → 수정 모드
    eventClick: function (info) {
      selectedEvent = info.event;

      titleInput.value = selectedEvent.title;

      saveBtn.textContent = "수정";
      confirmBtn.textContent = "취소";

      deleteBtn.classList.remove("!hidden"); // 삭제 보이기

      openModal();
    },
  });

  // 저장/수정 버튼 클릭
  saveBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (!title) return;

    // 수정 모드
    if (selectedEvent) {
      selectedEvent.setProp("title", title);
    }

    // 추가 모드
    else if (clickedDate) {
      calendar.addEvent({
        title: title,
        start: clickedDate,
        allDay: true,
      });
    }

    closeModal();
  });

  // 취소 버튼 → 아무것도 안 바꾸고 닫기
  confirmBtn.addEventListener("click", () => {
    closeModal();
  });

  // 일정 삭제
  deleteBtn.addEventListener("click", () => {
    if (selectedEvent) {
      if(confirm("일정을 삭제하시겠습니까?")){
        selectedEvent.remove(); // FullCalendar 삭제
      } else {
        return;
      }
    }
    closeModal();
  });

  // 바깥 검은 배경 클릭 시 닫기
  modalWrapper.addEventListener("click", (e) => {
    if (e.target === modalWrapper) {
      closeModal();
    }
  });

  calendar.render();
});
