
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.backgroundColor = "rgba(0, 0, 0, .5)";
    document.getElementById("navbar").style.padding = "8px 10px";
    document.getElementById("logo").style.width= "90px";
    document.getElementById("navbar-right").style.fontSize = "18px";

  } else {
    document.getElementById("navbar").style.backgroundColor = "black";
    document.getElementById("navbar").style.padding = "10px 10px";
    document.getElementById("logo").style.width= "100px";
    document.getElementById("navbar-right").style.fontSize = "20px";
  }
}

var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 1500);
}

function showPage() {
  document.getElementById("l-back").style.display = "none";
  document.getElementById("loader").style.display = "none";
  document.getElementById("navbar").style.display = "initial";
  document.getElementById("maindiv").style.display = "initial";
}