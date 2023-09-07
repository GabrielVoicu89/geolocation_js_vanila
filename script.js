let whereIam = document.querySelector(".whereIam");
let whereIamDiv = document.querySelector(".whereIamDiv");
let savePosition = document.querySelector(".savePosition");
let savePositionDiv = document.querySelector(".savePositionDiv");
let whereIwas = document.querySelector(".whereIwas");
let whereIwasDiv = document.querySelector(".whereIwasDiv");
let del = document.querySelector(".del");
let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

whereIam.addEventListener("click", function () {
  let par1 = document.createElement("p");
  whereIamDiv.appendChild(par1);
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let accuracy = position.coords.accuracy;
    par1.innerText =
      "Votre latitude : " + latitude + "\n Votre longitude :" + longitude;
    map.flyTo([latitude, longitude], 16);
    let marker = L.marker([latitude, longitude]).addTo(map);
    let circle = L.circle([latitude, longitude], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: accuracy,
    }).addTo(map);
    marker.bindPopup("<b>You are here!</b>").openPopup();
    circle.bindPopup("Accuracy of your location");
    savePosition.addEventListener("click", function () {
      savePositionDiv.innerHTML = "<p>Your position is saved</p>";
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
    });
  });
});
whereIwas.addEventListener("click", function () {
  let par3 = document.createElement("p");
  whereIwasDiv.appendChild(par3);
  let latitudeStored = localStorage.getItem("latitude");
  let longitudeStored = localStorage.getItem("longitude");
  par3.innerText =
    "Your last position is :\n" +
    "Latitude: " +
    latitudeStored +
    "\n Longitude: " +
    longitudeStored;
});
del.addEventListener("click", function () {
  localStorage.removeItem("latitude");
  localStorage.removeItem("longitude");
  whereIamDiv.innerText = "";
  savePositionDiv.innerText = "";
  whereIwasDiv.innerText = "";
});
