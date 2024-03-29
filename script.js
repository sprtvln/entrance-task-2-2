"use strict";

var deviceList = document.querySelectorAll(".device");
var favDevices = document.querySelector(".fav-container");
var categories = document.querySelectorAll(".category");

deviceList.forEach(item => {
  var clone = item.cloneNode(true);
  favDevices.appendChild(clone);
});

categories.forEach(item => {
  item.addEventListener("click", function(evt) {
    if (evt.currentTarget.classList.contains("clicked")) {
      evt.currentTarget.classList.remove("clicked");
    } else {
      evt.currentTarget.classList.add("clicked");
      var currentCategory = item.classList[1];
      favDevices.childNodes.forEach(function(dev) {
        if (dev.classList && dev.classList.contains("device")) {
          if (
            !dev.classList.contains(currentCategory) &&
            currentCategory !== "all"
          ) {
            if (categories[0].classList.contains("clicked")) {
              categories[0].classList.remove("clicked");
            }
            dev.style = "display: none";
          } else {
            dev.style = "display: flex";
          }
        }
      });
    }
  });
});

document
  .querySelector(".fav-devices .arrow-left")
  .addEventListener("click", function() {
    console.log("left");
    favDevices.scrollLeft += 100;
  });

document
  .querySelector(".fav-devices .arrow-right")
  .addEventListener("click", function() {
    console.log("right");
    favDevices.scrollLeft -= 100;
  });

var template = document.querySelector("#pop-up-template");

function closePopUp(evt, popInClone, coords) {
  evt.stopPropagation();
  popInClone.classList.add("close");
  document.querySelector(".overlay").style = "display:none";
  popInClone.remove();
}

document.querySelectorAll(".device").forEach(function(item) {
  item.addEventListener("click", function(evt) {
    document.querySelector(".overlay").style = "display:flex";

    var popInClone = evt.currentTarget.cloneNode(true);
    var submitClone = document
      .querySelector(".submit-container")
      .cloneNode(true);
    document.querySelector("body").appendChild(popInClone);
    var coords = evt.currentTarget.getBoundingClientRect();
    popInClone.style =
      "position:fixed; top:" +
      coords.top +
      "px;" +
      "left: " +
      coords.left +
      "px";

    popInClone.classList.add("pop-up-container");

    popInClone.style = "top: calc(50% - 90px); left: calc(50% - 150px);";

    popInClone.appendChild(submitClone);

    if (popInClone.classList.contains("temperature")) {
      popInClone.insertAdjacentHTML(
        "beforeend",
        '<img id="oval" src="guide/assets/Oval@1x.svg">'
      );
      popInClone.insertAdjacentHTML(
        "beforeend",
        '<img id="bg" src="guide/assets/background@1x.svg">'
      );

      popInClone.insertAdjacentHTML("beforeend", "<span>+23<span>");
    } else if (popInClone.classList.contains("bulb")) {
      popInClone.insertAdjacentHTML(
        "beforeend",
        '<div class="slider for-bulb"><div class="bar"><div></div></div>'
      );
      dragSlider(document.querySelector(".bar"));
    } else if (popInClone.classList.contains("air")) {
      popInClone.insertAdjacentHTML(
        "beforeend",
        '<div class="slider for-air"><div class="bar"><div></div></div></div>'
      );
      dragSlider(document.querySelector(".bar"));
    }

    submitClone.style = "display:flex";

    submitClone
      .querySelector(".apply")
      .addEventListener("click", function(evt) {
        closePopUp(evt, popInClone, coords);
      });
    submitClone
      .querySelector(".close")
      .addEventListener("click", function(evt) {
        closePopUp(evt, popInClone, coords);
      });
  });

  var documentWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  var newWidth = Math.min(
    Math.ceil(document.querySelectorAll(".script").length / 3) * 220,
    documentWidth / 3
  );
  document.querySelector(".script-container").style =
    "width: " + newWidth + "px";

  window.onresize = function() {
    documentWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    newWidth = Math.min(
      Math.ceil(document.querySelectorAll(".script").length / 3) * 220,
      documentWidth / 3
    );
    if (documentWidth > 450) {
      document.querySelector(".script-container").style =
        "width: " + newWidth + "px";
      if (
        document.querySelector(".script-container").getBoundingClientRect()
          .right > documentWidth
      ) {
        document.querySelector(".scripts .nav-arrows").style = "display: block";
      } else {
        document.querySelector(".scripts .nav-arrows").style = "display: none";
      }
    }
  };

  document
    .querySelector(".scripts .arrow-left")
    .addEventListener("click", function() {
      document.querySelector(".script-container").scrollLeft += 100;
    });

  document
    .querySelector(".scripts .arrow-right")
    .addEventListener("click", function() {
      document.querySelector(".script-container").scrollLeft -= 100;
    });

  document.querySelector(".hamburger").addEventListener("click", function() {
    document.querySelector(".menu").style = "display: block";
  });
});

function dragSlider(element) {
  element.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (
        element.offsetLeft - shift.x > -1 &&
        element.offsetLeft - shift.x < 130
      ) {
        element.style.left = element.offsetLeft - shift.x + "px";
      }
    };

    var onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}
