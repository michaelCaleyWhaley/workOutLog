function logOutInit() {
  var logout = document.getElementById('logout');
  logout.addEventListener('click', function (e) {
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.open('DELETE', '/users/me/token');
    request.onreadystatechange = function () {
      if (request.status !== 200 && request.readyState === 4) {
        window.location = "/";
      }
    };
    request.send();
  });
}
logOutInit();