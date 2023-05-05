// TODO: Input där användaren anger antal högar och sedan väljer fördelning vid början

// OLO

const newPilesBtn = document.querySelector(".new--piles");
const pilesContainer = document.querySelector(".piles--container");

function createPiles(deckSize) {
  let piles = [];

  while (deckSize > 0) {
    let pileSize = Math.floor(Math.random() * deckSize) + 1;
    piles.push(pileSize);
    deckSize -= pileSize;
  }

  return piles;
}

function createPileContainers(piles) {
  for (let pile of piles) {
    pilesContainer.innerHTML += `<div class="pile">${pile}</div>`;
  }
}

function sortPiles(piles) {
  return piles
    .sort()
    .reverse()
    .filter((pile) => pile !== 0);
}

function updatePiles(piles) {
  let newPileLength = 0;

  let index = 0;
  for (let pile of piles) {
    if (pile === 0) {
      continue;
    }
    newPileLength++;
    piles[index] = --pile;
    ++index;
  }
  piles.push(newPileLength);
}

function arrayHasDuplicateArrays(arr) {
  let sortedArr = arr.map((a) => a.sort().reverse().join(","));
  console.log(sortedArr);
  let sortedSet = new Set(sortedArr);
  return sortedSet.size !== sortedArr.length;
}
function play() {
  let piles = createPiles(10);
  createPileContainers(sortPiles(piles));
  for (let i of sortPiles(piles)) {
    console.log(i);
  }

  let pileArchive = new Array();
  pileArchive.push(sortPiles(piles));

  newPilesBtn.addEventListener("click", function () {
    pilesContainer.innerHTML = "";
    console.log("New: ");
    updatePiles(piles);
    pileArchive.push(sortPiles(piles));
    createPileContainers(sortPiles(piles));
    for (let i of sortPiles(piles)) {
      console.log(i);
    }
    // console.log(pileArchive);
    if (arrayHasDuplicateArrays(pileArchive)) console.log("WIN!");
  });
}

play();
