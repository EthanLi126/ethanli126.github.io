window.onload = function() {
    var x = document.getElementsByClassName('fg-slider');
    var y = document.getElementsByClassName('maintext');
    var z = document.getElementsByClassName('shadowtext');
    var a = document.getElementsByClassName('prompt');
    var b = document.getElementsByClassName('row');
    setTimeout(function() {
      document.getElementById("l-back").style.display = "none";
      document.getElementById("loader").style.display = "none";
      document.getElementById("maindiv").style.display = "initial";
      document.getElementById("navbar").style.width = "90%";
      document.getElementById("leftc").style.opacity = "1";

      for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('is-visible');}
      for (var i = 0; i < y.length; i++) {
      y[i].classList.remove('is-visible');}
      for (var i = 0; i < z.length; i++) {
      z[i].classList.remove('is-visible');}
      for (var i = 0; i < a.length; i++) {
      a[i].classList.remove('is-visible');}
      for (var i = 0; i < b.length; i++) {
      b[i].classList.remove('is-visible');}


    }, 1500);
}


function menu(x) {
  if (x.classList.contains("change")) {
    x.classList.remove("change"); 
    x.classList.add("changerev");
    document.getElementById("menu").style.height = "0%";
    document.getElementById("menu2").style.height = "0%";

  } else {
    x.classList.remove("changerev");
    x.classList.add("change");
    document.getElementById("menu").style.height = "100%";
    document.getElementById("menu2").style.height = "100%";
  }

}

function openTab(tabName) {
  var i, x;
  x = document.getElementsByClassName("containerTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.width = "0%";
    x[i].style.opacity = "0";
  }
  document.getElementById(tabName).style.width = "50%";
  document.getElementById(tabName).style.opacity = "1";
}

function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    document.getElementById("myUL").style.display = "block";

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;

        if (input.value.length == 0) {
            document.getElementById("myUL").style.display = "none";
        } else if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function openSearch() {
  var wi = document.getElementById('scontainer').style.width;

  if (wi !== "60%") {
    document.getElementById("scontainer").style.width = "60%";
    document.getElementById("scontainer").style.opacity = "1";

  } else {
    document.getElementById("scontainer").style.width = "0%";
    document.getElementById("scontainer").style.opacity = "0";
  }
}