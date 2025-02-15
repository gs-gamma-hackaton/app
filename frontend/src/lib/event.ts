export type EventDispatcher = Omit<EventTarget, "dispatchEvent">;
export class EventEmitter extends EventTarget {}

const globalEventEmitter = new EventEmitter();
export default globalEventEmitter;
