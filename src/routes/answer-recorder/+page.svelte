<script>
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // --- Writable Stores for Answer Data ---
  const answerDataStore = writable([]);
  const currentQuestionStore = writable(1);
  const reviewModeEnabledStore = writable(false);

  // --- Load Data from Local Storage on Mount (Client-Side Only) ---
  onMount(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedAnswerData = localStorage.getItem('answerData');
      if (storedAnswerData) {
        answerDataStore.set(JSON.parse(storedAnswerData));
      }
      const storedCurrentQuestion = localStorage.getItem('currentQuestion');
      if (storedCurrentQuestion) {
        currentQuestionStore.set(parseInt(storedCurrentQuestion, 10));
      }
      const storedReviewMode = localStorage.getItem('reviewModeEnabled');
      if (storedReviewMode) {
        reviewModeEnabledStore.set(storedReviewMode === 'true');
      }
    }
    startTimer();
  });

  // --- Update Local Storage on Store Changes (Client-Side Only) ---
  answerDataStore.subscribe(value => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('answerData', JSON.stringify(value));
    }
  });
  currentQuestionStore.subscribe(value => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('currentQuestion', value);
    }
  });
  reviewModeEnabledStore.subscribe(value => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('reviewModeEnabled', value ? 'true' : 'false');
    }
  });

  // --- Reactive Variables ---
  let answerChoices = ['a', 'b', 'c', 'd', 'e'];
  let questionStartTime;
  let timeElapsed = 0;
  let timerInterval;

  $: currentQuestion = $currentQuestionStore;
  $: reviewModeEnabled = $reviewModeEnabledStore;
  $: answerData = $answerDataStore;
  $: currentAnswer = answerData.find(item => item.question === currentQuestion)?.answer || '';
  $: isCorrect = answerData.find(item => item.question === currentQuestion)?.correct;

  $: totalQuestions = answerData.length;
  $: correctQuestions = answerData.filter(item => item.correct === true).length;
  $: incorrectQuestions = answerData.filter(item => item.correct === false).length;
  $: percentageCorrect = totalQuestions > 0 
    ? Math.round((correctQuestions / totalQuestions) * 100) 
    : 0;

  // --- Functions ---

  function startTimer() {
    questionStartTime = Date.now();
    // Clear existing timer before starting a new one to prevent multiple timers
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeElapsed = Math.floor((Date.now() - questionStartTime) / 1000);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function recordAnswer(answer) {
    stopTimer();
    const existingEntryIndex = answerData.findIndex(item => item.question === currentQuestion);
    if (existingEntryIndex !== -1) {
      answerDataStore.update(data => {
        // Preserve existing 'correct' status if it exists
        data[existingEntryIndex] = { ...data[existingEntryIndex], answer, time: timeElapsed };
        return data;
      });
    } else {
      answerDataStore.update(data => [...data, { question: currentQuestion, answer, time: timeElapsed, correct: undefined }]);
    }
    currentQuestionStore.update(n => n + 1);
    answerChoices = ['a', 'b', 'c', 'd', 'e'];
    // Reset timeElapsed immediately AFTER recording, before starting new timer
    timeElapsed = 0;
    startTimer(); // Start timer for the *new* question
  }


  function addAnswerChoice() {
    if (answerChoices.length < 26) {
      const nextLetter = String.fromCharCode(97 + answerChoices.length);
      answerChoices = [...answerChoices, nextLetter];
    }
  }

  function toggleReviewMode() {
    reviewModeEnabledStore.update(currentValue => {
      const newValue = !currentValue;
      if (newValue) { // Switching TO review mode
        const currentAnswerData = get(answerDataStore);
        // Find the first question *in the answered data* that hasn't been marked (correct is undefined)
        // Sort by question number just in case data isn't perfectly ordered
        const firstUnmarkedEntry = currentAnswerData
                                    .slice() // Create a copy to avoid modifying the original store order during sort
                                    .sort((a, b) => a.question - b.question)
                                    .find(item => item.correct === undefined);

        // If an unmarked question exists, go to it. Otherwise, default to question 1.
        const targetQuestion = firstUnmarkedEntry ? firstUnmarkedEntry.question : 1;
        currentQuestionStore.set(targetQuestion);
        stopTimer(); // Stop timer in review mode
        timeElapsed = answerData.find(item => item.question === targetQuestion)?.time || 0; // Load time for review
      } else { // Switching FROM review mode (back to answering)
         // Find the highest numbered question answered + 1, or 1 if no answers yet
         const highestAnswered = answerData.reduce((max, item) => Math.max(max, item.question), 0);
         const nextQuestion = highestAnswered + 1;
         currentQuestionStore.set(nextQuestion);
         timeElapsed = 0; // Reset timer for new answering session
         startTimer();
      }
      // Always return the new state for the store update
      return newValue;
    });
  }


  function markCorrect(correct) {
    answerDataStore.update(data => {
      const entryIndex = data.findIndex(item => item.question === currentQuestion);
      if (entryIndex !== -1) {
        data[entryIndex] = { ...data[entryIndex], correct };
      }
      return data;
    });
    if (correct === true || correct === false) {
       currentQuestionStore.update(n => n + 1);
    }
  }

 function resetData() {
    if (confirm('Are you sure you want to reset all data?')) {
      stopTimer(); // Stop timer before resetting
      answerDataStore.set([]);
      currentQuestionStore.set(1);
      reviewModeEnabledStore.set(false);
      answerChoices = ['a', 'b', 'c', 'd', 'e'];
      timeElapsed = 0;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('answerData');
        localStorage.removeItem('currentQuestion');
        localStorage.removeItem('reviewModeEnabled');
      }
       startTimer(); // Restart timer for the fresh question 1
    }
  }


  // --- Lifecycle Hooks ---
  // This effect handles timer updates when navigating between questions
  $: {
    if (typeof window !== 'undefined') { // Ensure this only runs client-side
        const currentAnswerEntry = answerData.find(item => item.question === currentQuestion);
        if (!reviewModeEnabled) {
            // In answer mode, always restart the timer for the current question
            stopTimer();
            timeElapsed = currentAnswerEntry?.time || 0; // Load existing time if re-visiting
            startTimer();
        } else {
            // In review mode, just display the recorded time, don't run the timer
            stopTimer();
            timeElapsed = currentAnswerEntry?.time || 0;
        }
    }
  }

</script>
<main>
  <div class="flex justify-center">
    <p class="text-2xl">Current Question: {currentQuestion} </p>
  </div>

  <p class="text-center">{timeElapsed}s</p>
{#if !reviewModeEnabled}
<div class="answer-choices">
{#each answerChoices as choice}
<button
onclick={() => recordAnswer(choice)}
class:selected={currentAnswer === choice}
disabled={answerData.some(item => item.question === currentQuestion)}
>
{choice.toUpperCase()}
</button>
{/each}
</div>
{#if answerChoices.length < 26}
<div class="flex justify-center p-3">
<button onclick={addAnswerChoice}>Add Choice</button>
</div>
{/if}
{:else}
<div class="review-controls">
<p>Your answer: {currentAnswer.toUpperCase() || 'Not answered'}</p>
{#if currentAnswer}
<button onclick={() => markCorrect(true)} class:correct={isCorrect === true}>✅</button>
<button onclick={() => markCorrect(false)} class:incorrect={isCorrect === false}>❌</button>
<button onclick={() => markCorrect(undefined)} class:unmarked={isCorrect === undefined}>Unmarked</button>
{/if}
{#if !currentAnswer}
<p style="color: grey;">(No answer recorded for this question)</p>
{/if}
</div>
{/if}
  <div class="navigation">
    <button disabled={currentQuestion === 1} onclick={() => currentQuestionStore.update(n => Math.max(1, n - 1))}>Back</button>
    <button onclick={() => currentQuestionStore.update(n => n + 1)}>Next</button>
  </div>
  <div class="flex justify-center p-3">
  <button onclick={toggleReviewMode}>
    { reviewModeEnabled ? 'Switch to Answer Mode' : 'Switch to Review Mode' }
  </button>
  </div>
  <h2 class="text-2xl text-center">
    Answer Summary 
    <span class="text-sm text-gray-600 ml-4">
      (Correct: {correctQuestions}/{totalQuestions}, {percentageCorrect}%)
    </span>
  </h2>
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gray-100">
        <th class="border p-2">Question</th>
        <th class="border p-2">Answer</th>
        <th class="border p-2">Time</th>
        <th class="border p-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {#each [...answerData].sort((a, b) => b.question - a.question) as item}
        <tr class:bg-green-100={item.correct === true} class:bg-red-100={item.correct === false}>
          <td class="border p-2 text-center">{item.question}</td>
          <td class="border p-2 text-center">{item.answer?.toUpperCase() || 'N/A'}</td>
          <td class="border p-2 text-center">{item.time !== undefined ? `${item.time}s` : 'N/A'}</td>
          <td class="border p-2 text-center">
            {#if item.answer !== undefined}
              {item.correct === true ? '✅' : item.correct === false ? '❌' : '❓'}
            {:else}
              '-'
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
<button onclick={resetData} class="reset-button">Reset All Data</button>
</main>
<style>
  main {
    font-family: sans-serif;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .answer-choices {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .answer-choices button {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .answer-choices button:disabled {
     opacity: 0.6;
     cursor: not-allowed;
     background-color: #eee;
  }

  .answer-choices button.selected:disabled {
    background-color: #007bff; /* Keep selected style even if disabled */
    color: white;
    border-color: #007bff;
    opacity: 1; /* Ensure selected looks normal */
  }

   .answer-choices button.selected {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  .review-controls {
    margin-bottom: 20px;
    text-align: center;
  }

  .review-controls button {
    padding: 8px 12px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
  }

  .review-controls button.correct {
    background-color: #28a745;
    color: white;
    border: 2px solid #28a745;
  }
   .review-controls button:not(.correct) {
     border: 2px solid transparent; /* Placeholder border */
   }

  .review-controls button.incorrect {
    background-color: #dc3545;
    color: white;
     border: 2px solid #dc3545;
  }
   .review-controls button:not(.incorrect) {
     border: 2px solid transparent;
   }


  .review-controls button.unmarked {
    background-color: #ffc107;
    color: #212529;
    border: 2px solid #ffc107;
  }
   .review-controls button:not(.unmarked) {
     border: 2px solid transparent;
   }

  .navigation {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
  }

  button {
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .navigation button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .reset-button {
    display: block;
    width: 200px;
    margin: 20px auto;
    padding: 10px 15px;
    border: 1px solid #dc3545;
    border-radius: 5px;
    background-color: white;
    color: #dc3545;
    cursor: pointer;
    font-size: 1em;
  }
</style>