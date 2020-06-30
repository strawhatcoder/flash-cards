class FlashCard {
  constructor() {
    this.flashcards = document.getElementById("flashcards");
    this.handleEdit = this.handleEdit.bind(this);
  }

  // Show exisiting cards
  anyFlashCards() {
    if (localStorage.length > 0) {
      this.showFlashCards();
    }
  }

  // Create a new flash card
  newFlashCard(q, a) {
    localStorage.setItem(q, a);
  }

  // Retrieve all flash cards
  showFlashCards() {
    const keys = Object.keys(localStorage);
    this.flashcards.innerHTML = "";

    keys.forEach((question) => {
      this.flashcards.innerHTML += `
      <div class="card">
        <h1 class="question">${question}</h1>
        <a id="show-hide" href="#">Show Answer</a>
        <div id="answer" class="hide">${localStorage.getItem(question)}</div>
        <div class="action-buttons">
          <button id="edit">Edit</button>
          <button id="delete">Delete</button>
        </div>
      </div>
      `;
    });

    const answerBtn = document.querySelectorAll("#show-hide");
    const editBtn = document.querySelectorAll("#edit");
    const deleteBtn = document.querySelectorAll("#delete");

    answerBtn.forEach((btn) => {
      btn.addEventListener("click", this.handleAnswer);
    });
    editBtn.forEach((btn) => {
      btn.addEventListener("click", this.handleEdit);
    });
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", this.handleDelete);
    });
  }

  // Show/Hide Answer
  handleAnswer(e) {
    let question = e.currentTarget.previousElementSibling;
    let display = e.currentTarget;
    let answer = e.currentTarget.nextElementSibling;
    answer.classList.toggle("hide");
    if (!answer.classList.contains("hide")) {
      question.classList.add("hide");
      display.innerHTML = "Hide Answer";
    } else {
      question.classList.remove("hide");
      display.innerHTML = "Show Answer";
    }
  }

  // Edit Card
  handleEdit(e) {
    let card = e.target.parentNode.parentNode;
    const originalQuest =
      e.target.parentNode.parentNode.firstElementChild.innerHTML;
    const originalAns = e.target.parentNode.previousElementSibling.innerHTML;
    card.innerHTML = `
    <form id="edit-form">
      <h3>Edit</h3>
      <input type="text" id="question" value="${originalQuest}">
      <br />
      <input type="text" id="answer" value="${originalAns}">
      <br />
      <div class="action-buttons">
          <button id="edit-save">Save</button>
          <button id="edit-cancel">Cancel</button>
        </div>
    </form>
    `;

    const saveBtns = document.querySelectorAll("#edit-save");
    const cancelBtns = document.querySelectorAll("#edit-cancel");

    saveBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleSave(e, originalQuest);
      });
    });

    cancelBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleCancel(e, originalQuest);
      });
    });
  }

  // Delete Card
  handleDelete(e) {
    let question =
      e.currentTarget.parentNode.parentNode.firstElementChild.innerHTML;
    const card = e.currentTarget.parentNode.parentNode;
    localStorage.removeItem(question);
    card.remove();
  }

  // Edit Cancel
  handleCancel(e, q) {
    let card = e.target.parentNode.parentNode.parentNode;
    card.innerHTML = `
    <h1 class="question">${q}</h1>
    <a id="show-hide" href="#">Show Answer</a>
    <div id="answer" class="hide">${localStorage.getItem(q)}</div>
    <div class="action-buttons">
      <button id="edit">Edit</button>
      <button id="delete">Delete</button>
    </div>
    `;

    this.showFlashCards();
  }

  // Edit Save
  handleSave(e, q) {
    localStorage.removeItem(q);
    const newQuestion = e.target.parentNode.parentNode.question.value;
    const newAnswer = e.target.parentNode.parentNode.answer.value;
    this.newFlashCard(newQuestion, newAnswer);
    this.showFlashCards();
  }
}
