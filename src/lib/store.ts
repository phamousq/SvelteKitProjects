import { writable, derived } from 'svelte/store';

// Type Definitions
export interface HistoryItem {
	question: number;
	result: 'Correct' | 'Incorrect';
	timeDifference: string;
	time: number;
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
	try {
		if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
		const storedValue = localStorage.getItem(key);
		if (storedValue === null) return defaultValue;
		return JSON.parse(storedValue);
	} catch (error) {
		console.warn(`Error reading localStorage for ${key}:`, error);
		return defaultValue;
	}
};

const safeSetLocalStorage = <T>(key: string, value: T): void => {
	try {
		if (typeof window === 'undefined' || !window.localStorage) return;

		// Limit storage size and handle large objects
		const limitedValue = Array.isArray(value)
			? value.slice(-500) // Limit array to last 500 items
			: value;

		localStorage.setItem(key, JSON.stringify(limitedValue));
	} catch (error) {
		if (error instanceof DOMException && error.name === 'QuotaExceededError') {
			console.error('localStorage quota exceeded. Clearing oldest entries.');
			// Optional: Implement a strategy to clear oldest entries
		} else {
			console.error(`Failed to set localStorage for ${key}:`, error);
		}
	}
};

// Persistent Writable Store
export function persistentStore<T>(key: string, initialValue: T) {
	const storedValue = safeGetLocalStorage(key, initialValue);
	const { subscribe, set, update } = writable<T>(storedValue);

	return {
		subscribe,
		set: (value: T) => {
			safeSetLocalStorage(key, value);
			set(value);
		},
		update: (updater: (value: T) => T) => {
			update((currentValue) => {
				const newValue = updater(currentValue);
				safeSetLocalStorage(key, newValue);
				return newValue;
			});
		},
		reset: () => {
			if (typeof window !== 'undefined' && window.localStorage) {
				localStorage.removeItem(key);
			}
			set(initialValue);
		},
		get: () => {
			let value: T;
			subscribe((v) => (value = v))();
			return value;
		}
	};
}

// Create specific stores
export const historyStore = persistentStore<HistoryItem[]>('qbankHistory', []);
export const sourceStore = persistentStore<string>('source', '');
export const correctCountStore = persistentStore<number>('correctCount', 0);
export const incorrectCountStore = persistentStore<number>('incorrectCount', 0);
export const dailyQuestionCountStore = persistentStore<number>('dailyQuestionCount', 1);
export const currentNotesStore = persistentStore<string>('currentNotes', '');

// Derived stores for analytics
export const totalQuestionsStore = derived(historyStore, ($history) => $history.length);
export const correctQuestionsStore = derived(
	historyStore,
	($history) => $history.filter((item) => item.result === 'Correct').length
);
export const correctPercentageStore = derived(
	[totalQuestionsStore, correctQuestionsStore],
	([$total, $correct]) => ($total > 0 ? Math.round(($correct / $total) * 100) : 0)
);

// Utility function for time difference
export { formatTimeDifference };
