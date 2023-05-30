"use strict";

// Våra html element

const newPilesBtn = document.querySelector(".new--piles");
const pilesContainer = document.querySelector(".piles--container");

//* Funktioner

// Skapar de första högarna
function createPiles() {
  // NOTE: Input säkerhet?
  let piles = []; // Representerar en kombination av högar

  const deckSize = prompt("Ange hur många kort du vill ha: ");
  const numOfPiles = prompt("Ange hur många högar av kort du vill ha: ");
  if (Number(numOfPiles) > Number(deckSize)) {
    // Ser till så att man inte kan ange fler högar än kort
    alert("Du angav fler kort högar än antal kort");
    piles = createPiles(deckSize);
    return piles;
  }

  let remainingNumOfPiles = numOfPiles;
  let remainingNumOfCards = deckSize;

  // Skapar högarna
  while (remainingNumOfPiles > 0) {
    const currentPile = numOfPiles - remainingNumOfPiles + 1; // Högens nummer

    let input = Number(
      prompt(
        `Ange antal kort för hög ${currentPile} (${remainingNumOfCards} kort kvar): `
      )
    );

    if (remainingNumOfCards - input < 0) {
      alert("Du angav fler kort än vad du har kvar");
      continue;
    }
    remainingNumOfCards -= input;

    --remainingNumOfPiles;

    piles.push(input); // Varje hög representeras av ett heltal
  }

  if (remainingNumOfCards > 0) {
    // Ifall användaren inte fördelade alla korten så läggs resten i en egen hög
    alert(
      `Du fördelade inte all korten så resten (${remainingNumOfCards} st) kommer att automatiskt hamna i sin egna hög`
    );
    piles.push(remainingNumOfCards);
  }

  return piles;
}

function createPileContainers(piles) {
  // Skapar html elementen för att visa högarna grafiskt
  for (let pile of piles) {
    pilesContainer.innerHTML += `<p>${pile}</p>`; // Visar med ett heltal för användaren hur många kort som finns i högen
    for (let i = 0; i < pile; i++) {
      // Går igenom högen och skapar en bild för varje kort
      pilesContainer.innerHTML += `<img class="pile" src = "https://bicyclecards.org/wp-content/uploads/2019/11/red-56.jpg"></img>`;
    }
    pilesContainer.innerHTML += `<br>`; // Radbrytning för att separera högarna
  }
}

function sortPiles(piles) {
  // Sorterar högarna i fallande ordning
  return piles
    .sort()
    .reverse()
    .filter((pile) => pile !== 0);
}

function updatePiles(piles) {
  // Tar bort ett kort från varje hög och lägger ihop dem i en ny hög
  let newPile = 0;

  let index = 0;
  for (let pile of piles) {
    if (pile === 0) {
      continue;
    }
    newPile++;
    piles[index] = --pile;
    index++;
  }
  piles.push(newPile);
}

function arrayHasDuplicateArrays(arr) {
  let sortedArr = arr.map((a) => a.sort().reverse().join(","));
  let sortedSet = new Set(sortedArr);
  return sortedSet.size !== sortedArr.length;
}

function play() {
  let rounds = 0;
  let piles = createPiles();
  createPileContainers(sortPiles(piles));

  console.log(sortPiles(piles));

  let pileArchive = new Array();
  pileArchive.push(sortPiles(piles));

  newPilesBtn.addEventListener("click", function () {
    rounds++;
    pilesContainer.innerHTML = "";
    console.log("New: ");
    updatePiles(piles);
    pileArchive.push(sortPiles(piles));
    console.log(sortPiles(piles));
    createPileContainers(sortPiles(piles));
    console.log(pileArchive);
    if (arrayHasDuplicateArrays(pileArchive)) {
      console.log("Duplicate found");

      console.log("Rounds: " + rounds);
      if (pileArchive.at(-1).join(",") === pileArchive.at(-2).join(",")) {
        console.log("Last two piles are equal");
        alert(`Patiensen har gått ur på runda ${rounds}`);
      } else {
        console.log("The deck has looped");
        alert(`Högarna har loopat på runda ${rounds}`);
      }

      newPilesBtn.remove();
    }
  });
}

play();
