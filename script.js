"use strict";

// Våra html element
const newPilesBtn = document.querySelector(".new--piles");
const pilesContainer = document.querySelector(".piles--container");

//* Funktioner

// Skapar de första högarna
function createPiles() {
  let piles = []; // Representerar en kombination av högar

  const deckSize = prompt("Ange hur många kort du vill ha: ");
  const numOfPiles = prompt("Ange hur många högar av kort du vill ha: ");
  // Ser till så att man inte kan ange fler högar än kort
  if (Number(numOfPiles) > Number(deckSize)) {
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

  // Ifall användaren inte fördelade alla korten så läggs resten i en egen hög
  if (remainingNumOfCards > 0) {
    alert(
      `Du fördelade inte all korten så resten (${remainingNumOfCards} st) kommer att automatiskt hamna i sin egna hög`
    );
    piles.push(remainingNumOfCards);
  }

  return piles;
}

// Skapar html elementen för att visa högarna grafiskt
function createPileContainers(piles) {
  for (let pile of piles) {
    pilesContainer.innerHTML += `<p>${pile}</p>`; // Visar med ett heltal för användaren hur många kort som finns i högen
    for (let i = 0; i < pile; i++) {
      // Går igenom högen och skapar en bild för varje kort
      pilesContainer.innerHTML += `<img class="pile" src = "https://bicyclecards.org/wp-content/uploads/2019/11/red-56.jpg"></img>`;
    }
    pilesContainer.innerHTML += `<br>`; // Radbrytning för att separera högarna
  }
}

// Sorterar högarna i fallande ordning
function sortPiles(piles) {
  return piles
    .sort()
    .reverse()
    .filter((pile) => pile !== 0);
}

// Tar bort ett kort från varje hög och lägger ihop dem i en ny hög
function updatePiles(piles) {
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
  // Gör om varje fält i fältet till en sträng så att man kan jämföra
  let sortedArr = arr.map((a) => a.sort().reverse().join(","));
  let sortedSet = new Set(sortedArr);
  return sortedSet.size !== sortedArr.length;
}

function play() {
  let rounds = 0;
  let piles = createPiles();
  piles = sortPiles(piles);
  createPileContainers(piles);

  let pileArchive = new Array();
  pileArchive.push(piles);
  
  newPilesBtn.addEventListener("click", function () {
    rounds++;
    pilesContainer.innerHTML = "";
  
    updatePiles(piles);
    piles = sortPiles(piles);
    pileArchive.push(piles);

    createPileContainers(piles);
  
    if (arrayHasDuplicateArrays(pileArchive)) {
      if (pileArchive.at(-1).join(",") === pileArchive.at(-2).join(",")) {
        alert(`Patiensen har gått ur på runda ${rounds}`);
      } else {
        alert(`Högarna har loopat på runda ${rounds}`);
      }

      newPilesBtn.remove();
    }
  });
}

play();
