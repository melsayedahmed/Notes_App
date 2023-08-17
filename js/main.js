const add = document.querySelector(".add"),
  popup = document.querySelector(".popup-app"),
  titlePopup = popup.querySelector(".header_popup h4"),
  close = popup.querySelector(".close"),
  textarea = document.querySelector("textarea"),
  button = document.querySelector("button"),
  input = document.querySelector("input"),
  audio = new Audio("../audios/suc.mp3");

let idEdit,
  isEdit = false;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
// handle show popup
add.addEventListener("click", () => {
  popup.classList.add("open");
  button.innerText = "أضف";
  titlePopup.innerText = "أضف ملحوظة جديدة";
  textarea.value = "";
  input.value = "";
});
// handle close popup
close.addEventListener("click", () => {
  popup.classList.remove("open");
  isEdit = false;
});

// handle add Note
button.addEventListener("click", addNote);

function addNote(e) {
  e.preventDefault();
  let title = input.value.trim(),
    description = textarea.value.trim();
  if (title && description) {
    let date = new Date(),
      month = months[date.getMonth()],
      day = date.getDate(),
      year = date.getFullYear();
    let noteInfo = {
      title,
      description,
      date: `${month}, ${day}, ${year}`,
    };
    if (isEdit) {
      notes[idEdit] = noteInfo;
      isEdit = false;
    } else {
      notes.push(noteInfo);
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    audio.play();
    showNotes();
    close.click();
  }
}
// handle show notes
function showNotes() {
  document.querySelectorAll(".card").forEach((card) => card.remove());
  if (!notes) return;
  notes.forEach((note, idx) => {
    let card = `
        <div class="card card-style">
        <div class="card_content">
        <h4>${note.title}</h4>
        <p>
        ${note.description}
       </p>      
    </div>
        <div class="card_details">
        <span class="date">${note.date}</span>
        <div class="menu-app">
            <i class="bx bx-dots-horizontal-rounded"></i>
            <ul class="menu">
              <li onclick="editNote(${idx}, '${note.title}', '${note.description}')"><i class="bx bx-edit-alt"></i> تعديل</li>
              <li onclick="removeNote(${idx})"><i class="bx bx-trash-alt"></i> حذف</li>
            </ul>
          </div>
        </div>
      </div>
      `;
    add.insertAdjacentHTML("afterend", card);
  });
}
showNotes();
// handle remove note
function removeNote(idNote) {
  let confrimD = confirm("هل انت متأكد من حذف الملحوظه ؟");
  if (!confrimD) return;
  notes.splice(idNote, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

// handle edit note
function editNote(idNote, title, description) {
  isEdit = true;
  idEdit = idNote;
  add.click();
  titlePopup.innerText = "تحديث الملاحظه";
  button.innerText = "تحديث";
  textarea.value = description;
  input.value = title;
}
