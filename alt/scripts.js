var modal = document.getElementById("myModal");
var loginBtn = document.getElementById("loginBtn");
var span = document.getElementsByClassName("close")[0];



loginBtn.onclick = function () {
    modal.style.display = "block";
};
span.onclick = function () {
    modal.style.display = "none";
};

function ActiveInactiveBtn(ButtonID,ActiveORInactive){
    var Button = document.getElementById(ButtonID);

    if(ActiveORInactive == "Active"){
        Button.classList.add('active');

    }else {
        Button.classList.remove('active');
    }
}




function SetTitle(Title){
    var formTitle = document.getElementById('formTitle');
    formTitle.innerHTML = Title;
}



function ShowHideForm(FormID,ShowOrHide){
    var Form = document.getElementById(FormID);

    if(ShowOrHide == "Show"){
        Form.style.display = "block";
    }else{
        Form.style.display = "none";
    }
}


function ShowLoginForm(){

    SetTitle("Login");

    ShowHideForm("login-form-container", "Show");
    ShowHideForm("ForgotPasswordForm", "Hide");

}


function ShowForgotPasswordForm(){

    SetTitle("Passwort vergessen");

    ShowHideForm("login-form-container", "Hide");
    ShowHideForm("ForgotPasswordForm", "Show");


}

let loginEye = document.getElementById("login-eye");
let password = document.getElementById("loginPassword");

loginEye.onclick = function () {
    if( password.type === "password"){
        password.type = "text";
        loginEye.querySelector('ion-icon').setAttribute('name', 'eye-outline');
    }else{
        password.type = "password";
        loginEye.querySelector('ion-icon').setAttribute('name', 'eye-off-outline');
    }
}












/*function signIn(){

const express = require('express');
const path = require('path');
 

const app = express();
const port = 3000;

// Statische Dateien bereitstellen (optional, wenn du separate JS-Dateien hast)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send(`
        <button onclick="signIn()">Anmelden über Microsoft</button>
        <script src="/auth.js"></script> <!-- Client-seitiges MSAL-Skript -->
    `);
});

app.listen(port, () => {
    console.log(`App läuft unter http://localhost:${port}`);
});

}*/
