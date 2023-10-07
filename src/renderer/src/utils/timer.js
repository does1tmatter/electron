class Timer {
  timeout(interval, args) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(args)
      }, interval)
    })
  }
  inTheEnd() {
    return this.timeout(0)
  }

  interval(interval, callback) {
    this.timeout(interval)
      .then(() => {
        typeof callback === 'function' &&
          callback() !== false &&
          this.interval(interval, callback)
      })
    return { then: c => callback = c }
  }

  start() {
    const startDate = new Date()
    return {
      stop() {
        const stopDate = new Date()
        return stopDate.getTime() - startDate.getTime()
      }
    }
  }
}

export default new Timer()
