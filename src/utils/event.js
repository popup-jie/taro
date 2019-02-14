class Event {
  constructor() {
    this.events = {};
  }

  on(eventName, callBack) {
    if (this.events[eventName]) {
      this.events[eventName].push(callBack)
    } else {
      this.events[eventName] = [callBack]
    }
  }

  emit(eventName, params) {
    if (this.events[eventName]) {
      this.events[eventName].map((callBack) => {
        callBack(params)
      })
    }
  }
}

export default Event