
try {

    document.forms['loginForm'].addEventListener('submit', async (event) => {
        // alert('submitting form');
        event.preventDefault();
        
        if (window.showLoading) window.showLoading('Logging In...');
        try {
            event.target.action = ServerConfig.getMembersLogin();
            let data = {
                email: event.target.email.value,
                password: event.target.password.value,
                ip: await getip()
            }
            data = JSON.stringify(data);
            console.log(data);
            // alert('data is : ' + data);

            const response = await fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let JSONresponse = await response.json();

            const msg = document.querySelector(".message");
            console.log(JSONresponse);
            if (!response.ok) {
                msg.className = "message error";
                msg.innerHTML = JSONresponse.message;
            } else {
                msg.className = "message success";
                msg.innerHTML = JSONresponse.message;
                window.localStorage.setItem('token', JSONresponse.data.token);
                setTimeout(() => {
                    window.location.href = (document.referrer !== window.location.href && document.referrer !== null && !(document.referrer.includes('signup') || document.referrer.includes('login') || document.referrer.includes('404'))) ? document.referrer : '../profile-page/index.html';
                }, AppConstants.UI_CONFIG.LOGIN_REDIRECT_DELAY);
            }
        } finally {
            if (window.hideLoading) window.hideLoading();
        }
    })

} catch (error) {
    console.log(error);
    const msg = document.querySelector(".message");
    msg.className = "message error";
    msg.innerHTML = "Something went wrong, please try again later.";
}


// getip of user
async function getip() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}
// alert('end of script');



document.querySelectorAll('.toggle-password').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
        const inputBox = this.closest('.input-box');
        const input = inputBox.querySelector('input');
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('bxs-show');
            this.classList.add('bxs-hide');
        } else {
            input.type = 'password';
            this.classList.remove('bxs-hide');
            this.classList.add('bxs-show');
        }
    });
});