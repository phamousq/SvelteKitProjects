<script lang="ts">
  import { onMount } from 'svelte';

  // --- State Management with Svelte 5 ---
  let answerData = $state([]);
  let currentQuestion = $state(1);
  let reviewModeEnabled = $state(false);
  let currentDate = $state(new Date());
  let source = $state('');
  let currentNotes = $state('');
  let answerInput = $state('');
  let AnswerInput: HTMLInputElement;

  // --- Date Filtering ---
  let filteredAnswerData = $derived(filterAnswersByDate(answerData, currentDate));

  // --- Timer State ---
  let questionStartTime: number;
  let timeElapsed = $state(0);
  let timerInterval: number | null = null;
  let answerChoices = $state(['a', 'b', 'c', 'd', 'e']);
  let NotesInput: HTMLInputElement;

  // --- Derived State ---
  let totalQuestions = $derived(answerData.length);
  let filteredTotalQuestions = $derived(filteredAnswerData.length);
  let correctQuestions = $derived(answerData.filter(item => item.correct === 'Correct').length);
  let incorrectQuestions = $derived(answerData.filter(item => item.correct === 'Incorrect').length);
  let percentageCorrect = $derived(totalQuestions > 0 
    ? Math.round((correctQuestions / totalQuestions) * 100) 
    : 0);

  let maxRecordedQuestion = $derived(Math.max(...answerData.map(item => item.question), 0));

  // --- Reactive Derived Values ---
  let currentAnswer = $derived(answerData.find(item => item.question === currentQuestion)?.answer || '');
  let isCorrect = $derived(answerData.find(item => item.question === currentQuestion)?.correct);

  // --- Date Filtering ---
  function filterAnswersByDate(items: any[], date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return items.filter(item => {
      const itemDate = new Date(item.datetime);
      return itemDate >= startOfDay && itemDate <= endOfDay;
    });
  }

  // --- Lifecycle and Side Effects ---
  onMount(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedAnswerData = localStorage.getItem('answerData');
      const storedCurrentQuestion = localStorage.getItem('currentQuestion');
      const storedReviewMode = localStorage.getItem('reviewModeEnabled');
      const storedSource = localStorage.getItem('source');

      if (storedAnswerData) answerData = JSON.parse(storedAnswerData);
      if (storedCurrentQuestion) currentQuestion = parseInt(storedCurrentQuestion, 10);
      if (storedReviewMode) reviewModeEnabled = storedReviewMode === 'true';
      if (storedSource) source = storedSource;
    }
    currentDate.setHours(0, 0, 0, 0);
    startTimer(); // Start timer on mount

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
    const currentTimestamp = new Date();
    const existingEntryIndex = answerData.findIndex(item => item.question === currentQuestion);
    
    if (existingEntryIndex !== -1) {
      // Replace existing entry
      answerData[existingEntryIndex] = { 
        ...answerData[existingEntryIndex], 
        answer, 
        time: timeElapsed,
        datetime: currentTimestamp.toISOString(),
        correct: undefined // Reset correctness when re-answering
      };
    } else {
      // Add new entry
      answerData = [...answerData, { 
        question: currentQuestion, 
        answer, 
        time: timeElapsed, 
        correct: undefined,
        datetime: currentTimestamp.toISOString(), 
        source: source,
        notes: currentNotes
      }];
    }

    // In test mode, always move to next question
    if (!reviewModeEnabled) {
      currentQuestion += 1;
      AnswerInput?.focus();
    }else{
      NotesInput?.focus();
    }

    answerChoices = ['a', 'b', 'c', 'd', 'e'];
    // Reset timeElapsed immediately AFTER recording, before starting new timer
    timeElapsed = 0;
    currentNotes = '';
    startTimer(); // Start timer for the *new* question
  }

  function addAnswerChoice() {
    if (answerChoices.length < 26) {
      const nextLetter = String.fromCharCode(97 + answerChoices.length);
      answerChoices = [...answerChoices, nextLetter];
    }
  }

  $effect(() => {
    if (!reviewModeEnabled) {
      // When switching out of review mode, focus on answer input
      queueMicrotask(() => {
        AnswerInput?.focus();
      });
    }
  });

  function toggleReviewMode() {
    reviewModeEnabled = !reviewModeEnabled;
    // switching to review mode
    if (reviewModeEnabled) {
      // Find the lowest question that hasn't been graded yet
      const ungraded = answerData
        .filter(item => item.correct === undefined)
        .map(item => item.question);
      
      currentQuestion = ungraded.length > 0 
        ? Math.min(...ungraded) 
        : (answerData.length > 0 
          ? Math.max(...answerData.map(item => item.question)) 
          : 1);
      
      queueMicrotask(() => {
        NotesInput?.focus();
      });
      stopTimer();
    } else {
      // When switching to test mode, set current question to next question
      currentQuestion = Math.max(...answerData.map(item => item.question), 0) + 1;
      timeElapsed = 0;
      queueMicrotask(() => {
        AnswerInput?.focus();
      });
      startTimer();
    }
  }

  function markCorrect(correct: string | undefined) {
    const entryIndex = answerData.findIndex(item => item.question === currentQuestion);
    if (entryIndex !== -1) {
      answerData[entryIndex] = { ...answerData[entryIndex], correct };
    }
    
    // Find the next ungraded question
    const ungraded = answerData
      .filter(item => item.correct === undefined)
      .map(item => item.question)
      .filter(q => q > currentQuestion);
    
    if (ungraded.length > 0) {
      // Move to the lowest ungraded question after the current one
      currentQuestion = Math.min(...ungraded);
    } else {
      // If no more ungraded questions, switch back to test mode
      reviewModeEnabled = false;
      currentQuestion = Math.max(...answerData.map(item => item.question), 0) + 1;
      timeElapsed = 0;
      startTimer();
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
      source = '';
      currentNotes = '';
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('answerData');
        localStorage.removeItem('currentQuestion');
        localStorage.removeItem('reviewModeEnabled');
        localStorage.removeItem('source');
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

  // Add a function to get navigable questions in test mode
  function getNavigableQuestions() {
    const sortedQuestions = answerData
      .slice()
      .sort((a, b) => a.question - b.question)
      .map(item => item.question);
    
    // Add the next question after the last answered question
    const maxQuestion = Math.max(...sortedQuestions, 0);
    if (maxQuestion > 0) {
      sortedQuestions.push(maxQuestion + 1);
    }
    
    return sortedQuestions;
  }

  // Modify the existing navigation effect to handle test mode navigation
  $effect(() => {
    if (!reviewModeEnabled) {
      const navigableQuestions = getNavigableQuestions();
      
      // Ensure current question is within navigable questions
      if (currentQuestion > navigableQuestions[navigableQuestions.length - 1]) {
        currentQuestion = navigableQuestions[navigableQuestions.length - 1];
      }
      
      // If current question is not in navigable questions, find the closest
      if (!navigableQuestions.includes(currentQuestion)) {
        const closestQuestion = navigableQuestions.reduce((prev, curr) => 
          Math.abs(curr - currentQuestion) < Math.abs(prev - currentQuestion) ? curr : prev
        );
        currentQuestion = closestQuestion;
      }
    }
  });

  // Reactive effect to update notes when current question changes
  $effect(() => {
    // Find the current question's entry in answerData
    const currentQuestionEntry = answerData.find(item => item.question === currentQuestion);
    
    // Update currentNotes if an entry exists
    currentNotes = currentQuestionEntry?.notes || '';
  });

  // Function to update notes for a specific question
  function updateQuestionNotes() {
    // Find the index of the current question in answerData
    const questionIndex = answerData.findIndex(item => item.question === currentQuestion);
    
    if (questionIndex !== -1) {
      // Create a copy of the existing answer data
      const updatedAnswerData = [...answerData];
      
      // Update the notes for the current question
      updatedAnswerData[questionIndex] = {
        ...updatedAnswerData[questionIndex],
        notes: currentNotes
      };
      
      // Update the answerData
      answerData = updatedAnswerData;

      // Persist to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('answerData', JSON.stringify(answerData));
      }
    }
  }

  // Add an event listener to update notes when input loses focus
  function handleNotesBlur() {
    updateQuestionNotes();
  }

  // --- Date Navigation ---
  function goToPreviousDay() {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    currentDate = newDate;
  }
  
  function goToNextDay() {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    
    // Don't allow going to future dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDate <= today) {
      currentDate = newDate;
    }
  }
  
  function goToToday() {
    currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // --- Local Storage Management ---
  function saveToLocalStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('answerData', JSON.stringify(answerData));
      localStorage.setItem('currentQuestion', currentQuestion.toString());
      localStorage.setItem('reviewModeEnabled', reviewModeEnabled.toString());
      localStorage.setItem('source', source);
    }
  }

  function exportToCsv() {
    // Prepare CSV headers
    const headers = ['Datetime', 'Correctness', 'Time Taken', 'Notes', 'Source'];
    
    // Convert answer data to CSV rows
    const csvRows = answerData.map(item => [
      item.datetime ? new Date(item.datetime).toLocaleString() : '',
      // Mark undefined or null as 'Incorrect'
      item.correct === 'Correct' ? 'Correct' : item.correct === 'Incorrect' ? 'Incorrect' : 'Unmarked',
      `${item.time || 0}s`,
      item.notes || '',
      item.source || ''
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => 
        // Escape commas and quotes
        `"${cell.toString().replace(/"/g, '""')}"`
      ).join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `answer_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Modify navigation functions to ensure notes are updated
  function navigateBack() {
    if (reviewModeEnabled) {
      // In review mode, navigate through filtered data
      const currentIndex = filteredAnswerData.findIndex(item => item.question === currentQuestion);
      if (currentIndex !== -1 && currentIndex > 0) {
        currentQuestion = filteredAnswerData[currentIndex - 1].question;
      }
    } else {
      // In test mode, navigate through answered questions and next question
      const navigableQuestions = getNavigableQuestions();
      const currentIndex = navigableQuestions.indexOf(currentQuestion);
      if (currentIndex > 0) {
        currentQuestion = navigableQuestions[currentIndex - 1];
      }
    }
  }

  function navigateNext() {
    if (reviewModeEnabled) {
      // In review mode, navigate through filtered data
      const currentIndex = filteredAnswerData.findIndex(item => item.question === currentQuestion);
      if (currentIndex !== -1 && currentIndex < filteredAnswerData.length - 1) {
        currentQuestion = filteredAnswerData[currentIndex + 1].question;
      }
    } else {
      // In test mode, navigate through answered questions and next question
      const navigableQuestions = getNavigableQuestions();
      const currentIndex = navigableQuestions.indexOf(currentQuestion);
      if (currentIndex < navigableQuestions.length - 1) {
        currentQuestion = navigableQuestions[currentIndex + 1];
      }
    }
  }

  // --- Keyboard Event Handling ---
  function incrementResult(result: 'Correct' | 'Incorrect') {
    if (currentNotes === '') return;
    markCorrect(result);
  }

  function resetTimer() {
    timeElapsed = 0;
    startTimer();
  }

  function undoLastAction() {
    undoLastAnswer();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey || event.metaKey) {
        // (Shift or meta) + Enter: 
        if (currentNotes === '') return;
        incrementResult('Incorrect');
      } else {
        // Enter: Perform the default action
        incrementResult('Correct');
      }
      event.preventDefault(); // Prevent default form submission
    }
    if (event.key === 'Escape') {
      resetTimer();
    }
    if (event.metaKey && event.key === 'z') {
      undoLastAction();
    }
  }

  function handleAnswerInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Trim and convert to lowercase for case-insensitive matching
      const inputAnswer = answerInput.trim().toLowerCase();
      
      // Find the first answer choice that matches the input
      const matchedChoice = answerChoices.find(choice => 
        choice.toLowerCase() === inputAnswer
      );

      if (matchedChoice) {
        // If a matching choice is found, record the answer
        recordAnswer(matchedChoice);
        
        // Clear the input after recording
        answerInput = '';

        // Focus back on the answer input
        AnswerInput?.focus();
      }

      event.preventDefault();
    }
  }
</script>
<main>
  <!-- Existing content -->
  <div class="flex justify-center p-3">
    <button onclick={toggleReviewMode}>
      { reviewModeEnabled ? 'Switch to Test Mode' : 'Switch to Review Mode' }
    </button>
  </div>
  <div class="source-input-section pb-3">
    <input 
      id="sourceInput" 
      type="text" 
      bind:value={source} 
      placeholder="Enter source for this session"
      class="w-full p-2 border rounded mt-2"
    />
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
    <div class="flex justify-center mt-2">
      <button 
        onclick={addAnswerChoice}
        class="
          px-4
          hover:bg-green-300 
          rounded 
          transition-colors 
          duration-200
        "
      >
        Add Choice
      </button>
    </div>
    <div class="answer-input-section pb-3">
      <input
        bind:this={AnswerInput}
        bind:value={answerInput}
        type="text"
        placeholder="Type answer (a, b, c, etc.)"
        class="w-full p-2 border rounded mt-2"
        onkeydown={handleAnswerInput}
      />
    </div>
    {/if}
  </div>
  {:else}
  <div class="review-controls flex flex-col items-center space-y-4">
  
    {#if currentAnswer}
    <div class="flex space-x-4">
      <button 
        onclick={() => markCorrect('Correct')} 
        class="
          text-4xl w-56 h-24 rounded-full 
          bg-green-200
          hover:bg-green-300 
          focus:outline-none focus:ring-4 focus:ring-green-300 
          transition-all duration-200 
          flex items-center justify-center
          {isCorrect === 'Correct' ? 'ring-4 ring-green-700' : ''}
        "
      >
        ✅
      </button>
      <button 
        onclick={() => markCorrect('Incorrect')} 
        class="
          text-4xl w-56 h-24 rounded-full 
          bg-red-200
          hover:bg-red-300 
          focus:outline-none focus:ring-4 focus:ring-red-300 
          transition-all duration-200 
          flex items-center justify-center
          {isCorrect === 'Incorrect' ? 'ring-4 ring-red-700' : ''}
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

 

  <div class="notes-input-section pb-3">
    <input
      bind:this={NotesInput}
      bind:value={currentNotes}
      type="text"
      placeholder="Enter notes"
      class="w-full p-2 border rounded mt-2"
      onblur={handleNotesBlur}
      onkeydown={handleKeyDown}
    />
  </div>

  <div class="navigation">
    <button 
      disabled={currentQuestion === 1} 
      onclick={navigateBack}
    >
      Back
    </button>
    <button 
      disabled={
        reviewModeEnabled 
          ? currentQuestion >= filteredAnswerData[filteredAnswerData.length - 1]?.question 
          : currentQuestion >= getNavigableQuestions()[getNavigableQuestions().length - 1]
      }
      onclick={navigateNext}
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
        <th class="border p-2">Time</th>
        <th class="border p-2">Notes</th>
        <th class="border p-2">Source</th>
        <th class="border p-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredAnswerData.slice().sort((a, b) => b.question - a.question) as item}
        <tr 
          class:bg-yellow-100={item.question === currentQuestion} 
          class="hover:bg-gray-50 transition-colors"
          class:correct={item.correct === 'Correct'}
          class:incorrect={item.correct === 'Incorrect'}
        >
          <td class="border p-2 text-center">{item.question}</td>
          <td class="border p-2 text-center">{item.answer?.toUpperCase() || 'N/A'}</td>
          <td class="border p-2 text-center">{item.time || 0}s</td>
          <td class="border p-2 text-center">{item.notes || ''}</td>
          <td class="border p-2 text-center">{item.source || ''}</td>
          <td class="border p-2 text-center">
            {#if item.correct === 'Correct'}
              <span class="text-green-600">✅ Correct</span>
            {:else if item.correct === 'Incorrect'}
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
        <td class="border p-2 text-center"></td>
        <td class="border p-2 text-center"></td>
        <td class="border p-2 text-center">
          <span class="text-green-600">✅ {correctQuestions}</span> 
          <span class="text-red-600 ml-2">❌ {incorrectQuestions}</span>
          <span class="text-gray-500 ml-2">❓ {totalQuestions - correctQuestions - incorrectQuestions}</span>
        </td>
      </tr>
      {/if}
    </tbody>
  </table>
  <!-- Date Navigation -->
  <div class="flex justify-between items-center p-3">
    <button onclick={goToPreviousDay}>Previous Day</button>
    <button onclick={goToToday}>{formatDate(currentDate)}</button>
    <button onclick={goToNextDay}>Next Day</button>
    <!-- <button onclick={goToToday}>Today</button> -->
  </div>
  <button onclick={resetData} class="reset-button">Reset All Data</button>
  <div class="export-section">
    <button onclick={exportToCsv}>Export to CSV</button>
  </div>
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