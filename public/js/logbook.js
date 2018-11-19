var request = new XMLHttpRequest();
request.open('GET', '/todos');
request.send();
request.onreadystatechange = function () {
  if(request.status !== 200 && request.readyState === 4){
    alert('Please sign in');
    window.location = "/";
  }
};