var signInForm = document.getElementsByClassName("sign-in__form")[0];
var signInRegister = document.getElementsByClassName("sign-in__register")[0];

function serialiseForm(form) {
  var input = form.getElementsByTagName("input");
  var formData = {};
  for (var i = 0; i < input.length; i++) {
    formData[input[i].name] = input[i].value;
  }
  return formData = JSON.stringify(formData);
}

function bindFormEvent(form) {
  var submitBtn = form.getElementsByClassName('sign-in__submit')[0];
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var data = serialiseForm(form);
    console.log(data);
    var request = new XMLHttpRequest();
    request.open('POST', form.action, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(data);
    request.onreadystatechange = function(){
      console.log(request);
    };
  });
}

bindFormEvent(signInForm);
bindFormEvent(signInRegister);