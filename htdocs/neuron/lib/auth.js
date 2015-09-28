function auth(){
if(document.getElementById("username").value == "rhythme" && document.getElementById("password").value == "pass"){
location.href='../kmrn';
document.getElementById("lstat").innerHTML = '';
}
else document.getElementById("lstat").innerHTML = 'Wrong Credentials. Try again!';
}