try {

    document.querySelector(".confirm_password").addEventListener('input', () => {
        const password = document.querySelector(".password").value;
        let confirm_password = document.querySelector(".confirm_password").value;
        if (password != confirm_password) {
            document.querySelector(".matched").innerHTML = "password not matched"

        } else {
            document.querySelector(".matched").innerHTML = ""
        }
        console.log("input", password, confirm_password);
    })

    document.querySelector(".password").addEventListener('input', () => {
        let confirm_password = document.querySelector(".confirm_password").value;
        let password = document.querySelector(".password").value;
        if (confirm_password != '') {
            if (password != confirm_password) {
                document.querySelector(".matched").innerHTML = "password not matched"
            } else {
                document.querySelector(".matched").innerHTML = ""
            }
            console.log("input", password, confirm_password);
        }
    });


    document.forms['signupForm'].addEventListener('submit', async (event) => {
        event.preventDefault();
        // Show user that form is being submitted
        if (window.showLoading) window.showLoading('Creating Account...');

        try {
            const formData = new URLSearchParams(new FormData(event.target))

            const element = document.getElementById("signupForm")
            const data = new FormData(element)
            const form = Array.from(data.entries())
            console.log('---------- for test--------------');

            console.log('form ', form);
            console.log('urlsearch ', Array.from(formData.entries()));

            event.target.action = ServerConfig.getMembersRegister();
            const response = await fetch(event.target.action, {
                method: 'POST',

                body: new URLSearchParams(new FormData(event.target))
            }).catch(error => {
                document.getElementsByClassName('error_handler')[0].classList.remove('disabled');
                document.getElementsByClassName('error_handler')[0].innerHTML = error;
                alert(error)
                throw error; // throw to stop execution and hide loading
            });

            let JSONresponse = await response.json();
            if (!response.ok) {

                console.log('---->', JSONresponse);
                document.querySelector(".message").innerHTML = JSONresponse.message;
                document.querySelector(".message").classList.remove('success');
                document.querySelector("#signupForm").classList.remove('successAnimation');

            } else {
                console.log('--->', JSONresponse);

                document.querySelector(".message").innerHTML = JSONresponse.message;
                document.querySelector(".message").classList.add('success');
                document.querySelector("#signupForm").classList.add('successAnimation');
            }
        } finally {
            if (window.hideLoading) window.hideLoading();
        }
    })
}
catch (error) {
    alert(error)
}