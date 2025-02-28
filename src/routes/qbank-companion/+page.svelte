<script lang="ts">
	import { onMount } from 'svelte';
	import { Progressbar, Button } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';

	let correctCount = $state(0);
	let incorrectCount = $state(0);
	let percentCorrect = $derived(
		isNaN(+((correctCount / (correctCount + incorrectCount)) * 100).toFixed(1)) ? 100 : ((correctCount / (correctCount + incorrectCount)) * 100).toFixed(1)
	);
	let history = $state([]);
	let previousTimestamp = new Date();
	let undoHistory = $state([]);

	

	onMount(() => {
		const storedCorrect = localStorage.getItem('correctCount');
		const storedIncorrect = localStorage.getItem('incorrectCount');
		const storedHistory = localStorage.getItem('history');

		if (storedCorrect) correctCount = parseInt(storedCorrect);
		if (storedIncorrect) incorrectCount = parseInt(storedIncorrect);
		if (storedHistory) history = JSON.parse(storedHistory);
	});

	$effect(() => {
		localStorage.setItem('correctCount', correctCount.toString());
		localStorage.setItem('incorrectCount', incorrectCount.toString());
		localStorage.setItem('history', JSON.stringify(history));
	});



	function incrementCorrect() {
		const currentTimestamp = new Date();
		const timeDifference = formatTimeDifference(currentTimestamp - previousTimestamp);

		const newHistoryItem = {
			question: correctCount + incorrectCount + 1,
			result: 'Correct',
			timeDifference: timeDifference,
			notes: '' // Initialize notes
		};

		undoHistory = [
			...undoHistory,
			{
				type: 'correct',
				previousCorrect: correctCount,
				previousIncorrect: incorrectCount,
				previousHistory: history
			}
		];

		history = [...history, newHistoryItem];
		correctCount++;
		previousTimestamp = currentTimestamp;
	}

	function incrementIncorrect() {
		const currentTimestamp = new Date();
		const timeDifference = formatTimeDifference(currentTimestamp - previousTimestamp);

		const newHistoryItem = {
			question: correctCount + incorrectCount + 1,
			result: 'Incorrect',
			timeDifference: timeDifference,
			notes: '' // Initialize notes
		};

		undoHistory = [
			...undoHistory,
			{
				type: 'incorrect',
				previousCorrect: correctCount,
				previousIncorrect: incorrectCount,
				previousHistory: history
			}
		];

		history = [...history, newHistoryItem];
		incorrectCount++;
		previousTimestamp = currentTimestamp;
	}

	function resetCounts() {
		undoHistory = [
			...undoHistory,
			{
				type: 'reset',
				previousCorrect: correctCount,
				previousIncorrect: incorrectCount,
				previousHistory: history
			}
		];
		correctCount = 0;
		incorrectCount = 0;
		history = [];
		previousTimestamp = new Date();
	}

	function formatTimeDifference(milliseconds) {
		const seconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;

		let formattedTime = '';

		if (minutes > 0) {
			formattedTime += `${minutes}m `;
		}
		formattedTime += `${remainingSeconds}s`;

		return formattedTime;
	}

	function exportCSV() {
		const header = 'Question,Result,Time Taken,Notes';
		const rows = history
			.map(
				(item) =>
					`${item.question},${item.result},${item.timeDifference},"${item.notes.replace(/"/g, '""')}"`
			) //escape double quotes
			.join('\n');
		const csvContent = `${header}\n${rows}`;

		const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'history.csv');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function undoLastAction() {
		if (undoHistory.length > 0) {
			const lastAction = undoHistory.pop();
			correctCount = lastAction.previousCorrect;
			incorrectCount = lastAction.previousIncorrect;
			history = lastAction.previousHistory;
			previousTimestamp = new Date();
		}
	}

	function updateNotes(index, notes) {
		history[index].notes = notes;
		history = [...history]; // Trigger reactivity
	}

	
</script>

<div class="wrapper">
	<div>
		<h1 style="font-size: 32px; font-weight: bold;">Question: {incorrectCount + correctCount + 1}</h1>
	</div>
</div>

<div class="scoreboard">
	<button class="counter-box correct" style="flex-grow: 1" onclick={incrementCorrect}>
		<h2>Correct</h2>
		<p>{correctCount}</p>
	</button>

	<button class="counter-box incorrect" style="flex-grow: 1" onclick={incrementIncorrect}>
		<h2>Incorrect</h2>
		<p>{incorrectCount}</p>
	</button>
</div>

<div style="display: flex; padding-left: 10px; padding-right: 10px">
	<Progressbar
		progress={percentCorrect}
		animate
		precision={0}
		labelInside
		tweenDuration={500}
		easing={sineOut}
		size="h-6"
		labelInsideClass="bg-green-600 text-green-100 text-base font-medium text-center p-1 leading-none rounded-full"
		class="mb-8"
	/>
</div>

<div class="wrapper-row">
	<button class="undo-button" onclick={undoLastAction}>Undo</button>
	<button class="reset-button" onclick={resetCounts}>Reset</button>
</div>

<div class="history-table">
	<table>
		<thead>
			<tr>
				<th>Question</th>
				<th>{percentCorrect}%</th>
				<th>Time Taken</th>
				<th>Notes</th>
			</tr>
		</thead>
		<tbody>
			{#each history as item, index}
				<tr>
					<td>{item.question}</td>
					<td>{item.result}</td>
					<td>{item.timeDifference}</td>
					<td>
						<textarea bind:value={item.notes} oninput={() => updateNotes(index, item.notes)}
						></textarea>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="wrapper">
	<button class="export-button" onclick={exportCSV}>Export CSV</button>
</div>

<style>
.export-button {
		padding: 10px 20px;
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 20px;
		width: 50%;
	}
	.scoreboard {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		gap: 5px;
		padding: 5px;
		font-family: sans-serif;
	}

	.counter-box {
		display: flex;
		flex-direction: column;
		border: 2px solid #ccc;
		padding: 20px;
		text-align: center;
		cursor: pointer;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		flex-wrap: wrap;
		min-width: 250px;
	}

	.correct {
		background-color: #d4edda;
		border-color: #c3e6cb;
		color: #155724;
	}

	.incorrect {
		background-color: #f8d7da;
		border-color: #f5c6cb;
		color: #721c24;
	}

	.reset-button,
	.undo-button {
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		width: 40%;
	}

	.undo-button {
		background-color: #6c757d;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
	}

	.wrapper-row {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		gap: 10px;
		width: 100%;
	}

	.history-table {
		margin-top: 20px;
		text-align: center;
	}

	table {
		border-collapse: collapse;
		width: 100%;
		max-width: 600px;
		margin: 20px auto;
	}
	tr:nth-child(odd) {
		background-color: white;
	}

	tr:nth-child(even) {
		background-color: whitesmoke;
	}

	textarea {
		width: 100%;
		height: 80px;
		box-sizing: border-box;
		resize: vertical;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: left;
	}

	th {
		background-color: #f2f2f2;
	}


	:global(body.dark-mode) .reset-button,
	:global(body.dark-mode) .undo-button,
	:global(body.dark-mode) .export-button {
		background-color: #343a40; /* Darker button background */
		color: #ffffff; /* White text on dark buttons */
		border: 1px solid #6c757d; /* Optional: Add a border for better definition */
	}

	:global(body.dark-mode) .counter-box {
		border-color: #6c757d; /* Darker border for counter boxes */
		box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1); /* Light shadow for dark mode */
	}

	:global(body.dark-mode) .correct {
		background-color: #218838; /* Darker green for correct */
		border-color: #1e7e34;
		color: #ffffff;
	}

	:global(body.dark-mode) .incorrect {
		background-color: #c82333; /* Darker red for incorrect */
		border-color: #bd2130;
		color: #ffffff;
	}

	:global(body.dark-mode) .history-table tr:nth-child(odd) {
		background-color: #2c3e50; /* Darker odd rows */
		color: #bfc2c7;
	}

	:global(body.dark-mode) .history-table tr:nth-child(even) {
		background-color: #34495e; /* Darker even rows */
		color: #bfc2c7;
	}

	:global(body.dark-mode) th {
		background-color: #343a40; /* Darker header background */
		color: #ffffff;
	}

	:global(body.dark-mode) textarea {
		background-color: #495057; /* Dark textarea background */
		color: #ffffff; /* White text in textarea */
		border-color: #6c757d;
	}
</style>
