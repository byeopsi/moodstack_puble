document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const modalWrapper = document.querySelector("#calendar-modal-wrapper");
  const saveBtn = document.querySelector("#save-btn");

  let clickedDate = null;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: "auto",
    selectable: true,

    dateClick: function (info) {
      clickedDate = info.dateStr;
      modalWrapper.classList.remove("hidden");
      modalWrapper.classList.add("flex");
    },
  });

  saveBtn.addEventListener("click", () => {
    const title = document.querySelector("#event-title").value;

    if (title) {
      calendar.addEvent({
        title: title,
        start: clickedDate,
        allDay: true,
      });
    }

    modalWrapper.classList.add("hidden");
    modalWrapper.classList.remove("flex");

  });

  calendar.render();
});
