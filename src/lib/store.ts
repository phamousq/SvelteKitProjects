import { writable, derived } from 'svelte/store';

// Type Definitions
export interface HistoryItem {
	question: number;
	result: 'Correct' | 'Incorrect';
	timeDifference: string;
	notes: string;
	datetime: string;
	source: string;
	flagged?: boolean;
}

export interface UndoItem {
	type: 'Correct' | 'Incorrect' | 'reset';
	previousCorrect: number;
	previousIncorrect: number;
	previousHistory: HistoryItem[];
	previousNotes?: string;
}

// Utility Functions
function formatTimeDifference(milliseconds: number): string {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const remainingSeconds = totalSeconds % 60;

	let formattedTime = '';
	if (minutes > 0) {
		formattedTime += `${minutes}m `;
	}
	formattedTime += `${remainingSeconds}s`;
	return formattedTime;
}

// Local Storage Helpers
const safeGetLocalStorage = <T>(key: string, defaultValue: T): T => {
	if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
	const storedValue = localStorage.getItem(key);
	if (storedValue === null) return defaultValue;
	try {
		return JSON.parse(storedValue);
	} catch {
		return defaultValue;
	}
};

const safeSetLocalStorage = <T>(key: string, value: T): void => {
	if (typeof window !== 'undefined' && window.localStorage) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

// Stores
export const correctCount = writable(safeGetLocalStorage('correctCount', 0));
correctCount.subscribe((value) => safeSetLocalStorage('correctCount', value));

export const incorrectCount = writable(safeGetLocalStorage('incorrectCount', 0));
incorrectCount.subscribe((value) => safeSetLocalStorage('incorrectCount', value));

export const history = writable<HistoryItem[]>(safeGetLocalStorage('history', []));
history.subscribe((value) => safeSetLocalStorage('history', value));

export const undoHistory = writable<UndoItem[]>(safeGetLocalStorage('undoHistory', []));
undoHistory.subscribe((value) => safeSetLocalStorage('undoHistory', value));

export const source = writable(safeGetLocalStorage('source', ''));
source.subscribe((value) => safeSetLocalStorage('source', value));

export const currentNotes = writable('');

export const currentDate = writable(new Date());

// Derived Stores
export const countComplete = derived(
	[correctCount, incorrectCount],
	([$correctCount, $incorrectCount]) => $correctCount + $incorrectCount
);

export const percentCorrect = derived(
	[correctCount, countComplete],
	([$correctCount, $countComplete]) => {
		if ($countComplete === 0) return 0;
		return +(($correctCount / $countComplete) * 100).toFixed(1);
	}
);

// Actions
export function incrementResult(result: 'Correct' | 'Incorrect') {
	const currentTimestamp = new Date();
	const previousTimestamp = new Date(); // You might want to track this separately

	const timeDifference = formatTimeDifference(
		currentTimestamp.getTime() - previousTimestamp.getTime()
	);

	const newHistoryItem: HistoryItem = {
		question: history.get().length + 1,
		result: result,
		timeDifference: timeDifference,
		notes: currentNotes.get(),
		datetime: currentTimestamp.toISOString(),
		source: source.get()
	};

	undoHistory.update((history) => [
		...history,
		{
			type: result,
			previousCorrect: correctCount.get(),
			previousIncorrect: incorrectCount.get(),
			previousHistory: history.get(),
			previousNotes: currentNotes.get()
		}
	]);

	history.update((items) => [...items, newHistoryItem]);
	if (result === 'Correct') {
		correctCount.update((count) => count + 1);
	} else {
		incorrectCount.update((count) => count + 1);
	}
	currentNotes.set('');
}

export function undoLastAction() {
	undoHistory.update((history) => {
		if (history.length === 0) return history;

		const lastUndo = history[history.length - 1];
		correctCount.set(lastUndo.previousCorrect);
		incorrectCount.set(lastUndo.previousIncorrect);
		history.set(lastUndo.previousHistory);
		currentNotes.set(lastUndo.previousNotes || '');

		return history.slice(0, -1);
	});
}

export function resetCounts() {
	undoHistory.update((history) => [
		...history,
		{
			type: 'reset',
			previousCorrect: correctCount.get(),
			previousIncorrect: incorrectCount.get(),
			previousHistory: history.get()
		}
	]);

	correctCount.set(0);
	incorrectCount.set(0);
	history.set([]);
}

// Utility Functions for Filtering and Calculations
export function filterHistoryByDate(historyItems: HistoryItem[], date: Date): HistoryItem[] {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);

	return historyItems.filter((item) => {
		const itemDate = new Date(item.datetime);
		return itemDate >= startOfDay && itemDate <= endOfDay;
	});
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString(undefined, {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

export function isToday(date: Date): boolean {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
}
