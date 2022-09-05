function publish(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

const NUME_EVENT = {
    UPDATE_MEMBRI: 'update_membri',
  };

export { publish, NUME_EVENT};