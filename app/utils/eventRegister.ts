export class EventRegister {
  /**
   * Object to store event listeners.
   */
  static listeners = {
    count: 0,
    refs: {},
  };

  /**
   * Adds an event listener for the specified event name.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} callback - The callback function to be called when the event is emitted.
   * @returns {string | false} The ID of the registered event listener or false if the parameters are invalid.
   */
  static addEventListener(eventName: string, callback: Function): string | false {
    if (typeof eventName === 'string' && typeof callback === 'function') {
      EventRegister.listeners.count++;
      const eventId = 'l' + EventRegister.listeners.count;
      EventRegister.listeners.refs[eventId] = {
        name: eventName,
        callback,
      };
      return eventId;
    }
    return false;
  }

  /**
   * Removes the event listener with the specified ID.
   *
   * @param {string} id - The ID of the event listener to be removed.
   * @returns {boolean} True if the event listener is successfully removed, false otherwise.
   */
  static removeEventListener(id: string): boolean {
    if (typeof id === 'string') {
      return delete EventRegister.listeners.refs[id];
    }
    return false;
  }

  /**
   * Removes all event listeners.
   *
   * @returns {boolean} True if all event listeners are successfully removed, false otherwise.
   */
  static removeAllListeners(): boolean {
    let removeError = false;
    Object.keys(EventRegister.listeners.refs).forEach(id => {
      const removed = delete EventRegister.listeners.refs[id];
      removeError = !removeError ? !removed : removeError;
    });
    return !removeError;
  }

  /**
   * Emits an event with the specified name and data.
   *
   * @param {string} eventName - The name of the event to be emitted.
   * @param {any} data - The data to be passed to the event listeners.
   */
  static emitEvent(eventName: string, data: any) {
    Object.keys(EventRegister.listeners.refs).forEach(id => {
      if (
        EventRegister.listeners.refs[id] &&
        eventName === EventRegister.listeners.refs[id].name
      ) {
        EventRegister.listeners.refs[id].callback(data);
      }
    });
  }

  /**
   * Alias for `addEventListener`.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} callback - The callback function to be called when the event is emitted.
   * @returns {string | false} The ID of the registered event listener or false if the parameters are invalid.
   */
  static on(eventName: string, callback: Function): string | false {
    return EventRegister.addEventListener(eventName, callback);
  }

  /**
   * Alias for `removeEventListener`.
   *
   * @param {string} eventName - The name of the event listener to be removed.
   * @returns {boolean} True if the event listener is successfully removed, false otherwise.
   */
  static off(eventName: string): boolean {
    return EventRegister.removeEventListener(eventName);
  }

  /**
   * Alias for `removeAllListeners`.
   *
   * @returns {boolean} True if all event listeners are successfully removed, false otherwise.
   */
  static offAll(): boolean {
    return EventRegister.removeAllListeners();
  }

  /**
   * Alias for `emitEvent`.
   *
   * @param {string} eventName - The name of the event to be emitted.
   * @param {any} data - The data to be passed to the event listeners.
   */
  static emit(eventName: string, data: any) {
    EventRegister.emitEvent(eventName, data);
  }
}
