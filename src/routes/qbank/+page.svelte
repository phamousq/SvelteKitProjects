<script lang="ts">
    import questionData from '../../data/questions.json';

    let currentQuestionIndex = 0;
    let currentQuestion = questionData[currentQuestionIndex];
    let selectedAnswer: null | string = null;
    let isCorrect: null | boolean = null;

    let questionStates = questionData.map(() => 'unseen');
    let currentQuestionState = questionStates[currentQuestionIndex];

    let correctCount = 0;
    let incorrectCount = 0;
    let questionTimers: (number | null)[] = questionData.map(() => null);
    let questionTimes = questionData.map(() => 0);
    let startTime: number = 0;
    let displayTime = 0; // Time to display in seconds

    function startTimer() {
        startTime = Date.now();
        questionTimers[currentQuestionIndex] = setInterval(() => {
            displayTime = (Date.now() - startTime + questionTimes[currentQuestionIndex]) / 1000;
        }, 1000); // Update every 100 milliseconds
    }

    function stopTimer() {
        if (startTime) {
            questionTimes[currentQuestionIndex] += Date.now() - startTime;
            startTime = 0;
            clearInterval(questionTimers[currentQuestionIndex]);
            // displayTime = questionTimes[currentQuestionIndex] / 1000;
            displayTime = 0
        }
    }

    function checkAnswer() {
        stopTimer();
        isCorrect = selectedAnswer === currentQuestion["Correct Answer"];
        if (isCorrect) {
            questionStates[currentQuestionIndex] = 'answered-correct';
            correctCount++;
        } else {
            questionStates[currentQuestionIndex] = 'answered-incorrect';
            incorrectCount++;
        }
        currentQuestionState = questionStates[currentQuestionIndex];
    }

    function nextQuestion() {
        stopTimer(); // Ensure timer stops before moving
        if (currentQuestionState === 'unseen' || currentQuestionState === 'unchecked') {
            questionStates[currentQuestionIndex] = 'unchecked';
        }
        selectedAnswer = null;
        isCorrect = null;
        currentQuestionIndex++;
        if (currentQuestionIndex < questionData.length) {
            currentQuestion = questionData[currentQuestionIndex];
            if (questionStates[currentQuestionIndex] === 'unseen') {
                questionStates[currentQuestionIndex] = 'seen';
            }
            currentQuestionState = questionStates[currentQuestionIndex];
            if (currentQuestionState === 'seen' && questionStates[currentQuestionIndex] !== 'answered-correct' && questionStates[currentQuestionIndex] !== 'answered-incorrect') {
                startTimer();
            }
        } else {
            alert("You have reached the end of the questions.");
            currentQuestionIndex = questionData.length - 1;
        }
    }

    function previousQuestion() {
        stopTimer(); // Ensure timer stops before moving
        if (currentQuestionState === 'unseen' || currentQuestionState === 'unchecked') {
            questionStates[currentQuestionIndex] = 'unchecked';
        }
        selectedAnswer = null;
        isCorrect = null;
        currentQuestionIndex--;
        if (currentQuestionIndex >= 0) {
            currentQuestion = questionData[currentQuestionIndex];
            if (questionStates[currentQuestionIndex] === 'unseen') {
                questionStates[currentQuestionIndex] = 'seen';
            }
            currentQuestionState = questionStates[currentQuestionIndex];
            if (currentQuestionState === 'seen' && questionStates[currentQuestionIndex] !== 'answered-correct' && questionStates[currentQuestionIndex] !== 'answered-incorrect') {
                startTimer();
            }
        } else {
            alert("You are at the first question.");
            currentQuestionIndex = 0;
        }
    }

    if (questionStates[currentQuestionIndex] === 'unseen') {
        questionStates[currentQuestionIndex] = 'seen';
        startTimer();
    } else if (questionStates[currentQuestionIndex] === 'seen' && questionStates[currentQuestionIndex] !== 'answered-correct' && questionStates[currentQuestionIndex] !== 'answered-incorrect'){
        startTimer();
    }
</script>

<main>
    <p>Correct: {correctCount} / {incorrectCount + correctCount} or {((correctCount / (incorrectCount + correctCount)) * 100).toFixed(2)}%</p>
    {#if questionStates[currentQuestionIndex] === 'answered-correct' || questionStates[currentQuestionIndex] === 'answered-incorrect'}
      <p>Time Spent: {(questionTimes[currentQuestionIndex]/1000).toFixed(0)} seconds</p>
      {:else}
        <p>Time Spent: {displayTime.toFixed(0)} seconds</p>
      {/if}
    <button on:click={previousQuestion}>Previous Question</button>
    <button on:click={nextQuestion}>Next Question</button>
    <h1>{currentQuestion["Item #"]}</h1>
    <p>{currentQuestion["Question Text"]}</p>

    <div>
        {#each Object.entries(currentQuestion["Answer Choices"]) as [key, value]}
            <label>
                <input
                    type="radio"
                    name="answer"
                    value={key}
                    bind:group={selectedAnswer}
                    disabled={currentQuestionState === 'answered-correct' || currentQuestionState === 'answered-incorrect'}
                />
                {key}: {value}
            </label>
            <br />
        {/each}
    </div>

    <button on:click={checkAnswer} disabled={currentQuestionState === 'answered-correct' || currentQuestionState === 'answered-incorrect'}>Check Answer</button>

    {#if isCorrect !== null}
        {#if isCorrect}
            <p style="color: green;">Correct!</p>
            <p>{currentQuestion["Answer Explanation"]}</p>
            {#each currentQuestion["Incorrect answer explanations"] as incorrectExplanation}
                <p>{incorrectExplanation}</p>
            {/each}
            <b>Eductional Objective: {currentQuestion["Educational Objective"]}</b>
        {:else}
            <p style="color: red;">Incorrect!</p>
            <p>{currentQuestion["Answer Explanation"]}</p>
            <p>Correct Answer: {currentQuestion["Correct Answer"]}</p>
            {#each currentQuestion["Incorrect answer explanations"] as incorrectExplanation}
                <p>{incorrectExplanation}</p>
            {/each}
            <b>Eductional Objective: {currentQuestion["Educational Objective"]}</b>
        {/if}
    {/if}

    <!-- <p>Question State: {currentQuestionState}</p> -->
    <!-- <p>Seen: {questionStates.filter(state => state !== 'unseen').length}</p> -->
    <button on:click={nextQuestion}>Next Question</button>
</main>

<style>
    main {
        font-family: sans-serif;
        padding: 20px;
    }
    label {
        display: block;
        margin-bottom: 5px;
    }
</style>