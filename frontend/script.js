document.addEventListener('DOMContentLoaded', () => {
  const magicButton = document.getElementById('magic-button');
  const usernameInput = document.getElementById('username');
  const feedback = document.getElementById('feedback');

  magicButton.addEventListener('click', async () => {
    const username = usernameInput.value;

    if (!username) {
      feedback.textContent = 'Please enter a username.';
      return;
    }

    try {
      const response = await fetch(window.APP_CONFIG.API_BASE_URL +'/spawn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (response.ok) {
        feedback.textContent = result.message;
      } else {
        feedback.textContent = `Error: ${result.error}`;
      }
    } catch (error) {
      console.error('Error:', error);
      feedback.textContent = 'An unexpected error occurred.';
    }
  });
});