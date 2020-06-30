const flashcard = new FlashCard();
const question = new Question();
const addQues = document.getElementById("add-question");
const questionBox = document.getElementById("question-box");

flashcard.anyFlashCards();
addQues.addEventListener("click", function () {
  question.handleAddQues(this, questionBox);
});
