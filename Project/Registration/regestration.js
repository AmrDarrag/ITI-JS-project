const userName = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const email = document.getElementById("email");
const userNameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirmpassword-error");
const emailError = document.getElementById("email-error");
const okBtn = document.getElementById("okbtn");
const cancelBtn = document.getElementById("cancelbtn");
const maleRadio = document.getElementById("maleradio");
const femaleRadio = document.getElementById("femaleradio");
const form = document.getElementById("form");
const userNameRegex = /^\w{4,}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const users = JSON.parse(localStorage.getItem("users")) || [];
const user = {
	userName: null,
	password: null,
	email: null,
	gender: null,
};
let userNameValid = false;
let passwordValid = false;
let confirmPasswordValid = false;
let emailValid = false;

userName.addEventListener("keyup", function (e) {
	let validation = userNameRegex.test(e.target.value);
	if (validation) {
		userNameError.style.display = "none";
		userNameValid = true;
		user.userName = e.target.value;
	} else {
		userNameError.style.display = "block";
		userNameValid = false;
	}
});
password.addEventListener("keyup", function (e) {
	let validation = passwordRegex.test(e.target.value);
	if (validation) {
		passwordError.style.display = "none";
		passwordValid = true;
		user.password = e.target.value;
	} else {
		passwordError.style.display = "block";
		passwordValid = false;
	}
});
confirmPassword.addEventListener("keyup", function (e) {
	let validation = e.target.value === password.value;
	if (validation) {
		confirmPasswordError.style.display = "none";
		confirmPasswordValid = true;
		user.confirmPassword = e.target.value;
	} else {
		confirmPasswordError.style.display = "block";
		confirmPasswordValid = false;
	}
});
email.addEventListener("keyup", function (e) {
	let validation = emailRegex.test(e.target.value);
	if (validation) {
		emailError.style.display = "none";
		emailValid = "true";
		user.email = e.target.value;
	} else {
		emailError.style.display = "block";
		emailValid = false;
	}
});
okBtn.addEventListener("click", function () {
	localStorage.clear();
	if (
		userNameValid &&
		passwordValid &&
		confirmPasswordValid &&
		emailValid &&
		(maleRadio.checked || femaleRadio.checked)
	) {
		if (maleRadio.checked) user.gender = "male";
		if (femaleRadio.checked) user.gender = "female";
		users.push(user);

		localStorage.setItem("users", JSON.stringify(users));
		localStorage.setItem("userName", users[0].userName);
		localStorage.setItem("password", users[0].password);
		
		form.reset();
		window.location.href = "./../Login/login.html";
	} else alert("There's something wrong review your data");
});

cancelBtn.addEventListener("click", function () {
	form.reset();
	//window.location.href = "https://www.google.com";
});
