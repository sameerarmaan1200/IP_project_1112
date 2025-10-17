const container = document.querySelector('.container');
const LoginLink = document.querySelector('.SignInLink');
const RegisterLink = document.querySelector('.SignUpLink');

// Toggle Login/Register
if (RegisterLink) {
    RegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('active');
    });
}
if (LoginLink) {
    LoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('active');
    });
}

// PIN validation - only allow numbers and minimum 5 digits
const pinInputs = document.querySelectorAll('input[type="number"]');
pinInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });
    input.addEventListener('input', (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 5) {
            e.target.setCustomValidity('PIN must be at least 5 digits');
        } else {
            e.target.setCustomValidity('');
        }
    });
});

// Handle form submit animations
function handleFormSubmit(form, successMsg) {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent reload
        form.classList.add("submitted");
        const msgDiv = form.querySelector(".form-success");
        if (msgDiv) {
            msgDiv.textContent = successMsg;
        }
    });
}

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {
    handleFormSubmit(loginForm, "✅ Login successful! \n Welcome in the Green City.");
}
if (registerForm) {
    handleFormSubmit(registerForm, "🎉 Registration complete! \n keep our planet clean!");
}
