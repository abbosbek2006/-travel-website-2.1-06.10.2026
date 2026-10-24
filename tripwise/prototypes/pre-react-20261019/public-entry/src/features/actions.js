import { interfaceActions } from "./interface-actions.js";
import { bookingActions } from "./booking-actions.js";
import { plannerActions } from "./planner-actions.js";
import { formHandlers } from "./forms.js";
export function initActions() {
  const actions = {
    ...interfaceActions,
    ...bookingActions,
    ...plannerActions
  };
  document.addEventListener('click', event => {
    const element = event.target.closest('[data-act]');
    if (element) actions[element.dataset.act]?.(element, element.dataset.id);
  });
  document.addEventListener('submit', event => {
    const handler = formHandlers[event.target.id];
    if (!handler) return;
    event.preventDefault();
    handler(event.target, new FormData(event.target));
  });
}
