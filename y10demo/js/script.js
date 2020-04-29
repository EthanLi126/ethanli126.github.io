window.onload = function() {
  document.getElementById("l-back").style.display = "none";
  document.getElementById("loader").style.display = "none";
  document.getElementById("maindiv").style.display = "initial";
  document.getElementById("navbar").style.display = "inline-block";
}



function menu(x) {
  if (x.classList.contains("change")) {
    x.classList.remove("change"); 
    x.classList.add("changerev");


  } else {
    x.classList.remove("changerev");
    x.classList.add("change");

  }

}



