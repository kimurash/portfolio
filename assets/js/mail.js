window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        // 送信を一時停止する
        event.preventDefault();

        // reCAPTCHAにチェックが入っているか確認する
        const recaptchaRespose = grecaptcha.getResponse();
        if(recaptchaRespose.length === 0) {
            displayError(this, 'reCAPTCHAにチェックを入れてください');
            return;
        }

        let thisForm = this;

        // ローディング中のアニメーションを表示する
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');

        // contact_numberに5桁の数字を入れる
        // ドキュメントに目的は書かれていない
        thisForm.contact_number.value = Math.random() * 100000 | 0;

        // メールを送信する
        emailjs.sendForm('service_mkob74b', 'template_mj7yns8', this)
            .finally(() => {
                thisForm.querySelector('.loading').classList.remove('d-block');
            })
            .then(() => {
                thisForm.querySelector('.sent-message').classList.add('d-block');
                thisForm.reset();
            }, (error) => {
                console.error(error);
                displayError(thisForm, 'メール送信時にエラーが発生しました。お手数ですが再度ご送信ください。');
            });
    });

    function displayError(thisForm, message) {
        thisForm.querySelector('.loading').classList.remove('d-block');
        const errorMessage = thisForm.querySelector('.error-message');
        errorMessage.innerHTML = message;
        errorMessage.classList.add('d-block');
    }
}
