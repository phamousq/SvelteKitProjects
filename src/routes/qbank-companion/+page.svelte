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
	import { onMount, tick } from 'svelte';
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
	let undoHistory = $state([]);
	let source = '';
	let csvLoaded = $state(false);
	let currentNotes = $state('');
	let isQuestionContainerHovered = $state(false);

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
		if (!sourceName) return 0;
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
	let sourcedIncorrectCount = $derived((sourceName: string) => {
		// Get the target source name, trim whitespace, and convert to lowercase for case-insensitive matching.
		const targetSource = sourceName.trim().toLowerCase();

		if (targetSource === '') {
			// If `sourceName` is an empty string, count incorrect items where the source is effectively null, undefined, or an empty string.
			return history.filter(
				(item) => (!item.source || item.source.trim() === '') && item.result === 'Incorrect'
			).length;
		} else {
			// If `sourceName` specifies a source, count incorrect items that match that source name.
			return history.filter((item) => {
				const itemSource = item.source?.trim().toLowerCase(); // Get item's source, trim, and lowercase
				return itemSource === targetSource && item.result === 'Incorrect'; // Compare with the target source and check for incorrect result
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
		const storedCsvLoaded = localStorage.getItem('csvLoaded');
		const storedUndoHistory = localStorage.getItem('undoHistory');

		if (storedUndoHistory) undoHistory = JSON.parse(storedUndoHistory);
		if (storedCorrect) correctCount = parseInt(storedCorrect);
		if (storedIncorrect) incorrectCount = parseInt(storedIncorrect);
		if (storedHistory) history = JSON.parse(storedHistory);
		if (storedCsvLoaded) csvLoaded = storedCsvLoaded === 'true';

		currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		startTimer(); // (Copied from Block 1) Start timer on mount
	});

	// $effect(() => {
	// 	localStorage.setItem('correctCount', correctCount.toString());
	// 	localStorage.setItem('incorrectCount', incorrectCount.toString());
	// 	localStorage.setItem('history', JSON.stringify(history));
	// 	localStorage.setItem('source', source);
	// 	localStorage.setItem('csvLoaded', csvLoaded.toString());
	// 	localStorage.setItem('undoHistory', JSON.stringify(undoHistory));
	// });

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

		const newHistoryItem: any = {
			question: dailyQuestionCount,
			result: result,
			time: timeElapsed,
			notes: currentNotes,
			datetime: currentTimestamp.toISOString(),
			source: $sourceStore,
			sourceCount: sourcedQuestionCount($sourceStore) + 1
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
		csvLoaded = false;
		timeElapsed = 0; // (Copied from Block 1)
		startTimer(); // (Copied from Block 1)
	}

	function exportCSV() {
		const header = 'Datetime,Correctness,Time (s),Notes,Source,Source Count';
		const rows = history
			.map((item) => {
				const datetime = item.datetime || new Date().toISOString();
				const itemSource = item.source || '';
				return `${datetime},${item.result},${item.time !== undefined ? item.time : 'N/A'},"${item.notes.replace(/"/g, '""')}","${itemSource.replace(/"/g, '""')}",${item.sourceCount}`;
			})
			.join('\n');
		const csvContent = `${header}\n${rows}`;

		const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute(
			'download',
			`${new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })} ${new Date().getHours()}${new Date().getMinutes()}.csv`
		);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function importCSV() {
		// Create a hidden file input element
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = '.csv';
		fileInput.style.display = 'none';

		// Handle file selection
		fileInput.onchange = (e) => {
			const target = e.target as HTMLInputElement;
			const file = target.files?.[0];
			if (!file) {
				document.body.removeChild(fileInput); // Clean up if no file selected
				return;
			}

			// Reset previous confirmation
			importConfirmation = '';
			importedEntriesCount = 0;

			const reader = new FileReader();
			reader.onload = (loadEvent) => {
				const csvText = (loadEvent.target?.result as string) + '\n'; // Add trailing newline
				const parsedRows = [];
				let currentRow = [];
				let currentCell = '';
				let inQuotes = false;

				for (let i = 0; i < csvText.length; i++) {
					const char = csvText[i];
					const nextChar = i + 1 < csvText.length ? csvText[i + 1] : null;

					if (char === '"') {
						if (inQuotes && nextChar === '"') {
							// Escaped double quote
							currentCell += '"';
							i++; // Skip the next quote
						} else {
							// Start or end of quoted field
							inQuotes = !inQuotes;
						}
					} else if (char === ',' && !inQuotes) {
						// End of a cell
						currentRow.push(currentCell.trim());
						currentCell = '';
					} else if (char === '\n' && !inQuotes) {
						// End of a row
						currentRow.push(currentCell.trim());
						// Basic header skip (adjust if header differs)
						if (
							parsedRows.length > 0 ||
							currentRow.join(',').toLowerCase() !== 'datetime,result,time,notes,source'
						) {
							if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
								parsedRows.push([...currentRow]);
							}
						}
						currentRow = [];
						currentCell = '';
					} else {
						// Regular character within a cell
						currentCell += char;
					}
				}

				const importedEntries = parsedRows.map((cells) => {
					// Ensure we have enough columns, padding with empty strings if necessary
					while (cells.length < 6) {
						cells.push('');
					}

					// Destructure based on the expected CSV columns
					const [
						datetimeStr,
						resultStr,
						timeDifferenceCsvStr,
						notesStr,
						sourceStr,
						sourceCountStr
					] = cells;

					// Normalize correctness
					const normalizedCorrectness =
						resultStr === 'true' ||
						resultStr === 'correct' ||
						(resultStr && resultStr.toUpperCase() === 'CORRECT')
							? 'Correct'
							: resultStr === 'false' ||
								  resultStr === 'incorrect' ||
								  (resultStr && resultStr.toUpperCase() === 'INCORRECT')
								? 'Incorrect'
								: undefined;

					let parsedNumericTimeDifference = 0;
					if (timeDifferenceCsvStr) {
						const timeValueOnly = timeDifferenceCsvStr.replace(/[^\d.]/g, '');
						parsedNumericTimeDifference = parseFloat(timeValueOnly) || 0;
					}

					const parsedDate = new Date(datetimeStr);
					if (isNaN(parsedDate.getTime())) {
						console.error('Invalid date string encountered during CSV import:', datetimeStr);
						return null; // Mark as invalid for filtering later
					}

					return {
						datetime: parsedDate.toISOString(),
						result: normalizedCorrectness,
						time: parsedNumericTimeDifference,
						notes: notesStr, // Use notesStr directly, newlines are now preserved
						source: sourceStr || '',
						sourceCount: parseInt(sourceCountStr) || 0
					};
				});

				// Filter out any entries that failed date parsing
				const validImportedEntries = importedEntries.filter((entry) => entry !== null);

				// Merge imported entries with existing history
				const mergedHistory = [
					...history,
					...validImportedEntries.filter(
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
				importedEntriesCount = validImportedEntries.length;
				importConfirmation = `Successfully imported ${importedEntriesCount} records.`;
				if (importedEntries.length !== validImportedEntries.length) {
					importConfirmation += ` Skipped ${importedEntries.length - validImportedEntries.length} due to invalid dates.`;
					console.warn(
						`Skipped ${importedEntries.length - validImportedEntries.length} CSV entries due to invalid date format.`
					);
				}

				// Clear the file input value (though it will be removed anyway)
				target.value = '';
				document.body.removeChild(fileInput); // Clean up the input element
			};

			reader.onerror = () => {
				importConfirmation = 'Error reading file. Please try again.';
				importedEntriesCount = 0;
				document.body.removeChild(fileInput); // Clean up on error too
			};

			reader.readAsText(file);
		};

		// Append to body and trigger click to open file dialog
		document.body.appendChild(fileInput);
		fileInput.click();
	}

	function undoLastAction() {
		if (undoHistory.length > 0) {
			const lastUndo = undoHistory.pop();
			correctCount = lastUndo.previousCorrect;
			incorrectCount = lastUndo.previousIncorrect;
			history = lastUndo.previousHistory;
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

	function updateNotes(index, notes) {
		// Find the actual history item that corresponds to the filtered item
		const actualItem = history.find((item) => item === filteredHistory[index]);
		if (actualItem) {
			actualItem.notes = notes;
			history = [...history]; // Trigger reactivity
		}
	}

	let lastSevenDaysData = () => {
		const days = [];
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		for (let i = 0; i <= 12; i++) {
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
			if (event.shiftKey) {
				// insert newline
				currentNotes += '\n';
				event.preventDefault(); // Prevent the browser from adding a second newline
				return;
			}
			if (event.metaKey) {
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
			startTimer(); // This will now call the merged resetTimer
		}
		if (event.metaKey && event.key === 'z') {
			undoLastAction();
		}
	}

	let editingSource = $state(false);
	let tempSource = $state('');

	function startEditing() {
		editingSource = true;
		tempSource = $sourceStore || '';
		// Ensure the input gets focus after Svelte updates the DOM
		setTimeout(() => {
			const inputElement = document.getElementById('sourceEditorInput');
			inputElement?.focus();
		}, 0);
	}

	function handleSourceInputKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			sourceStore.set(tempSource.trim());
			editingSource = false;
		} else if (event.key === 'Escape') {
			editingSource = false;
		}
		startTimer();
	}

	// Svelte Action for auto-growing textareas
	function autogrow(node: HTMLTextAreaElement, value: string) {
		const adjustHeight = () => {
			node.style.height = 'auto'; // Temporarily shrink to get correct scrollHeight
			node.style.height = `${node.scrollHeight}px`;
			node.style.overflowY = 'hidden'; // Optional: hide scrollbar if content fits
		};

		adjustHeight(); // Initial adjustment
		node.addEventListener('input', adjustHeight);

		return {
			async update(newValue: string) {
				// newValue is passed but adjustHeight reads directly from node.scrollHeight
				// which will reflect the latest content after tick().
				await tick(); // Wait for Svelte to update the DOM with the new value
				adjustHeight();
			},
			destroy() {
				node.removeEventListener('input', adjustHeight);
			}
		};
	}
	// Hover state management
	function createHoverState() {
		let isHovered = $state(false);
		return {
			isHovered: () => isHovered,
			handlers: {
				onmouseenter: () => (isHovered = true),
				onmouseleave: () => (isHovered = false),
				onkeydown: (e: KeyboardEvent) => {
					if (e.key === 'Enter' || e.key === ' ') {
						isHovered = !isHovered;
					}
				}
			}
		};
	}
	const questionContainer = createHoverState();
	const sourceContainer = createHoverState();

	let sourcePercentCorrect = (source: string) => {
		return (
			((sourcedQuestionCount(source) - sourcedIncorrectCount(source)) /
				sourcedQuestionCount(source)) *
			100
		).toFixed(0);
	};
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
	<div
		id="QuestionContainer"
		class="flex cursor-pointer items-center justify-center"
		role="button"
		tabindex="0"
		{...questionContainer.handlers}
	>
		<span style="font-size: 20px; font-weight: bold;">Daily: {dailyQuestionCount}</span>
		{#if questionContainer.isHovered()}
			<span class="ml-2 text-xs">{visiblePercentCorrect}%</span>
		{/if}
	</div>
	<div id="SourceContainer" class="pb-2">
		{#if editingSource}
			<div class="flex items-center justify-center p-2 text-center">
				<input
					id="sourceEditorInput"
					type="text"
					bind:value={tempSource}
					onkeydown={handleSourceInputKeydown}
					onblur={() => {
						// Optional: Save on blur, or require Enter/Escape
						// For now, blur will also cancel to avoid accidental changes without "Enter"
						// To save on blur:
						if (tempSource.trim() !== ($sourceStore || '')) {
							sourceStore.set(tempSource.trim());
						}
						editingSource = false;
					}}
					placeholder="Enter source..."
					class="w-2/3 rounded border p-2 text-center"
				/>
			</div>
		{:else if $sourceStore}
			<div
				class="flex cursor-pointer items-center justify-center p-2"
				onclick={startEditing}
				title="Click to edit source"
				{...sourceContainer.handlers}
			>
				<div>
					<span style="font-size: 24px; font-weight: bold;" class="rounded bg-yellow-200 p-1 px-2">
						{$sourceStore}
					</span>
					{#if sourceContainer.isHovered()}
						<span class="ml-2 text-xs">{sourcePercentCorrect($sourceStore)}%</span>
					{/if}
				</div>
			</div>
		{:else}
			<div class="flex items-center justify-center p-2 text-center">
				<button
					onclick={startEditing}
					class="rounded border bg-blue-500 p-2 text-white hover:bg-blue-600"
					>Set Source
				</button>
			</div>
		{/if}
		<div class="flex items-center justify-center text-center">
			<span class="rounded bg-orange-300 px-2 py-1 text-xl text-black"
				>{sourcedQuestionCount($sourceStore) + 1}</span
			>
			{#if timeElapsed >= 90}
				<button
					class="ml-4 cursor-pointer text-sm text-red-600 hover:text-red-800"
					onclick={startTimer}
				>
					{timeElapsed}s
				</button>
			{:else if timeElapsed >= 60}
				<button
					class="ml-4 cursor-pointer text-sm text-orange-400 hover:text-orange-600"
					onclick={startTimer}
				>
					{timeElapsed}s
				</button>
			{:else}
				<button
					class="ml-4 cursor-pointer text-sm text-gray-600 hover:text-gray-800"
					onclick={startTimer}
				>
					{timeElapsed}s
				</button>
			{/if}
		</div>
	</div>

	<div id="NotesContainer" class="input-container">
		<textarea
			use:autogrow={currentNotes}
			bind:value={currentNotes}
			onkeydown={handleKeyDown}
			placeholder="Enter notes..."
			class="source-input"
			id="notes-input"
			rows="1"
		></textarea>
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

	{#if history.length > 0}
		<!-- Date navigation controls -->
		<div class="date-navigation">
			<Button class="max-w-1/3 hover:bg-gray-200" onclick={goToPreviousDay}
				>&lt; Previous Day</Button
			>
			<div class="current-date">
				<button onclick={goToToday}>
					{isToday(currentDate) ? 'Today' : formatDate(currentDate)}
				</button>
			</div>
			<Button
				class="max-w-1/3 hover:bg-gray-200"
				onclick={goToNextDay}
				disabled={isToday(currentDate)}
			>
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
						<th class="border p-2">Q</th>
						<th class="border p-2">Time (s)</th>
						<th class="border p-2">Status</th>
						<th class="border p-2">Notes</th>
						<th class="border p-2">Source</th>
						<th class="border p-2">Date</th>
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
									<span class="text-green-600">✅</span>
								{:else if item.result === 'Incorrect'}
									<span class="text-red-600">❌</span>
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
							<td class="border p-2 text-center">
								{item.source || ''}
								<br />
								{item.sourceCount}</td
							>
							<td class="border p-2 text-center">
								{String(new Date(item.datetime).getHours()).padStart(2, '0')}:{String(
									new Date(item.datetime).getMinutes()
								).padStart(2, '0')}
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
		{#if listUniqueSources()}
			<div class="sources-list">
				<!-- <h3 class="text-center text-lg font-semibold">Sources</h3> -->
				<table>
					<thead>
						<tr>
							<th>Source</th>
							<th>Count</th>
							<th>% Correct</th>
						</tr>
					</thead>
					<tbody>
						{#each listUniqueSources() as uniqueSource}
							<tr>
								<td>{uniqueSource}</td>
								<td class="text-right">{sourcedQuestionCount(uniqueSource)}</td>
								<td class="text-right">{sourcePercentCorrect(uniqueSource)}%</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	{/if}

	<div id="ImportExport" class="flex justify-center gap-2 p-2 px-5">
		<Button onclick={resetCounts} class="hover:bg-red-200">Reset</Button>

		{#if history.length > 0}
			<Button onclick={exportCSV} class="hover:bg-blue-200">Export</Button>
		{/if}
		<!-- CSV import section -->
		<div class="csv-import-section">
			<Button onclick={importCSV} class="hover:bg-green-200">Import CSV</Button>

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
		width: 99%;
		margin: 0 auto;
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
		&:hover {
			font-weight: bold;
			background-color: #c3e6cb;
		}
	}

	.incorrect {
		background-color: #f8d7da;
		border-color: #f5c6cb;
		color: #721c24;
		&:hover {
			font-weight: bold;
			background-color: #f5c6cb;
		}
	}
	.undo {
		background-color: #c8c8c8;
		border-color: #a0a0a0;
		color: #4b4b4b;
		&:hover {
			font-weight: bold;
			background-color: #a0a0a0;
		}
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
		width: 80%;
	}

	.source-input:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	.history-table {
		margin-top: 20px;
		text-align: center;
		vertical-align: middle;
	}

	table {
		border-collapse: collapse;
		width: 90%;
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
		text-align: center;
		vertical-align: middle;
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
