import { ac as ensure_array_like, a2 as escape_html, a6 as attr, T as pop, Q as push } from "../../../chunks/index.js";
const questionData = [];
function _page($$payload, $$props) {
  push();
  let currentQuestionIndex = 0;
  let currentQuestion = questionData[currentQuestionIndex];
  let selectedAnswer = null;
  let questionStates = questionData.map(() => "unseen");
  let currentQuestionState = questionStates[currentQuestionIndex];
  let correctCount = 0;
  let incorrectCount = 0;
  let questionTimers = questionData.map(() => null);
  let questionTimes = questionData.map(() => 0);
  let startTime = 0;
  let displayTime = 0;
  function startTimer() {
    startTime = Date.now();
    questionTimers[currentQuestionIndex] = setInterval(
      () => {
        displayTime = (Date.now() - startTime + questionTimes[currentQuestionIndex]) / 1e3;
      },
      1e3
    );
  }
  if (questionStates[currentQuestionIndex] === "unseen") {
    questionStates[currentQuestionIndex] = "seen";
    startTimer();
  } else if (questionStates[currentQuestionIndex] === "seen" && questionStates[currentQuestionIndex] !== "answered-correct" && questionStates[currentQuestionIndex] !== "answered-incorrect") {
    startTimer();
  }
  const each_array = ensure_array_like(Object.entries(currentQuestion["Answer Choices"]));
  $$payload.out += `<main class="svelte-1o82kc"><p>Correct: ${escape_html(correctCount)} / ${escape_html(incorrectCount + correctCount)} or ${escape_html((correctCount / (incorrectCount + correctCount) * 100).toFixed(2))}%</p> `;
  if (questionStates[currentQuestionIndex] === "answered-correct" || questionStates[currentQuestionIndex] === "answered-incorrect") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<p>Time Spent: ${escape_html((questionTimes[currentQuestionIndex] / 1e3).toFixed(0))} seconds</p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p>Time Spent: ${escape_html(displayTime.toFixed(0))} seconds</p>`;
  }
  $$payload.out += `<!--]--> <button>Previous Question</button> <button>Next Question</button> <h1>${escape_html(currentQuestion["Item #"])}</h1> <p>${escape_html(currentQuestion["Question Text"])}</p> <div><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [key, value] = each_array[$$index];
    $$payload.out += `<label class="svelte-1o82kc"><input type="radio" name="answer"${attr("value", key)}${attr("checked", selectedAnswer === key, true)}${attr("disabled", currentQuestionState === "answered-correct" || currentQuestionState === "answered-incorrect", true)}> ${escape_html(key)}: ${escape_html(value)}</label> <br>`;
  }
  $$payload.out += `<!--]--></div> <button${attr("disabled", currentQuestionState === "answered-correct" || currentQuestionState === "answered-incorrect", true)}>Check Answer</button> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->  <button>Next Question</button></main>`;
  pop();
}
export {
  _page as default
};
