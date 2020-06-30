class Question {
  constructor() {
    this.flashcard = new FlashCard();
    this.handleForm = this.handleForm.bind(this);
  }

  handleAddQues(addBtn, questionDiv) {
    addBtn.classList.add("hide");

    questionDiv.innerHTML = `
    <div class="card">
      <div class="close-box">x</div>
      <form id="question">
        <label for="question">Question</label>
        <textarea name="question" id="question" cols="20" rows="5"></textarea>
        <br />
        <label for="answer">Answer</label>
        <textarea name="answer" id="answer" cols="20" rows="5"></textarea>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
    `;

    const form = document.getElementById("question");
    const closeIcon = document.querySelector(".close-box");
    form.addEventListener("submit", this.handleForm);
    closeIcon.addEventListener("click", this.handleCloseBox);
  }

  handleCloseBox(e) {
    const card = e.target.parentNode;
    addQues.classList.remove("hide");
    card.style.display = "none";
  }

  handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const question = e.target.question.value;
    const answer = e.target.answer.value;
    const inputFields = Array.from(form.querySelectorAll("textarea"));
    const { q, a } = this.validateInput(question, answer);

    inputFields.forEach((field) => {
      if (field.classList.contains("invalid")) {
        field.classList.remove("invalid");
      }
    });

    if (q && a) {
      flashcard.newFlashCard(question, answer);
      flashcard.showFlashCards();
      this.handleCloseBox(e);
    } else {
      if (!q && !a) {
        this.handleMsg();
        inputFields.forEach((field) => {
          field.classList.add("invalid");
        });
      } else if (!q) {
        this.handleMsg();
        inputFields[0].classList.add("invalid");
      } else if (!a) {
        this.handleMsg();
        inputFields[1].classList.add("invalid");
      }

      form.addEventListener("submit", this.handleForm);
    }
  }

  validateInput(q, a) {
    const re = /^[a-z,.\s\W]{3,60}$/i;
    const validQuestion = re.test(q);
    const validAnswer = re.test(a);
    return { q: validQuestion, a: validAnswer };
  }

  handleMsg() {
    const msgBox = document.querySelector("#msg-box");
    const msg = "Sorry, must be between 5 to 40 characters";

    msgBox.classList.remove("hide");
    msgBox.innerHTML = msg;

    setTimeout(() => {
      msgBox.classList.add("hide");
    }, 3000);
  }
}
