function publish(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
}

const NUME_EVENT = {
    UPDATE_MEMBRI: 'update_membri',
    UPDATE_SEDINTE: 'update_sedinte',
    NEAUTORIZAT_SOCKET: 'neautorizat_socket'
  };

export { publish, NUME_EVENT};