const form = document.querySelector(".form");
const input = document.querySelector("input");
const button = document.querySelector("button");
const msg = document.querySelector(".msg");
const cities = document.querySelector(".cities");

const key = "f0ec1584bd86d7aed802527bbf63c343";

input.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    button.click();
  }
});
const getCityWeather = async () => {
  // if (
  //   cities.innerHTML
  //     .toLocaleLowerCase()
  //     .includes(input.value.slice().toLocaleLowerCase())
  // ) {
  //   alert("this city has already exist");
  // } else {
  let unitType = "metric";
  let lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=${unitType}&lang=${lang}`;
  try {
    const response = await fetch(url);
    const weatherInfo = await response.json();
    console.log(weatherInfo);
    const { main, name, sys, weather } = weatherInfo;
    console.log(main);
    const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png";`;

    const cityListItem = cities.querySelectorAll(".city");
    const cityListItemArray = Array.from(cityListItem);
    if (cityListItemArray.length > 0) {
      const filteredArray = cityListItemArray.filter(
        (cityCard) =>
          cityCard.querySelector(".city-name span").textContent == name
      );
      if (filteredArray.length > 0) {
        msg.innerText = `You have already ${name}`;
        setTimeout(() => {
          msg.innerText = "";
        }, 5000);
        return;
      }
    }
    console.log(icon);
    const li = document.createElement("li");
    li.classList.add("city");
    console.log(li);
    const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
      weather[0]["description"]
    }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
    li.innerHTML = markup;
    cities.prepend(li);
    input.value = "";
  } catch (error) {
    msg.textContent = "Please search for a valid city 😩";
    setTimeout(() => {
      msg.innerText = "";
    }, 5000);
  }
  // }
};
button.addEventListener("click", getCityWeather);
