
var signInForm = document.getElementsByClassName('sign-in__form')[0];
var signInSubmit = document.getElementsByClassName('sign-in__submit')[0];
var inputFields = signInForm.getElementsByTagName('input');
var labelFields = signInForm.getElementsByTagName('label');

signInSubmit.addEventListener('click', function(e){
  e.preventDefault();

  var data = {};

  for(var i = 0; i < inputFields.length; i++){
    data.labelFields[i].innerText = inputFields[i].value;
  }

  console.log(data);

});