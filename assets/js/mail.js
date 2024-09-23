window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;

        // these IDs from the previous steps
        emailjs.sendForm('service_mkob74b', 'template_mj7yns8', this)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
}
