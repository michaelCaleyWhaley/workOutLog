function logBookInit() {
  var request = new XMLHttpRequest();
  request.open('GET', '/todos');
  request.onreadystatechange = function () {
    if (request.status !== 200 && request.readyState === 4) {
      alert('Please sign in');
      window.location = "/";
    }
    requestUser();
  };
  request.send();
}

function requestUser() {
  var request = new XMLHttpRequest();
  request.open('GET', '/users/me');
  request.onreadystatechange = function () {
    if (request.status === 200 && request.readyState === 4) {
      addToDom(buildUserDetails(JSON.parse(request.response).email), 'user');
    }
  };
  request.send();
}

function addToDom(content, target){
  document.getElementsByClassName(target)[0].innerHTML = content;
}

function buildUserDetails(email){
  return 'User: ' + email;
}

logBookInit();