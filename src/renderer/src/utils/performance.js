import Timer from './timer'

class Performance {
  startExecute(name = '') {
    const timer = Timer.start()
    const usedJSHeapSize = this.getMemoryInfo().usedJSHeapSize
    return (name2 = '') => {
      const executeTime = timer.stop()
      const endMemoryInfo = this.getMemoryInfo()
      console.log('%cPerformance%c\nRoute: %c%s%c\nExecution time: %c%sms%c \nMemory fluctuations: %sB \nAllocated memory: %sMB \nMemory used: %sMB \nRemaining memory: %sMB',
        'padding: 2px 4px 2px 4px; background-color: #4caf50; color: #fff; border-radius: 4px;', '',
        'color: #ff6f00', `${name} ${name2}`, '',
        'color: #ff6f00', executeTime, '',
        endMemoryInfo.usedJSHeapSize - usedJSHeapSize,
        this.toMBSize(endMemoryInfo.jsHeapSizeLimit),
        this.toMBSize(endMemoryInfo.usedJSHeapSize),
        this.toMBSize(endMemoryInfo.totalJSHeapSize)
      )
    }
  }

  getMemoryInfo() {
    let memoryInfo
    if (window.performance && window.performance.memory) {
      memoryInfo = window.performance.memory
    }
    return memoryInfo
  }

  toMBSize(byteSize) {
    return (byteSize / (1024 * 1024)).toFixed(1)
  }
}

export default new Performance()
