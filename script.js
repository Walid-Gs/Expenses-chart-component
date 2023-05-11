"use strict";

// selecting Dom elements :

// filling the amount of the chart items :

async function getChartData() {
  try {
    //fetching the data responsose:
    const response = await fetch("/data.json");

    // handling errors:
    if (!response.ok) throw new Error("somthing went wrong ...!!!!");

    // getting the data:
    const data = await response.json();
    console.log(data);
    // rendring
    renderToChart(data);
    getHigherChartItem(data);
  } catch (err) {
    console.error(err);
  }
}
// calling the main function
getChartData();

// creating a function that render and draw the exact chart :
function renderToChart(data) {
  data.forEach(function (item) {
    const elementId = item.day;
    const amount = item.amount;

    document.querySelector(`#${elementId}`).style.height = `${amount}%`;
    document
      .querySelector(`#${elementId}`)
      .querySelector(".percentage-box").textContent = `$${amount}`;
  });
}

// creating the function that get the higher percentage item and make it color diferent:
function getHigherChartItem(data) {
  let max = 0;
  // finding the bigger percentage:
  data.forEach(function (item) {
    if (item.amount > max) {
      max = item.amount;
    }
  });
  const biggest = data.find(function (item) {
    return item.amount === max;
  });
  document.querySelector(`#${biggest.day}`).style.backgroundColor =
    "hsl(186, 34%, 60%)";
}
