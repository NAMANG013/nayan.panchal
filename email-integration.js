document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // 1. Get values from the form
        const userName = contactForm.querySelector('[name="user_name"]').value;
        const userEmail = contactForm.querySelector('[name="user_email"]').value;
        const message = contactForm.querySelector('[name="message"]').value;

        // 2. Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // 3. Define your Service and Template IDs
        const serviceID = 'service_izwdvph';
        const templateID = 'template_egkafg7';       // Notification to YOU
        const autoReplyTemplateID = 'template_349pagb'; // Auto-reply to VISITOR

        // 4. Create the data object to send
        const templateParams = {
            user_name: userName,
            user_email: userEmail,
            message: message,
            // Fallback variables - one of these MUST match your template!
            to_email: userEmail,
            reply_to: userEmail,
            email: userEmail,
            recipient: userEmail
        };

        console.log('Sending with params:', templateParams);

        // 5. Send Notification Email (To You)
        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                console.log('Notification sent to owner.');

                // 6. Send Auto-Reply Email (To Visitor)
                // We reuse the SAME templateParams object
                return emailjs.send(serviceID, autoReplyTemplateID, templateParams);
            })
            .then(() => {
                console.log('Auto-reply sent to visitor.');

                // Success! Both emails sent.
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            })
            .catch((error) => {
                console.error('FAILED...', error);

                // If the first email failed, or the second one failed
                submitBtn.textContent = 'Failed';
                submitBtn.style.backgroundColor = '#dc3545';

                // Alert with specific error
                alert('EmailJS Error: ' + JSON.stringify(error));

                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            });
    });
});
