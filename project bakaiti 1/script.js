(() => {
  const form = document.getElementById('day-form');
  const select = document.getElementById('day-select');
  const button = document.getElementById('predict-btn');
  const spinner = document.getElementById('spinner');
  const result = document.getElementById('result');

  /**
   * Returns the next day name for a given day (case-insensitive).
   */
  function getNextDayName(dayName) {
    const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
    const index = days.indexOf(String(dayName || '').toLowerCase());
    if (index === -1) return null;
    const next = (index + 1) % days.length;
    return capitalize(days[next]);
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function setLoading(isLoading) {
    if (isLoading) {
      spinner.classList.add('visible');
      button.disabled = true;
      result.textContent = '';
      result.innerHTML = '';
      spinner.setAttribute('aria-hidden', 'false');
    } else {
      spinner.classList.remove('visible');
      button.disabled = false;
      spinner.setAttribute('aria-hidden', 'true');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const today = select.value;
    if (!today) {
      result.textContent = 'Please select a day.';
      return;
    }

    setLoading(true);
    // Simulate a small delay for the spinner UX
    await new Promise((r) => setTimeout(r, 900));

    const next = getNextDayName(today);
    setLoading(false);
    if (!next) {
      result.textContent = 'Invalid day provided.';
      return;
    }
    result.innerHTML = `
      <div class="result-card" role="status" aria-live="polite">
        <span class="result-label">Tomorrow is</span>
        <span class="day-highlight" aria-label="Predicted day">${next}</span>
      </div>
    `;
  });
})();


