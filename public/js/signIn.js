var signInForm = document.getElementsByClassName("sign-in__form")[0];
var signInRegister = document.getElementsByClassName("sign-in__register")[0];
var signInH2 = document.getElementsByClassName('sign-in__h2')[0];

function serialiseForm(form) {
  var input = form.getElementsByTagName("input");
  var formData = {};
  for (var i = 0; i < input.length; i++) {
    formData[input[i].name] = input[i].value;
  }
  return formData = JSON.stringify(formData);
}

function submitForm(form) {
  var submitBtn = form.getElementsByClassName('sign-in__submit')[0];
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var data = serialiseForm(form);
    var request = new XMLHttpRequest();
    request.open('POST', form.action, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    request.onreadystatechange = function(){
      if(request.status === 200 && request.readyState === 4){
        window.location = "/logbook";
      } else if(request.readyState === 4) {
        alert(JSON.parse(request.response).errmsg);
      }
    };
  });
}

submitForm(signInForm);
submitForm(signInRegister);

function revealRegister(target){
  target.addEventListener('click', function(){
    signInRegister.classList.add('reveal');
  });
}
revealRegister(signInH2);