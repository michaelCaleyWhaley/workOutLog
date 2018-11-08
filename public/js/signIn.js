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
  var data = serialiseForm(signInForm);
  console.log(data);

  var request = new XMLHttpRequest();
  request.open('POST', './users', true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(data);

  request.onreadystatechange = function(){
    var authentication = request.getResponseHeader('x-auth');
    console.log(authentication);
  }

});
