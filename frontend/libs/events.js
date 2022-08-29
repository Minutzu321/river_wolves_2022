function subscribe(eventName, listener) {
    document.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

const NUME_EVENT = {
    UPDATE_MEMBRI: 'update_membri',
  };

export { publish, subscribe, unsubscribe, NUME_EVENT};