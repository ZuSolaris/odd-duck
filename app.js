'use strict';
console.log('Hello');


//!! DEFINED VARIABLES//
//**Global**
let votes = 25;
let itemStorage = [];
let indexArray = [];
//**DOM DEFINER**//

let itemDisplay = document.getElementById('itemDisplay');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let resultsBtn = document.getElementById('itempick');




//!! RENDER LOGIC!!//


//!REPEAT PREVENTION LOGIC//

function itemrender() {
  console.log('test');

  while (indexArray.length < 6) {
    let num = randomizer();
    while (indexArray.includes(num)) {
      num = randomizer();
    }
    indexArray.push(num);
  }
  console.log(indexArray);
  let img1grab = indexArray.shift();
  let img2grab = indexArray.shift();
  let img3grab = indexArray.shift();

  //Image Selector For Display
  img1.src = itemStorage[img1grab].img;
  img2.src = itemStorage[img2grab].img;
  img3.src = itemStorage[img3grab].img;
  // Item View Counter//
  itemStorage[img1grab].views++;
  itemStorage[img2grab].views++;
  itemStorage[img3grab].views++;

  //Alt Name for Accessibility//
  img1.alt = itemStorage[img1grab].name;
  img2.alt = itemStorage[img2grab].name;
  img3.alt = itemStorage[img3grab].name;

}

//! LOCAL Storage Continued//
let retrieveddata = localStorage.getItem('');
console.log('Data Retrieved:', retrieveddata);



//!!CHART LOGIC//

//**Logic for Chart Labels *//

function chartRender() {


  let objnames = [];
  let objvotes = [];
  let objviews = [];

  for (let i = 0; i < itemStorage.length; i++) {
    objnames.push(itemStorage[i].name);
    objvotes.push(itemStorage[i].clicks);
    objviews.push(itemStorage[i].views);
  }

  let makeChart = document.getElementById('voteres').getContext('2d');
  let chartItem = {
    // Vote Properties//
    type: 'bar',
    data: {
      labels: objnames,
      datasets: [{
        data: objvotes,
        label: 'Times Voted',
        backgroundColor: [
          'orange'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 5
      },
      // View Properties//
      {
        data: objviews,
        label: 'Times Viewed',
        backgroundColor: [
          'red'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 5
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  //Chart Constructor//

  new Chart(makeChart, chartItem);
}

//!!COMPUTATIONAL LOGIC SECTION//

//**Randomizer**//

function randomizer() {
  return Math.floor(Math.random() * itemStorage.length);
}

// **Object Definer**//

function Item(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  itemStorage.push(this);
}




//!!Clicks & Counter Logic//

function clicklogic(event) {
  let imgselect = event.target.alt;

  for (let i = 0; i < itemStorage.length; i++) {
    if (itemStorage[i].name === imgselect) {
      itemStorage[i].clicks++;
      votes--;
      finalRes();
      itemrender();
    }
  }
}
function finalRes() {
  if (votes === 0) {
    itemDisplay.removeEventListener('click', clicklogic);
    // resultslogic();
    chartRender();

    //!Local Data Storage Starts Here//
    let stringObjects = JSON.stringify(itemStorage);

    console.log('strings >>', stringObjects);

    localStorage.setItem('storedObjects', stringObjects);
  }
}

//!LOCAL DATA EXTRACTION//
// etrObj stands for Extracted Objects//
let etrObj = localStorage.getItem('storedObjects');
console.log('Extracted Objects:', etrObj);

//Data Recall//

let recallObj = JSON.parse(etrObj);

console.log('Recalled Objects:', recallObj);


//**Item Creator with Data filter**//



if (etrObj) {
  itemStorage = recallObj;
}

else {

  new Item('bag');
  new Item('banana');
  new Item('bathroom');
  new Item('boots');
  new Item('breakfast');
  new Item('bubblegum');
  new Item('chair');
  new Item('cthulhu');
  new Item('dog-duck');
  new Item('dragon');
  new Item('pen');
  new Item('pet-sweep');
  new Item('scissors');
  new Item('shark');
  new Item('sweep', 'png');
  new Item('tauntaun');
  new Item('unicorn');
  new Item('water-can');
  new Item('wine-glass');
}

// !!Results Logic//

// function resultslogic() {
//   if (votes === 0); {
//     for (let i = 0; i < itemStorage.length; i++) {
//       let LiLM = document.createElement('li');
//       LiLM.textContent = `${itemStorage[i].name} was viewed: ${itemStorage[i].views} and clicked: ${itemStorage[i].clicks}`;
//       resultsBtn.appendChild(LiLM);
//     }
//     resultsBtn.removeEventListener('click', resultslogic);
//   }



//!!INTIALIZE


itemrender();

itemDisplay.addEventListener('click', clicklogic);
