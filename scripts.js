var modal = document.getElementById("myModal");
var btn = document.getElementById("loginBtn");
var span = document.getElementsByClassName("close")[0];




btn.onclick = function () {
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

    SetTitle("Forgot Password");

    ShowHideForm("login-form-container", "Hide");
    ShowHideForm("ForgotPasswordForm", "Show");


}



