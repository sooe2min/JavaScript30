let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
  clearInterval(countdown)

  // 지금 시간
  const now = Date.now()
  // 10초 후 시간
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    // stop it
    if (secondsLeft <= 0) clearInterval(countdown)
    // display it
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainderSeconds = seconds % 60
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  // const adjustedHour = hour > 12 ? hour - 12 : hour
  const minutes = end.getMinutes()
  endTime.textContent = `Be back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}

buttons.forEach(button => button.addEventListener('click', function () {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}))

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = this.minutes.value
  timer(mins * 60)
  this.reset()
})