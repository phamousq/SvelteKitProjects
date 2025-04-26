<script lang="ts">
  import { onMount } from 'svelte';

  // --- State Management with Svelte 5 ---
  let answerData = $state([]);
  let currentQuestion = $state(1);
  let reviewModeEnabled = $state(false);

  // --- Derived State ---
  let totalQuestions = $derived(answerData.length);
  let correctQuestions = $derived(answerData.filter(item => item.correct === true).length);
  let incorrectQuestions = $derived(answerData.filter(item => item.correct === false).length);
  let percentageCorrect = $derived(totalQuestions > 0 
    ? Math.round((correctQuestions / totalQuestions) * 100) 
    : 0);

  let maxRecordedQuestion = $derived(Math.max(...answerData.map(item => item.question), 0));

  // --- Local Storage Management ---
  function saveToLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('answerData', JSON.stringify(answerData));
      localStorage.setItem('currentQuestion', currentQuestion.toString());
      localStorage.setItem('reviewModeEnabled', reviewModeEnabled.toString());
    }
  }

  // --- Reactive Derived Values ---
  let answerChoices = $state(['a', 'b', 'c', 'd', 'e']);
  let questionStartTime: number;
  let timeElapsed = $state(0);
  let timerInterval: number | null = null;

  let currentAnswer = $derived(answerData.find(item => item.question === currentQuestion)?.answer || '');
  let isCorrect = $derived(answerData.find(item => item.question === currentQuestion)?.correct);

  // --- Lifecycle and Side Effects ---
  onMount(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedAnswerData = localStorage.getItem('answerData');
      const storedCurrentQuestion = localStorage.getItem('currentQuestion');
      const storedReviewMode = localStorage.getItem('reviewModeEnabled');

      if (storedAnswerData) answerData = JSON.parse(storedAnswerData);
      if (storedCurrentQuestion) currentQuestion = parseInt(storedCurrentQuestion, 10);
      if (storedReviewMode) reviewModeEnabled = storedReviewMode === 'true';
    }
    startTimer();

    // Reactive save to local storage
    $effect(() => {
      saveToLocalStorage();
    });
  });

  // --- Timer Functions ---
  function startTimer() {
    questionStartTime = Date.now();
    // Clear existing timer before starting a new one to prevent multiple timers
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeElapsed = Math.floor((Date.now() - questionStartTime) / 1000);
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
  }

  // --- Answer Recording Functions ---
  function recordAnswer(answer: string) {
    stopTimer();
    const existingEntryIndex = answerData.findIndex(item => item.question === currentQuestion);
    if (existingEntryIndex !== -1) {
      // Preserve existing 'correct' status if it exists
      answerData[existingEntryIndex] = { ...answerData[existingEntryIndex], answer, time: timeElapsed };
    } else {
      answerData = [...answerData, { question: currentQuestion, answer, time: timeElapsed, correct: undefined }];
    }
    currentQuestion += 1;
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
    reviewModeEnabled = !reviewModeEnabled;
    if (reviewModeEnabled) { // Switching TO review mode
      // Find the first question *in the answered data* that hasn't been marked (correct is undefined)
      const firstUnmarkedEntry = answerData
                                  .slice() // Create a copy to avoid modifying the original store order during sort
                                  .sort((a, b) => a.question - b.question)
                                  .find(item => item.correct === undefined);

      // If an unmarked question exists, go to it. Otherwise, default to question 1.
      currentQuestion = firstUnmarkedEntry ? firstUnmarkedEntry.question : 1;
      stopTimer(); // Stop timer in review mode
      timeElapsed = answerData.find(item => item.question === currentQuestion)?.time || 0; // Load time for review
    } else { // Switching FROM review mode (back to test mode)
       // Find the highest numbered question answered + 1, or 1 if no answers yet
       const highestAnswered = answerData.reduce((max, item) => Math.max(max, item.question), 0);
       currentQuestion = highestAnswered + 1;
       timeElapsed = 0; // Reset timer for new test session
       startTimer();
    }
  }

  function markCorrect(correct: boolean | undefined) {
    const entryIndex = answerData.findIndex(item => item.question === currentQuestion);
    if (entryIndex !== -1) {
      answerData[entryIndex] = { ...answerData[entryIndex], correct };
    }
    if (correct === true || correct === false) {
      // If this is the last question, switch back to test mode
      if (currentQuestion === answerData.length) {
        reviewModeEnabled = false;
      }
      currentQuestion += 1;
    }
  }

  function resetData() {
    if (confirm('Are you sure you want to reset all data?')) {
      stopTimer(); // Stop timer before resetting
      answerData = [];
      currentQuestion = 1;
      reviewModeEnabled = false;
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

  function undoLastAnswer() {
    if (answerData.length > 0) {
      // Remove the last answer entry
      answerData = answerData.slice(0, -1);
      
      // Go back to the previous question
      if (currentQuestion > 1) {
        currentQuestion -= 1;
      }
      
      // Restart timer for the previous question
      timeElapsed = 0;
      startTimer();
    }
  }

  function recordGuessAnswer() {
    recordAnswer('?');
  }

  // Timer and Question Navigation Effect
  $effect(() => {
    if (typeof window !== 'undefined') { // Ensure this only runs client-side
      const currentAnswerEntry = answerData.find(item => item.question === currentQuestion);
      if (!reviewModeEnabled) {
        // In test mode, always restart the timer for the current question
        stopTimer();
        timeElapsed = currentAnswerEntry?.time || 0; // Load existing time if re-visiting
        startTimer();
      } else {
        // In review mode, just display the recorded time, don't run the timer
        stopTimer();
        timeElapsed = currentAnswerEntry?.time || 0;
      }
    }
  });

  // Modify the navigation logic to respect max answered questions
  $effect(() => {
    if (reviewModeEnabled && currentQuestion > answerData.length) {
      currentQuestion = answerData.length;
    }
  });
</script>
<main>
  <div class="flex justify-center p-3">
    <button onclick={toggleReviewMode}>
      { reviewModeEnabled ? 'Switch to Test Mode' : 'Switch to Review Mode' }
    </button>
  </div>
  <div class="flex justify-center">
    <p class="text-4xl pb-2">
      Question:
      <span class="bg-orange-300 text-black px-2 py-1 rounded">{currentQuestion}</span> 
      {#if reviewModeEnabled}
      <span class="text-4xl bg-yellow-300 text-black px-2 py-1 rounded">{currentAnswer.toUpperCase() || 'Not answered'}</span>
      {/if}
      <span class="text-sm text-gray-600 ml-4">{timeElapsed}s</span>
    </p>
  </div>
{#if !reviewModeEnabled}
<div class="answer-choices flex flex-col items-center">
  <div class="flex space-x-2 mb-2">
    {#each answerChoices as choice}
    <button
      onclick={() => recordAnswer(choice)}
      class="
        px-4 py-2 
        {currentAnswer === choice 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
        rounded 
        transition-colors 
        duration-200
      "
      disabled={answerData.some(item => item.question === currentQuestion)}
    >
      {choice.toUpperCase()}
    </button>
    {/each}
  </div>
  <div class="flex space-x-2">
    <button
      onclick={recordGuessAnswer}
      class="
        px-4 py-2 
        {currentAnswer === '?' 
          ? 'bg-yellow-500 text-white' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
        rounded 
        transition-colors 
        duration-200
      "
      disabled={answerData.some(item => item.question === currentQuestion)}
    >
      ❓ Guess
    </button>
    <button
      onclick={undoLastAnswer}
      class="
        px-4 py-2 
        bg-gray-200 text-gray-800 
        hover:bg-gray-300 
        rounded 
        transition-colors 
        duration-200
      "
      disabled={answerData.length === 0}
    >
      ↩️ Undo
    </button>
  </div>
  {#if answerChoices.length < 26}
  <div class="flex justify-center pb-3 mt-2">
    <button 
      onclick={addAnswerChoice}
      class="
        px-4 py-2 
        hover:bg-green-300 
        rounded 
        transition-colors 
        duration-200
      "
    >
      Add Choice
    </button>
  </div>
  {/if}
</div>
{:else}
<div class="review-controls flex flex-col items-center space-y-4">
  
  {#if currentAnswer}
  <div class="flex space-x-4">
    <button 
      onclick={() => markCorrect(true)} 
      class="
        text-4xl w-56 h-24 rounded-full 
        bg-green-200
        hover:bg-green-300 
        focus:outline-none focus:ring-4 focus:ring-green-300 
        transition-all duration-200 
        flex items-center justify-center
        {isCorrect === true ? 'ring-4 ring-green-700' : ''}
      "
    >
      ✅
    </button>
    <button 
      onclick={() => markCorrect(false)} 
      class="
        text-4xl w-56 h-24 rounded-full 
        bg-red-200
        hover:bg-red-300 
        focus:outline-none focus:ring-4 focus:ring-red-300 
        transition-all duration-200 
        flex items-center justify-center
        {isCorrect === false ? 'ring-4 ring-red-700' : ''}
      "
    >
      ❌
    </button>
    <!-- <button 
      onclick={() => markCorrect(undefined)} 
      class="
        text-2xl w-24 h-24 rounded-full 
        bg-gray-300 text-gray-700 
        hover:bg-gray-400 
        focus:outline-none focus:ring-4 focus:ring-gray-200 
        transition-all duration-200 
        flex items-center justify-center
        {isCorrect === undefined ? 'ring-4 ring-gray-500' : ''}
      "
    >
      Unmarked
    </button> -->
  </div>
  {/if}
  {#if !currentAnswer}
  <p class="text-gray-500 text-xl">(No answer recorded for this question)</p>
  {/if}
</div>
{/if}
  <div class="navigation">
    <button 
      disabled={currentQuestion === 1} 
      onclick={() => currentQuestion -= 1}
    >
      Back
    </button>
    <button 
      disabled={!reviewModeEnabled || currentQuestion >= answerData.length} 
      onclick={() => currentQuestion += 1}
    >
      Next
    </button>
  </div>

  <h2 class="text-2xl text-center">
    Answer Summary 
    <span class="text-sm text-gray-600 ml-4">
      (Correct: {correctQuestions}/{totalQuestions}, {percentageCorrect}%)
    </span>
    <span class="text-sm text-gray-600 ml-4">
      {timeElapsed}s
    </span>
  </h2>
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gray-200">
        <th class="border p-2">Question</th>
        <th class="border p-2">Answer</th>
        <th class="border p-2">Time (s)</th>
        <th class="border p-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {#each answerData.slice().sort((a, b) => b.question - a.question) as entry (entry.question)}
        <tr 
          class:bg-yellow-100={entry.question === currentQuestion} 
          class="hover:bg-gray-50 transition-colors"
        >
          <td class="border p-2 text-center">{entry.question}</td>
          <td class="border p-2 text-center">{entry.answer?.toUpperCase() || 'N/A'}</td>
          <td class="border p-2 text-center">{entry.time || 0}</td>
          <td class="border p-2 text-center">
            {#if entry.correct === true}
              <span class="text-green-600">✅ Correct</span>
            {:else if entry.correct === false}
              <span class="text-red-600">❌ Incorrect</span>
            {:else}
              <span class="text-gray-500">Unmarked</span>
            {/if}
          </td>
        </tr>
      {/each}
      {#if answerData.length > 0}
      <tr class="bg-blue-50 font-bold">
        <td class="border p-2 text-center">Total</td>
        <td class="border p-2 text-center">
          {answerData.filter(entry => entry.answer).length} / {answerData.length}
        </td>
        <td class="border p-2 text-center">
          {Math.round(answerData.reduce((sum, entry) => sum + (entry.time || 0), 0))}
        </td>
        <td class="border p-2 text-center">
          <span class="text-green-600">✅ {correctQuestions}</span> 
          <span class="text-red-600 ml-2">❌ {incorrectQuestions}</span>
          <span class="text-gray-500 ml-2">❓ {totalQuestions - correctQuestions - incorrectQuestions}</span>
        </td>
      </tr>
      {/if}
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