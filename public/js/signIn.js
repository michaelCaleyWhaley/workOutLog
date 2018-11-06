var signInForm = document.getElementsByClassName("sign-in__form")[0];
var signInSubmit = document.getElementsByClassName("sign-in__submit")[0];

function serialiseForm(form) {
  var input = form.getElementsByTagName("input");
  var formData = {};
  for (var i = 0; i < input.length; i++) {
    formData[input[i].name] = input[i].value;
  }
  return formData = JSON.stringify(formData);
}

signInSubmit.addEventListener("click", function(e) {
  e.preventDefault();

  serialiseForm(signInForm);
});
