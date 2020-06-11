let xhr = new XMLHttpRequest();
xhr.open('post', 'http://localhost:3000/users/login', true)
xhr.setRequestHeader("Content-Type", "application/json");
xhr.withCredentials=true;
xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4) console.log(JSON.parse(xhr.responseText));
}
xhr.send(JSON.stringify({"usercode":"banana","password":"123456"}));

let xhr = new XMLHttpRequest();
xhr.open('post', 'http://localhost:3000/post/addpost', true)
xhr.setRequestHeader("Content-Type", "application/json");
xhr.withCredentials=true;
xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4) console.log(xhr.responseText);
}
xhr.send(JSON.stringify({"PostType":"banana","Tag":"123456","PostTitle":"test"}));


let xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/users/login', true)
xhr.setRequestHeader("Content-Type", "application/json");
xhr.withCredentials=true;
xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4) console.log(xhr.responseText);
}
xhr.send();

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhb…TkzfQ.CHmUkkMG8ATl021afPnAxn9RLVGPsM_j3SrIzD4aipY
let xhr = new XMLHttpRequest();
xhr.open('get', 'http://localhost:3000/users/login?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhb…TkzfQ.CHmUkkMG8ATl021afPnAxn9RLVGPsM_j3SrIzD4aipY', true)
xhr.setRequestHeader("Content-Type", "application/json");
xhr.withCredentials=true;
xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4) console.log(xhr.responseText);
}
xhr.send();