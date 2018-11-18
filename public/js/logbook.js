var request = new XMLHttpRequest();
request.open('GET', '/todos');
request.send();
request.onreadystatechange = function () {
  console.log(request);
};