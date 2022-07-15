const users = JSON.parse(localStorage.getItem("users")) || [];
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error");
const okBtn = document.getElementById("okbtn");
const cancelBtn = document.getElementById("cancelbtn");
const userNameRegex = /^\w{4,}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let usernameValid = false;
let passwordValid = false;

username.addEventListener("keyup", function (e) {
	let validation = userNameRegex.test(e.target.value);
	if (validation) {
		error.style.display = "none";
		usernameValid = true;
	} else {
		error.style.display = "block";
		usernameValid = false;
	}
});

password.addEventListener("keyup", function (e) {
	let validation = passwordRegex.test(e.target.value);
	if (validation) {
		error.style.display = "none";
		passwordValid = true;
	} else {
		error.style.display = "block";
		passwordValid = false;
	}
});

okBtn.addEventListener("click", function () {
	if (usernameValid && passwordValid) {
		for (let i = 0; i < 1; i++) {
			if (username.value == localStorage.getItem('userName')) {
				error.style.display = "none";
				if ( password.value == localStorage.getItem('password')) {
					localStorage.setItem('isLogged', true);
					window.location.href = "../index.html";
					error.style.display = "none";
					break;
				} else {
					error.style.display = "block";
					error.textContent = "Wrong Password";
					break;
				}
			} else {
				error.style.display = "block";
				error.textContent = "You need to Register First";
			}
		}
	}
});

cancelBtn.addEventListener("click", function () {
	window.location.href = "./../Registration/registration.html";
});
