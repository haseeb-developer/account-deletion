document.addEventListener("DOMContentLoaded", function () {
  const countdownElement = document.getElementById("countdown");
  const deactivateButton = document.getElementById("deactivate");
  const timerDuration = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
  const endTimeKey = "countdownEndTime";

  let countDownDate;

  // Check if there is a saved end time in local storage
  const savedEndTime = localStorage.getItem(endTimeKey);

  if (savedEndTime) {
    countDownDate = new Date(parseInt(savedEndTime, 10));
  } else {
    // Set the end time to 2 days from now
    countDownDate = new Date().getTime() + timerDuration;
    localStorage.setItem(endTimeKey, countDownDate);
  }

  // Update the count down every 1 second
  const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance > 0) {
      countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      clearInterval(countdownFunction);
      countdownElement.innerHTML = "Timer over or account deleted";
      localStorage.removeItem(endTimeKey);
    }
  }, 1000);

  deactivateButton.addEventListener("click", function () {
    clearInterval(countdownFunction);
    countdownElement.innerHTML = "Deactivated";
    localStorage.removeItem(endTimeKey);
  });
});
