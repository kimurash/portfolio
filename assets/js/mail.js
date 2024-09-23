window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let thisForm = this;

        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');

        // generate a five digit number for the contact_number variable
        thisForm.contact_number.value = Math.random() * 100000 | 0;

        // these IDs from the previous steps
        emailjs.sendForm('service_mkob74b', 'template_mj7yns8', this)
            .finally(() => {
                thisForm.querySelector('.loading').classList.remove('d-block');
            })
            .then(() => {
                thisForm.querySelector('.sent-message').classList.add('d-block');
                thisForm.reset();
            }, (error) => {
                console.error(error);
                displayError(thisForm, 'メール送信時にエラーが発生しました！お手数ですが再度ご送信ください。');
            });
    });

    function displayError(thisForm, message) {
        thisForm.querySelector('.loading').classList.remove('d-block');
        const errorMessage = thisForm.querySelector('.error-message');
        errorMessage.innerHTML = message;
        errorMessage.classList.add('d-block');
    }
}
