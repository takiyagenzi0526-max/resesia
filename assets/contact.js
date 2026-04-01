const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const payload = new FormData(contactForm);

    submitButton.disabled = true;
    formStatus.textContent = '送信しています。しばらくお待ちください。';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: payload,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました。時間をおいて再度お試しください。');
      }

      contactForm.reset();
      formStatus.textContent = 'お問い合わせを送信しました。確認のうえ折り返しご連絡いたします。';
      formStatus.className = 'form-status is-success';
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.className = 'form-status is-error';
    } finally {
      submitButton.disabled = false;
    }
  });
}
