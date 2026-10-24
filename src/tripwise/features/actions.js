import { listen } from "../core/events.js";
import { interfaceActions } from "./interface-actions.jsx";
import { bookingActions } from "./booking-actions.js";
import { plannerActions } from "./planner-actions.js";
import { formHandlers } from "./forms.js";
export function initActions() {
  const actions = {
    ...interfaceActions,
    ...bookingActions,
    ...plannerActions
  };
  listen(document, 'click', event => {
    const element = event.target.closest('[data-act]');
    if (element) actions[element.dataset.act]?.(element, element.dataset.id);
  });
  listen(document, 'submit', event => {
    const handler = formHandlers[event.target.id];
    if (!handler) return;
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    handler(event.target, new FormData(event.target));
  });
}
