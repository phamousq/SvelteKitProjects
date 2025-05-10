<script lang="ts">
	import {
		historyStore,
		sourceStore,
		correctCountStore,
		incorrectCountStore,
		dailyQuestionCountStore,
		currentNotesStore,
		formatTimeDifference,
		totalQuestionsStore,
		correctQuestionsStore,
		correctPercentageStore
	} from '$lib/store';
	import { onMount } from 'svelte';
	import { sineOut } from 'svelte/easing';
	import { scaleTime, scaleBand } from 'd3-scale';
	import { format } from 'date-fns';
	import { Field, Input, Button, Table, BarStack, TweenedValue } from 'svelte-ux';

	import {
		Chart,
		Svg,
		Axis,
		Bars,
		LineChart,
		BarChart,
		AreaChart,
		Spline,
		Highlight,
		Tooltip,
		Canvas,
		Rule,
		Text,
		PieChart
	} from 'layerchart';
	import { cls } from '@layerstack/tailwind';
	let renderContext = 'svg';

	let correctCount = $state(0);
	let incorrectCount = $state(0);
	let countComplete = $derived(correctCount + incorrectCount);
	let percentCorrect = $derived(+((correctCount / countComplete) * 100).toFixed(1));
	let history = $state([]);
	let historyCorrect = $derived(history.filter((item) => item.result === 'Correct').length);
	let historyIncorrect = $derived(history.filter((item) => item.result === 'Incorrect').length);
	let previousTimestamp: any = new Date(); // Used for Block 2's original timeDifference
	let undoHistory = $state([]);
	let source = $state('');
	let csvLoaded = $state(false);
	let currentNotes = $state('');

	let currentDate = $state(new Date());
	let filteredHistory = $derived(filterHistoryByDate(history, currentDate));
	let dailyQuestionCount = $derived(filteredHistory.length);
	let visibleCorrectCount = $derived(countCorrectInFiltered(filteredHistory));
	let visibleIncorrectCount = $derived(countIncorrectInFiltered(filteredHistory));
	let visibleCountComplete = $derived(visibleCorrectCount + visibleIncorrectCount);
	let visiblePercentCorrect = $derived(
		isNaN(+((visibleCorrectCount / visibleCountComplete) * 100).toFixed(1))
			? 100
			: ((visibleCorrectCount / visibleCountComplete) * 100).toFixed(1)
	);

	let NotesInput: HTMLInputElement;

	let importConfirmation = $state('');
	let importedEntriesCount = $state(0);

	// --- Timer State (Copied from Block 1) ---
	let questionStartTime: number;
	let timeElapsed = $state(0);
	let timerInterval: number | null = null;

	let sourcedQuestionCount = $derived((sourceName: string) => {
		// Get the target source name from the state variable, trim whitespace, and convert to lowercase for case-insensitive matching.
		const targetSource = sourceName.trim().toLowerCase();

		if (targetSource === '') {
			// If `sourceNameToCount` is an empty string, count items where the source is effectively null, undefined, or an empty string.
			return history.filter((item) => !item.source || item.source.trim() === '').length;
		} else {
			// If `sourceNameToCount` specifies a source, count items that match that source name.
			return history.filter((item) => {
				const itemSource = item.source?.trim().toLowerCase(); // Get item's source, trim, and lowercase
				return itemSource === targetSource; // Compare with the target source
			}).length;
		}
	});

	let listUniqueSources = $derived(() => {
		// Create a Set to get unique sources, filtering out empty or undefined sources
		const uniqueSources = new Set(
			history.map((item) => item.source?.trim()).filter((source) => source && source !== '')
		);

		// Convert Set to sorted array
		return Array.from(uniqueSources).sort((a, b) => a.localeCompare(b));
	});

	onMount(() => {
		const storedCorrect = localStorage.getItem('correctCount');
		const storedIncorrect = localStorage.getItem('incorrectCount');
		const storedHistory = localStorage.getItem('history');
		const storedSource = localStorage.getItem('source');
		const storedCsvLoaded = localStorage.getItem('csvLoaded');
		const storedUndoHistory = localStorage.getItem('undoHistory');

		if (storedUndoHistory) undoHistory = JSON.parse(storedUndoHistory);
		if (storedCorrect) correctCount = parseInt(storedCorrect);
		if (storedIncorrect) incorrectCount = parseInt(storedIncorrect);
		if (storedHistory) history = JSON.parse(storedHistory);
		if (storedSource) source = storedSource;
		if (storedCsvLoaded) csvLoaded = storedCsvLoaded === 'true';

		currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		startTimer(); // (Copied from Block 1) Start timer on mount
	});

	$effect(() => {
		localStorage.setItem('correctCount', correctCount.toString());
		localStorage.setItem('incorrectCount', incorrectCount.toString());
		localStorage.setItem('history', JSON.stringify(history));
		localStorage.setItem('source', source);
		localStorage.setItem('csvLoaded', csvLoaded.toString());
		localStorage.setItem('undoHistory', JSON.stringify(undoHistory));
	});

	// --- Timer Functions (Copied from Block 1) ---
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

	// Filter history entries by date
	function filterHistoryByDate(historyItems: any, date: any) {
		// Set time to start of day
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);

		// Set time to end of day
		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);

		return historyItems.filter((item) => {
			const itemDate = new Date(item.datetime);
			return itemDate >= startOfDay && itemDate <= endOfDay;
		});
	}

	// Count correct answers in filtered history
	function countCorrectInFiltered(filteredItems: any) {
		return filteredItems.filter((item: any) => item.result === 'Correct').length;
	}

	// Count incorrect answers in filtered history
	function countIncorrectInFiltered(filteredItems: any) {
		return filteredItems.filter((item: any) => item.result === 'Incorrect').length;
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
	function formatDate(date: Date) {
		return date.toLocaleDateString(undefined, {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	// Check if date is today
	function isToday(date: any) {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	}

	function incrementResult(result: 'Correct' | 'Incorrect') {
		stopTimer(); // (Copied from Block 1) Stop timer before processing
		const currentTimestamp: any = new Date();
		// Block 2's original timeDifference logic (based on previousTimestamp)
		const timeDifference = formatTimeDifference(currentTimestamp - previousTimestamp);

		const newHistoryItem: any = {
			question: dailyQuestionCount,
			result: result,
			timeDifference: timeDifference, // Block 2's original field
			time: timeElapsed, // (Copied from Block 1) Time taken for this question from the new timer
			notes: currentNotes,
			datetime: currentTimestamp.toISOString(),
			source: source
		};

		undoHistory = [
			...undoHistory,
			{
				type: result,
				previousCorrect: correctCount,
				previousIncorrect: incorrectCount,
				previousHistory: history,
				previousNotes: currentNotes
			}
		];

		history = [...history, newHistoryItem];
		correctCount++;
		previousTimestamp = currentTimestamp; // Update for Block 2's timeDifference logic

		// Make sure we're showing today when adding new entries
		if (!isToday(currentDate)) {
			goToToday();
		}
		currentNotes = '';
		NotesInput ? NotesInput.focus() : null;

		timeElapsed = 0; // (Copied from Block 1) Reset timer display AFTER recording
		startTimer(); // (Copied from Block 1) Start timer for the new context
	}

	function resetCounts() {
		stopTimer(); // (Copied from Block 1)
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
		timeElapsed = 0; // (Copied from Block 1)
		startTimer(); // (Copied from Block 1)
	}

	function exportCSV() {
		const header = 'Datetime,Correctness,Time Taken,Notes,Source'; // Clarified time fields
		const rows = history
			.map((item) => {
				const datetime = item.datetime || new Date().toISOString();
				const itemSource = item.source || '';
				// Include the new 'time' field from the timer, and keep original 'timeDifference'
				return `${datetime},${item.result},${item.time !== undefined ? item.time + 's' : 'N/A'},"${item.notes.replace(/"/g, '""')}","${itemSource.replace(/"/g, '""')}"`;
			})
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

	function importCSV(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		// Reset previous confirmation
		importConfirmation = '';
		importedEntriesCount = 0;

		const reader = new FileReader();
		reader.onload = (e) => {
			const csvText = e.target?.result as string;
			const rows = csvText.split('\n').slice(1); // Skip header row

			const importedEntries = rows
				.filter((row) => row.trim() !== '') // Remove empty rows
				.map((row) => {
					// More robust parsing to handle potential CSV variations
					const cells = row.split(',').map((cell) => cell.replace(/^"|"$/g, '').trim());

					// Ensure we have enough columns
					while (cells.length < 5) {
						// Adjust if expecting more due to new time field, though import might be for older format
						cells.push(''); // Pad with empty strings if needed
					}

					// Assuming original CSV format for import, might need adjustment if CSV contains the new timer's 'time' field
					const [datetime, correctness, timeTakenLegacy, notes, source] = cells;
					// let timeFromNewTimer = cells[/* new index if present */];

					// Normalize correctness to handle both string and boolean inputs
					const normalizedCorrectness =
						correctness === 'true' ||
						correctness === 'correct' ||
						correctness.toUpperCase() === 'CORRECT'
							? 'Correct'
							: correctness === 'false' ||
								  correctness === 'incorrect' ||
								  correctness.toUpperCase() === 'INCORRECT'
								? 'Incorrect'
								: undefined;

					let parsedTimeLegacy = 0; // For timeDifference
					if (timeTakenLegacy) {
						const timeStr = timeTakenLegacy.replace(/[^\d.]/g, '');
						parsedTimeLegacy = parseFloat(timeStr) || 0;
					}

					return {
						datetime: new Date(datetime).toISOString(),
						result: normalizedCorrectness,
						timeDifference: formatTimeDifference(parsedTimeLegacy * 1000), // Assuming timeTakenLegacy was in seconds and becomes timeDifference
						// time: /* handle imported 'time' field if present */,
						notes: notes || '',
						source: source || ''
					};
				});
			console.log(importedEntries);

			// Merge imported entries with existing history
			const mergedHistory = [
				...history,
				...importedEntries.filter(
					(newEntry) =>
						!history.some(
							(existingEntry) =>
								existingEntry.datetime === newEntry.datetime &&
								existingEntry.question === newEntry.question // 'question' might not exist on newEntry if not parsed
						)
				)
			];

			// Update history and related counts
			history = mergedHistory;
			correctCount = mergedHistory.filter((entry) => entry.result === 'Correct').length;
			incorrectCount = mergedHistory.filter((entry) => entry.result === 'Incorrect').length;

			// Update local storage
			localStorage.setItem('history', JSON.stringify(history));
			localStorage.setItem('correctCount', correctCount.toString());
			localStorage.setItem('incorrectCount', incorrectCount.toString());

			// Set CSV loaded flag
			csvLoaded = true;
			localStorage.setItem('csvLoaded', 'true');

			// Set import confirmation and count
			importedEntriesCount = importedEntries.length;
			importConfirmation = `Successfully imported ${importedEntriesCount} records.`;

			// Clear file input
			(event.target as HTMLInputElement).value = '';
		};

		reader.onerror = () => {
			importConfirmation = 'Error reading file. Please try again.';
			importedEntriesCount = 0;
		};

		reader.readAsText(file);
	}

	function undoLastAction() {
		NotesInput.focus();
		if (undoHistory.length > 0) {
			const lastUndo = undoHistory.pop();
			correctCount = lastUndo.previousCorrect;
			incorrectCount = lastUndo.previousIncorrect;
			history = lastUndo.previousHistory;
			previousTimestamp = new Date(); // Reset for Block 2's timeDifference logic
			currentNotes = lastUndo.previousNotes;

			timeElapsed = 0; // (Copied from Block 1)
			startTimer(); // (Copied from Block 1)
		}

		if (NotesInput && currentNotes.length > 0) {
			// Give the browser a bit more time to ensure the element is ready
			setTimeout(() => {
				// Ensure the element is the right type
				if (NotesInput.setSelectionRange) {
					NotesInput.focus();
					// Small delay between focus and setting selection range
					setTimeout(() => {
						// Double-check that the element still exists and has content
						if (NotesInput && NotesInput.value) {
							try {
								NotesInput.setSelectionRange(currentNotes.length, currentNotes.length);
							} catch (err) {
								console.log('Error setting selection range:', err);
							}
						}
					}, 0);
				}
			}, 10);
		} else console.log('NotesInput or currentNotes is missing');
	}

	// resetTimer function in Block 2, merged with Block 1's timer reset logic
	function resetTimer() {
		// Original Block 2 logic:
		previousTimestamp = new Date();

		// Copied logic from Block 1's resetTimer:
		timeElapsed = 0;
		startTimer(); // Call the copied startTimer
	}

	function updateNotes(index, notes) {
		// Find the actual history item that corresponds to the filtered item
		const actualItem = history.find((item) => item === filteredHistory[index]);
		if (actualItem) {
			actualItem.notes = notes;
			history = [...history]; // Trigger reactivity
		}
	}

	function calculateAverageTimeDifference(items = filteredHistory) {
		if (items.length === 0) return '0s';

		// This function uses 'timeDifference'. If you want it to use the new 'time' field, it needs adjustment.
		// For now, keeping it as is, using 'timeDifference'.
		const totalMilliseconds = items.reduce((sum, item) => {
			const timeParts = item.timeDifference.split(/m |s/);
			let minutes = 0;
			let seconds = 0;

			if (timeParts.length === 3) {
				// "Xm Ys"
				minutes = parseInt(timeParts[0]) || 0;
				seconds = parseInt(timeParts[1]) || 0;
			} else if (timeParts.length === 2 && item.timeDifference.includes('m')) {
				// "Xm"
				minutes = parseInt(timeParts[0]) || 0;
			} else if (timeParts.length === 2 && item.timeDifference.includes('s')) {
				// "Ys"
				seconds = parseInt(timeParts[0]) || 0;
			} else if (timeParts.length === 1 && item.timeDifference.includes('s')) {
				// "Ys" (no space)
				seconds = parseInt(timeParts[0]) || 0;
			} else if (timeParts.length === 1 && item.timeDifference.includes('m')) {
				// "Xm" (no space)
				minutes = parseInt(timeParts[0]) || 0;
			} else if (timeParts.length === 1 && !isNaN(parseInt(timeParts[0]))) {
				// Just seconds as number string
				seconds = parseInt(timeParts[0]) || 0;
			}

			return sum + (minutes * 60 + seconds) * 1000;
		}, 0);

		const averageMilliseconds = totalMilliseconds / items.length;
		return formatTimeDifference(averageMilliseconds);
	}

	let lastSevenDaysData = () => {
		const days = [];
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		for (let i = 6; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);

			const dailyHistory = filterHistoryByDate(history, date);
			days.push({
				date,
				count: +dailyHistory.length,
				correct: countCorrectInFiltered(dailyHistory),
				incorrect: countIncorrectInFiltered(dailyHistory),
				label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
			});
		}
		return days;
	};

	let dataSummary = (obj: object[]) => {
		const summary = [];
		summary.push({ correctness: 'Correct', value: countCorrectInFiltered(obj) });
		summary.push({ correctness: 'Incorrect', value: countIncorrectInFiltered(obj) });
		return summary;
	};

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			if (event.shiftKey || event.metaKey) {
				// (Shift or meta) + Enter:
				// Block 2 doesn't have a direct equivalent for Block 1's markIncorrect() here
				// It calls incrementResult('Incorrect') which has its own notes check
				incrementResult('Incorrect');
			} else {
				// Enter: Perform the default action
				// Block 2 calls incrementResult('Correct')
				incrementResult('Correct');
			}
			event.preventDefault(); // Prevent default form submission
		}
		if (event.key === 'Escape') {
			resetTimer(); // This will now call the merged resetTimer
		}
		if (event.metaKey && event.key === 'z') {
			undoLastAction();
		}
	}
</script>

<main>
	<div id="ChartContainer" class="grid grid-cols-3 gap-4 p-2">
		<div class="col-span-2 h-[300px] rounded border p-4">
			<BarChart
				data={lastSevenDaysData()}
				x="label"
				series={[
					{ key: 'correct', color: '#D4EDDA' },
					{
						key: 'incorrect',
						color: '#F8D7DA'
					}
				]}
				seriesLayout="stack"
				props={{
					xAxis: { format: 'none' },
					yAxis: { format: 'metric' },
					tooltip: {
						header: { format: 'none' },
						list: { format: 'none', item: { format: 'none', value: 'This is a test' } }
					}
				}}
				legend={false}
			>
				<svelte:fragment slot="tooltip" let:x let:y>
					<Tooltip.Root let:data>
						<Tooltip.Header>{data.label}: {data.correct + data.incorrect}</Tooltip.Header>
						<Tooltip.List>
							<Tooltip.Item label="Correct" value={data.correct} />
							<Tooltip.Item label="Incorrect" value={data.incorrect} />
						</Tooltip.List>
						<Tooltip.Separator />
						<Tooltip.List>
							<Tooltip.Item
								label="% Correct"
								value={((data.correct / (data.correct + data.incorrect)) * 100).toFixed(0)}
							/>
						</Tooltip.List>
					</Tooltip.Root>
				</svelte:fragment>
			</BarChart>
		</div>
		<div id="PieChart" class="h-[300px] resize overflow-auto rounded border p-4">
			<PieChart
				data={dataSummary(history)}
				key="correctness"
				value="value"
				innerRadius={-15}
				cornerRadius={10}
				padAngle={0.01}
			>
				<svelte:fragment slot="aboveMarks">
					<Text
						value={`${historyCorrect + historyIncorrect} total`}
						textAnchor="middle"
						verticalAnchor="middle"
						class="text-4xl"
						dy={4}
					/>
					<Text
						value={`${((historyCorrect / (historyCorrect + historyIncorrect)) * 100).toFixed(0)}%`}
						textAnchor="middle"
						verticalAnchor="middle"
						class="fill-surface-content/50 text-sm"
						dy={26}
					/>
				</svelte:fragment>
			</PieChart>
		</div>
	</div>
	<div class="wrapper" id="QuestionContainer">
		<div>
			<h1 style="font-size: 20px; font-weight: bold;">Daily: {dailyQuestionCount}</h1>
		</div>
	</div>
	{#if source}
		<div class="flex items-center justify-center">
			<div>
				<span style="font-size: 24px; font-weight: bold;">
					{source}: {sourcedQuestionCount(source)}
				</span>
				{#if timeElapsed >= 90}
					<button class="ml-4 text-sm text-red-600" onclick={resetTimer}>{timeElapsed}s</button>
				{:else if timeElapsed >= 60}
					<button class="ml-4 text-sm text-orange-400" onclick={resetTimer}>{timeElapsed}s</button>
				{:else}
					<button class="ml-4 text-sm text-gray-600" onclick={resetTimer}>{timeElapsed}s</button>
				{/if}
			</div>
		</div>
	{/if}
	<!-- Source input field -->
	<div id="SourceInput" class="input-container" style="padding-top: 10px">
		<label for="source-input">Source:</label>
		<input
			id="source-input"
			type="text"
			bind:value={source}
			placeholder="Enter source..."
			class="source-input"
		/>
	</div>

	<!-- NOTES -->
	<div class="input-container">
		<label for="source-input">Notes:</label>
		<input
			type="text"
			bind:value={currentNotes}
			bind:this={NotesInput}
			onkeydown={handleKeyDown}
			placeholder="Enter notes..."
			class="source-input"
			id="notes-input"
		/>
	</div>

	<div id="Scoreboard" class="scoreboard">
		<button
			class="counter-box correct"
			style="flex-grow: 10"
			onclick={() => incrementResult('Correct')}
		>
			<h2>Correct (Enter)</h2>
			<p>{visibleCorrectCount}</p>
		</button>

		<button
			class="counter-box incorrect"
			style="flex-grow: 10"
			onclick={() => incrementResult('Incorrect')}
		>
			<h2>Incorrect (Shift+Enter)</h2>
			<p>{visibleIncorrectCount}</p>
		</button>
		<button class="counter-box undo" style="flex-grow: 1" onclick={undoLastAction}>
			<h2>Undo (Cmd+z)</h2>
		</button>
	</div>

	<!-- <div style="display: flex; padding-left: 10px; padding-right: 10px">
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
	</div> -->

	<!-- Date navigation controls -->
	<div class="date-navigation">
		<Button class="max-w-1/3" onclick={goToPreviousDay}>&lt; Previous Day</Button>
		<div class="current-date">
			<button onclick={goToToday}>
				{isToday(currentDate) ? 'Today' : formatDate(currentDate)}
			</button>
		</div>
		<Button class="max-w-1/3" onclick={goToNextDay} disabled={isToday(currentDate)}>
			Next Day &gt;
		</Button>
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
		<table class="w-full border-collapse">
			<thead>
				<tr>
					<th class="border p-2">Question</th>
					<th class="border p-2">Time</th>
					<th class="border p-2">Status</th>
					<th class="border p-2">Notes</th>
					<th class="border p-2">Source</th>
					<th class="border p-2">Datetime</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredHistory
					.slice()
					.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()) as item, index}
					<tr
						class:bg-green-100={item.result === 'Correct'}
						class:bg-red-100={item.result === 'Incorrect'}
						class="transition-colors hover:bg-gray-50"
					>
						<td class="border p-2 text-center">{filteredHistory.length - index}</td>
						<td class="border p-2 text-center">{item.time || 0}s</td>
						<td class="border p-2 text-center">
							{#if item.result === 'Correct'}
								<span class="text-green-600">✅ Correct</span>
							{:else if item.result === 'Incorrect'}
								<span class="text-red-600">❌ Incorrect</span>
							{:else}
								<span class="text-gray-500">Unmarked</span>
							{/if}
						</td>
						<td class="border p-2 text-center">
							<textarea
								bind:value={item.notes}
								oninput={() => updateNotes(filteredHistory.length - index - 1, item.notes)}
							></textarea>
						</td>
						<td class="border p-2 text-center">{item.source || ''}</td>
						<td class="border p-2 text-center">
							{new Date(item.datetime).toLocaleString()}
						</td>
					</tr>
				{/each}
				{#if filteredHistory.length === 0}
					<tr>
						<td colspan="6" class="empty-message">No entries for this date.</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
	<div class="wrapper pb-4">
		{#if history.length > 0}
			<Button onclick={resetCounts}>Reset</Button>
			<Button onclick={exportCSV}>Export</Button>
		{/if}
		<!-- CSV import section -->
		<div class="csv-import-section">
			<label for="csvImport" class="block text-sm font-medium text-gray-700"> Import CSV </label>
			<input
				id="csvImport"
				type="file"
				accept=".csv"
				onchange={importCSV}
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
			/>
			{#if importConfirmation}
				<div
					class="import-confirmation mt-2 rounded p-2 {importedEntriesCount > 0
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'}"
				>
					{importConfirmation}
				</div>
			{/if}
		</div>
	</div>

	<!-- <div class="wrapper">
		Total Questions Done: {history.length}
	</div>
	<div class="wrapper">Percent Correct: {percentCorrect}%</div> -->

	<!-- <div class="wrapper">
		<h3>Last 7 Days:</h3>
		<ul>
			{#each lastSevenDaysData().reverse() as day}
				<li>{day.label}: {day.count}</li>
			{/each}
		</ul>
	</div> -->

	<!-- <div class="h-[300px] p-4 border rounded">
		<AreaChart
			data={lastSevenDaysData()}
			x="date"	
			y="count"
			points
			labels={{ offset: 10 }}
			
		/>
	</div> -->
	{#if listUniqueSources()}
		<div class="sources-list">
			<h3>Unique Sources</h3>
			<table>
				<thead>
					<tr>
						<th>Source</th>
						<th>Count</th>
					</tr>
				</thead>
				<tbody>
					{#each listUniqueSources() as uniqueSource}
						<tr>
							<td>{uniqueSource}</td>
							<td class="text-right">{sourcedQuestionCount(uniqueSource)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</main>

<style>
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

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
	}

	.input-container {
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
	@media only screen and (max-width: 700px) {
		#PieChart {
			display: none;
		}
		#ChartContainer {
			grid-template-columns: none;
		}
	}
	@media only screen and (max-width: 500px) {
		#ChartContainer {
			display: none;
		}
	}
</style>
