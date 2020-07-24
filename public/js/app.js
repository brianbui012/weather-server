//PUBLIC CLIENT SIDE JAVASCRIPT

console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");
const messageThree = document.querySelector(".message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContext = "Use this site to check the weather!";

  fetch(`/weather?address=${searchLocation.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        messageThree.textContent = "";
      }
    });
  });
});
