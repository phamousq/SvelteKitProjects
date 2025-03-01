<script lang="ts">
	import { onMount } from 'svelte';
	import { Progressbar, Button } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';

	import { LayerCake, Svg } from 'layercake';
  
    import Line from '../_components/Line.svelte';
    import Area from '../_components/Area.svelte';
    import AxisX from '../_components/AxisX.svelte';
    import AxisY from '../_components/AxisY.svelte';

	let correctCount = $state(0);
	let incorrectCount = $state(0);
	let countComplete = $derived(correctCount + incorrectCount);
	let percentCorrect = $derived(
		isNaN(+((correctCount / countComplete) * 100).toFixed(1)) ? 100 : ((correctCount / countComplete) * 100).toFixed(1)
	);
	let history = $state([]);
	let previousTimestamp = new Date();
	let undoHistory = $state([]);
	let source = $state(''); 
	let csvLoaded = $state(false);
	
	// Date pagination variables
	let currentDate = $state(new Date());
	let filteredHistory = $derived(filterHistoryByDate(history, currentDate));
	let dailyQuestionCount = $derived(filteredHistory.length + 1);
	let visibleCorrectCount = $derived(countCorrectInFiltered(filteredHistory));
	let visibleIncorrectCount = $derived(countIncorrectInFiltered(filteredHistory));
	let visibleCountComplete = $derived(visibleCorrectCount + visibleIncorrectCount);
	let visiblePercentCorrect = $derived(
		isNaN(+((visibleCorrectCount / visibleCountComplete) * 100).toFixed(1)) ? 100 : ((visibleCorrectCount / visibleCountComplete) * 100).toFixed(1)
	);

	onMount(() => {
		const storedCorrect = localStorage.getItem('correctCount');
		const storedIncorrect = localStorage.getItem('incorrectCount');
		const storedHistory = localStorage.getItem('history');
		const storedSource = localStorage.getItem('source');
		const storedCsvLoaded = localStorage.getItem('csvLoaded');
		// Add undoHistory to persisted state
		const storedUndoHistory = localStorage.getItem('undoHistory');

		if (storedUndoHistory) undoHistory = JSON.parse(storedUndoHistory);
		if (storedCorrect) correctCount = parseInt(storedCorrect);
		if (storedIncorrect) incorrectCount = parseInt(storedIncorrect);
		if (storedHistory) history = JSON.parse(storedHistory);
		if (storedSource) source = storedSource;
		if (storedCsvLoaded) csvLoaded = storedCsvLoaded === 'true';
		
		// Set current date to today by default
		currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		
		// window.addEventListener('keydown', handleKeyDown);
		// return () => {
		// 	window.removeEventListener('keydown', handleKeyDown);
		// };
	});

	$effect(() => {
		localStorage.setItem('correctCount', correctCount.toString());
		localStorage.setItem('incorrectCount', incorrectCount.toString());
		localStorage.setItem('history', JSON.stringify(history));
		localStorage.setItem('source', source);
		localStorage.setItem('csvLoaded', csvLoaded.toString());
		// Add undoHistory to saved items
		localStorage.setItem('undoHistory', JSON.stringify(undoHistory));
	});

	// Filter history entries by date
	function filterHistoryByDate(historyItems, date) {
		// Set time to start of day
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);
		
		// Set time to end of day
		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);
		
		return historyItems.filter(item => {
			const itemDate = new Date(item.datetime);
			return itemDate >= startOfDay && itemDate <= endOfDay;
		});
	}
	
	// Count correct answers in filtered history
	function countCorrectInFiltered(filteredItems) {
		return filteredItems.filter(item => item.result === 'Correct').length;
	}
	
	// Count incorrect answers in filtered history
	function countIncorrectInFiltered(filteredItems) {
		return filteredItems.filter(item => item.result === 'Incorrect').length;
	}
	
	// Go to previous day
	function goToPreviousDay() {
		const newDate = new Date(currentDate);
		newDate.setDate(newDate.getDate() - 1);
		currentDate = newDate;
	}
	
	// Go to next day
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
	
	// Go to today
	function goToToday() {
		currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
	}
	
	// Format date as string
	function formatDate(date) {
		return date.toLocaleDateString(undefined, { 
			weekday: 'short', 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	}
	
	// Check if date is today
	function isToday(date) {
		const today = new Date();
		return date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear();
	}

	function incrementCorrect() {
		const currentTimestamp = new Date();
		const timeDifference = formatTimeDifference(currentTimestamp - previousTimestamp);

		const newHistoryItem = {
			question: dailyQuestionCount,
			result: 'Correct',
			timeDifference: timeDifference,
			notes: '',
			datetime: currentTimestamp.toISOString(),
			source: source
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
		
		// Make sure we're showing today when adding new entries
		if (!isToday(currentDate)) {
			goToToday();
		}
	}

	function incrementIncorrect() {
		const currentTimestamp = new Date();
		const timeDifference = formatTimeDifference(currentTimestamp - previousTimestamp);

		const newHistoryItem = {
			question: dailyQuestionCount,
			result: 'Incorrect',
			timeDifference: timeDifference,
			notes: '',
			datetime: currentTimestamp.toISOString(),
			source: source
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
		
		// Make sure we're showing today when adding new entries
		if (!isToday(currentDate)) {
			goToToday();
		}
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
		csvLoaded = false;
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
		const header = 'Datetime,Correctness,Time Taken,Notes,Source';
		const rows = history
			.map(
				(item) => {
					// Handle potential missing datetime field for backward compatibility
					const datetime = item.datetime || new Date().toISOString();
					// Handle potential missing source field for backward compatibility
					const source = item.source || '';
					
					return `${datetime},${item.result},${item.timeDifference},"${item.notes.replace(/"/g, '""')}","${source.replace(/"/g, '""')}"`;
				}
			)
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

	function exportAndReset() {
		exportCSV();
		resetCounts();
	}

	function importCSV() {
		// Create an invisible file input element
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = '.csv';
		fileInput.style.display = 'none';
		document.body.appendChild(fileInput);

		fileInput.onchange = (e) => {
			const file = e.target.files[0];
			if (!file) {
				document.body.removeChild(fileInput);
				return;
			}

			const reader = new FileReader();
			reader.onload = (event) => {
				const content = event.target.result;
				parseAndLoadCSV(content);
				document.body.removeChild(fileInput);
			};
			reader.readAsText(file);
		};

		fileInput.click();
	}

	function parseAndLoadCSV(content) {
		const lines = content.split('\n');
		
		// Skip the header line and process data rows
		if (lines.length > 1) {
			// Store current history to restore if parsing fails
			const previousHistory = [...history];
			
			try {
				// Extract data from CSV
				const newItems = [];
				
				// Start from index 1 to skip header
				for (let i = 1; i < lines.length; i++) {
					if (!lines[i].trim()) continue; // Skip empty lines
					
					// Handle CSV parsing with potential quoted fields
					let fields = [];
					let currentField = '';
					let inQuotes = false;
					
					for (let j = 0; j < lines[i].length; j++) {
						const char = lines[i][j];
						
						if (char === '"') {
							if (inQuotes && j + 1 < lines[i].length && lines[i][j + 1] === '"') {
								// Escaped quote within a quoted field
								currentField += '"';
								j++; // Skip the next quote
							} else {
								// Toggle quote state
								inQuotes = !inQuotes;
							}
						} else if (char === ',' && !inQuotes) {
							// End of field
							fields.push(currentField);
							currentField = '';
						} else {
							currentField += char;
						}
					}
					
					// Add the last field
					fields.push(currentField);
					
					// Create history item from CSV data
					if (fields.length >= 5) {
						const newItem = {
							datetime: fields[0] || new Date().toISOString(),
							result: fields[1] || '',
							timeDifference: fields[2] || '',
							notes: fields[3] || '',
							source: fields[4] || '',
							question: history.length + newItems.length + 1
						};
						
						newItems.push(newItem);
					}
				}
				
				// Add new items to history
				history = [...history, ...newItems];
				
				// Update counts based on imported data
				let newCorrect = 0;
				let newIncorrect = 0;
				
				newItems.forEach(item => {
					if (item.result === 'Correct') {
						newCorrect++;
					} else if (item.result === 'Incorrect') {
						newIncorrect++;
					}
				});
				
				correctCount += newCorrect;
				incorrectCount += newIncorrect;
				csvLoaded = true;
				
				alert(`Successfully imported ${newItems.length} records.`);
			} catch (error) {
				console.error("Error parsing CSV:", error);
				history = previousHistory;
				alert("Error importing CSV. Please check the file format.");
			}
		}
	}

	function undoLastAction() {
		if (undoHistory.length > 0) {
			const lastUndo = undoHistory.pop();
			correctCount = lastUndo.previousCorrect;
			incorrectCount = lastUndo.previousIncorrect;
			history = lastUndo.previousHistory;
			previousTimestamp = new Date();
		}
	}
	
	function resetTimer() {
		previousTimestamp = new Date();
	}

	function updateNotes(index, notes) {
		// Find the actual history item that corresponds to the filtered item
		const actualItem = history.find(item => item === filteredHistory[index]);
		if (actualItem) {
			actualItem.notes = notes;
			history = [...history]; // Trigger reactivity
		}
	}
	
	function calculateAverageTimeDifference(items = filteredHistory) {
		if (items.length === 0) return '0s';

		const totalMilliseconds = items.reduce((sum, item) => {
			const timeParts = item.timeDifference.split(/m |s/);
			let minutes = 0;
			let seconds = 0;

			if (timeParts.length === 3) {
				minutes = parseInt(timeParts[0]);
				seconds = parseInt(timeParts[1]);
			} else if (timeParts.length === 2 && item.timeDifference.includes('m')) {
				minutes = parseInt(timeParts[0]);
			} else if (timeParts.length === 2 && item.timeDifference.includes('s')) {
				seconds = parseInt(timeParts[0]);
			} else if (timeParts.length === 1) {
				seconds = parseInt(timeParts[0]);
			}

			return sum + (minutes * 60 + seconds) * 1000;
		}, 0);

		const averageMilliseconds = totalMilliseconds / items.length;
		return formatTimeDifference(averageMilliseconds);
	}

	const lastSevenDaysData = $derived(() => {
		const days = [];
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		for (let i = 6; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			
			const dailyHistory = filterHistoryByDate(history, date);
			days.push({
				date,
				count: dailyHistory.length,
				label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
			});
		}

		let dictionary = Object.fromEntries(days.map(x => [x.label, x.count]));
		return days;
	});
	
</script>
<main>
	<!-- Source input field -->
	<div class="source-input-container" style="padding-top: 10px">
		<label for="source-input">Source:</label>
		<input 
			id="source-input" 
			type="text" 
			bind:value={source} 
			placeholder="Enter source..."
			class="source-input"
		/>
	</div>
	<div class="wrapper">
		<div>
			<h1 style="font-size: 32px; font-weight: bold;">Question: {dailyQuestionCount}</h1>
		</div>
	</div>
	
	<div class="scoreboard">
		<button class="counter-box correct" style="flex-grow: 10" onclick={incrementCorrect}>
			<h2>Correct</h2>
			<p>{visibleCorrectCount}</p>
		</button>
	
		<button class="counter-box incorrect" style="flex-grow: 10" onclick={incrementIncorrect}>
			<h2>Incorrect</h2>
			<p>{visibleIncorrectCount}</p>
		</button>
		<button class="counter-box undo" style="flex-grow: 1" onclick={undoLastAction}>
			<h2>Undo</h2>
		</button>
	</div>
	
	<div style="display: flex; padding-left: 10px; padding-right: 10px">
		<Progressbar
			progress={visiblePercentCorrect}
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
	
	<!-- Date navigation controls -->
	<div class="date-navigation">
		<button class="date-nav-button" onclick={goToPreviousDay}>
			&lt; Previous Day
		</button>
		<div class="current-date">
			<button onclick={goToToday}>{formatDate(currentDate)}</button>
			<!-- {#if !isToday(currentDate)}
				<button class="today-button" onclick={goToToday}>Today</button>
			{/if} -->
		</div>
		<button class="date-nav-button" onclick={goToNextDay} disabled={isToday(currentDate)}>
			Next Day &gt;
		</button>
	</div>
	
	<!-- Filtered view statistics -->
	{#if filteredHistory.length > 0}
		<div class="filtered-stats">
			<p>
				{filteredHistory.length} questions on {formatDate(currentDate)}:
				<span class="correct-stat">{visibleCorrectCount}</span> / 
				<span class="incorrect-stat">{visibleIncorrectCount}</span>
				({visiblePercentCorrect}%)
			</p>
		</div>
	{:else}
		<div class="filtered-stats empty">
			<p>No entries found for {formatDate(currentDate)}</p>
		</div>
	{/if}
	
	<div class="history-table">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>{visiblePercentCorrect}%</th>
					<th>{calculateAverageTimeDifference(filteredHistory)}</th>
					<th>Notes</th>
					<th>Source</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredHistory as item, index}
					<tr>
						<td>{index + 1}</td>
						<td>{item.result}</td>
						<td>{item.timeDifference}</td>
						<td>
							<textarea bind:value={item.notes} oninput={() => updateNotes(index, item.notes)}
							></textarea>
						</td>
						<td>{item.source || ''}</td>
					</tr>
				{/each}
				{#if filteredHistory.length === 0}
					<tr>
						<td colspan="5" class="empty-message">No entries for this date.</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
	<div class="wrapper">		
		{#if csvLoaded}
			<button class="export-button" onclick={exportCSV}>Export</button>
			<button class="reset-button" onclick={resetCounts}>Reset</button>
		{:else}
			<button class="import-button" onclick={importCSV}>
				Import CSV
			</button>
			{#if history.length > 0}
				<button class="export-button" onclick={exportCSV}>Export CSV</button>
			{/if}
		{/if}
	
	</div>
	<div class="wrapper">
		Total Questions Done: {history.length}
	</div>
	<div class="wrapper">Percent Correct: {percentCorrect}%</div>


	<div class="wrapper">
		<h3>Last 7 Days:</h3>
		<ul>
			{#each lastSevenDaysData().reverse() as day}
				<li>{day.label}: {day.count}</li>
			{/each}
		</ul>
	</div>

	<!-- ! I DONT KNOW HOW TO PIPE DATA INTO LAYERCAKE -->

	<!-- <div class="chart-container">
		<LayerCake
		  padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
		  x={"x"}
		  y={"y"}
		  yDomain={[0, null]}
		  data={Object.fromEntries(lastSevenDaysData().map(x => [x.label, x.count]))}
		>
		  <Svg>
			<AxisX />
			<AxisY ticks={4} />
			<Line />
			<Area />
		  </Svg>
		</LayerCake>
	  </div> -->

</main>

<style>
	/* Existing styles */
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
	.undo {
		background-color: #c8c8c8;
		border-color: #a0a0a0;
		color: #4b4b4b;
	}

	.reset-button, .export-button, .import-button {
		padding: 10px 20px;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		width: 40%;
		margin-bottom: 10px;
	}
	.reset-button {
		background-color: #007bff;
	}
	.export-button {
		background-color: #28a745;
	}
	.import-button {
		background-color: #6c757d;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
	}

	.source-input-container {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10px;
		padding: 0 10px;
	}
	
	.source-input {
		padding: 8px 12px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
		margin-left: 10px;
		width: 60%;
	}
	
	.source-input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
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

	/* New date navigation styles */
	.date-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		margin: 10px auto;
		max-width: 600px;
		border-radius: 8px;
		background-color: #f8f9fa;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	
	.date-nav-button {
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 8px 12px;
		cursor: pointer;
		font-weight: 500;
	}
	
	.date-nav-button:disabled {
		background-color: #6c757d;
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.current-date {
		font-size: 16px;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}
	
	/* .today-button {
		background-color: #28a745;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 4px 8px;
		cursor: pointer;
		font-size: 12px;
	} */
	
	.filtered-stats {
		text-align: center;
		padding: 8px;
		margin: 0 auto;
		max-width: 600px;
		border-radius: 4px;
		background-color: #e9ecef;
	}
	
	.filtered-stats.empty {
		background-color: #f8d7da;
		color: #721c24;
	}
	
	.correct-stat {
		color: #155724;
		font-weight: bold;
	}
	
	.incorrect-stat {
		color: #721c24;
		font-weight: bold;
	}
	
	.empty-message {
		text-align: center;
		font-style: italic;
		color: #6c757d;
		padding: 20px;
	}

	/* Dark mode styles for new elements */
	:global(body.dark-mode) .date-navigation {
		background-color: #343a40;
		color: #ffffff;
		box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
	}
	
	:global(body.dark-mode) .date-nav-button {
		background-color: #007bff;
		color: #ffffff;
	}
	
	:global(body.dark-mode) .date-nav-button:disabled {
		background-color: #495057;
	}
/* 	
	:global(body.dark-mode) .today-button {
		background-color: #28a745;
		color: #ffffff;
	} */
	
	:global(body.dark-mode) .filtered-stats {
		background-color: #495057;
		color: #e9ecef;
	}
	
	:global(body.dark-mode) .filtered-stats.empty {
		background-color: #c82333;
		color: #ffffff;
	}
	
	:global(body.dark-mode) .correct-stat {
		color: #8fd19e;
	}
	
	:global(body.dark-mode) .incorrect-stat {
		color: #f8d7da;
	}
	
	:global(body.dark-mode) .empty-message {
		color: #adb5bd;
	}

	/* Existing dark mode styles */
	:global(body.dark-mode) .reset-button,
	:global(body.dark-mode) .export-button,
	:global(body.dark-mode) .import-button {
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
	
	:global(body.dark-mode) .source-input {
		background-color: #495057;
		color: #ffffff;
		border-color: #6c757d;
	}
	
	:global(body.dark-mode) .source-input:focus {
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}
</style>