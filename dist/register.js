"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Registration {
    static readFormInput() {
        const email = document.querySelector("#email").value;
        const fullName = document.querySelector("#fullname").value;
        const userName = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirmpassword").value;
        return {
            email,
            fullName,
            userName,
            password,
            confirmPassword
        };
    }
    static redirect() {
        if (window.location.href == ".http://127.0.0.1:5500/Register.html") {
            window.location.replace("http://127.0.0.1:5500/login.html");
        }
    }
    static registerUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            let userInput = Registration.readFormInput();
            if (userInput.email === '' || userInput.fullName === '' || userInput.userName === '' || userInput.password === '' || userInput.confirmPassword === '') {
                alert('Please fill all fields before submitting.');
            }
            else {
                const response = yield fetch("http://localhost:3000/users");
                const users = yield response.json();
                for (let user of users) {
                    if (userInput.userName == user.Username) {
                        alert("Username already exists,choose another");
                        return;
                    }
                    else {
                        yield fetch("http://localhost:3000/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(userInput)
                        });
                        return user;
                    }
                }
                Registration.redirect();
            }
        });
    }
}
const signUpBtn = document.getElementById("signupbtn");
signUpBtn.addEventListener("click", Registration.registerUser);
// if(userInput.password !== userInput.confirmPassword){
//     alert("Passwords dont match")
// }
