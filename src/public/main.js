const latitudeInput = document.querySelector('input[name="latitude"]');
const longitudeInput = document.querySelector('input[name="longitude"]');
const h1 = document.querySelector("h1");
const btnLocation = document.querySelector("input[name='btnLocation']");

btnLocation.addEventListener("click", getLocation);

function getLocation() {
  geoconfig = {
    enableHighAccuracy: true,
    // timeout: 10000,
    // maximunAge: 60000,
  };
  navigator.geolocation.getCurrentPosition(
    fillInputCoordinates,
    errors,
    geoconfig
  );
}

function fillInputCoordinates(position) {
  latitudeInput.value = position.coords.latitude;
  longitudeInput.value = position.coords.longitude;
}

function errors(error) {
  // este objeto tine dos atributos: error y message
  alert("Error: " + error.code + " " + error.message);
}

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const latitude = latitudeInput.value;
  const longitude = longitudeInput.value;

  h1.innerText = "Loading...";

  try {
    const res = await fetch(`/latitude/${latitude}/longitude/${longitude}`);
    const { temperature, timezone } = await res.json();

    h1.innerHTML = `The temperature in ${timezone} is ${temperature}&#176.`;
  } catch (error) {
    console.log(error);
    h1.innerText = "Error!";
  }
});
