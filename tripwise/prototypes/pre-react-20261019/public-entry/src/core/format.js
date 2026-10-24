import { state } from "./store.js";
export const money = n => state.currency === 'USD' ? '$' + Math.round(n).toLocaleString('en-US') : Math.round(n * 12500).toLocaleString('en-US').replaceAll(',', ' ') + ' so‘m';
export const nights = () => Math.max(1, Math.round((new Date(state.end) - new Date(state.start)) / 86400000));
