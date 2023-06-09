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
  let newPiles = []; // Den nya högen som sedan returneras

  for (let pile of sortPiles(piles)) {
    newPile++;
    newPiles.push(--pile);
  }

  newPiles.push(newPile);
  newPiles = sortPiles(newPiles);
  return newPiles;
}

function arrayHasDuplicateArrays(arr) {
  let stringArr = arr.map((a) => a.join(",")); // Går igenom varje hög i samlingen av högar och gör om dem till en sträng för att kunna jämföra dem
  let stringSet = new Set(stringArr); // Tar bort alla dubbletter
  return stringSet.size !== stringArr.length; // Om det finns dubbletter så kommer storleken på seten att vara mindre än storleken på arrayen
}

function play() {
  let rounds = 0; // Räknar antalet rundor som har spelats
  let piles = sortPiles(createPiles()); // Skapar de första högarna
  createPileContainers(piles); // Skapar html elementen för att visa högarna grafiskt
  let pileArchive = new Array(); // Sparar alla högkombinationer som har skapats
  pileArchive.push(piles);

  newPilesBtn.addEventListener("click", function () {
    rounds++;
    pilesContainer.innerHTML = ""; // Återställer högarna grafiskt
    piles = updatePiles(piles);
    pileArchive.push(piles);
    createPileContainers(piles);
    if (arrayHasDuplicateArrays(pileArchive)) {
      // Kollar ifall patiensen har gått ut

      if (pileArchive.at(-1).join(",") === pileArchive.at(-2).join(",")) {
        // Kollar ifall de två sista högkombinationerna är lika
        alert(`Patiensen har gått ur på runda ${rounds}`);
      } else {
        alert(`Högarna har loopat på runda ${rounds}`);
      }

      newPilesBtn.remove(); // Tar bort knappen
    }
  });
}

play();
