"use strict";

const newPilesBtn = document.querySelector(".new--piles");
const pilesContainer = document.querySelector(".piles--container");

function createPiles() {
	// NOTE: Input säkerhet?
	let piles = [];

	const deckSize = prompt("Ange hur många kort du vill ha: ");
	const numOfPiles = prompt("Ange hur många högar av kort du vill ha: ");
	if (Number(numOfPiles) > Number(deckSize)) {
		alert("Du angav fler kort högar än antal kort");
		piles = createPiles(deckSize);
		return piles;
	}

	let remainingNumOfPiles = numOfPiles;
	let remainingNumOfCards = deckSize;
	while (remainingNumOfPiles > 0) {
		const currentPile = numOfPiles - remainingNumOfPiles + 1;

		let input = prompt(`Ange antal kort för hög ${currentPile} (${remainingNumOfCards} kort kvar): `);

		input = Number(input);
		if (remainingNumOfCards - input < 0) {
			alert("Du angav fler kort än vad du har kvar");
			continue;
		}
		remainingNumOfCards -= input;

		--remainingNumOfPiles;

		piles.push(input);
	}

	if (remainingNumOfCards > 0) {
		alert(`Du fördelade inte all korten så resten (${remainingNumOfCards} st) kommer att automatiskt hamna i sin egna hög`);
		piles.push(remainingNumOfCards);
	}

	return piles;
}

function createPileContainers(piles) {
  for (let pile of piles) {
    pilesContainer.innerHTML += `<p>${pile}</p>`;
    for (let i = 0; i < pile; i++) {
      pilesContainer.innerHTML += `<img class="pile" src = "https://bicyclecards.org/wp-content/uploads/2019/11/red-56.jpg"></img>`;
    }
    pilesContainer.innerHTML += `<br>`;
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
  let sortedSet = new Set(sortedArr);
  return sortedSet.size !== sortedArr.length;
}

function play() {
  let rounds = 1;
  let piles = createPiles();
  createPileContainers(sortPiles(piles));
  for (let i of sortPiles(piles)) {
    console.log(i);
  }

  let pileArchive = new Array();
  pileArchive.push(sortPiles(piles));

  newPilesBtn.addEventListener("click", function () {
    rounds++;
    pilesContainer.innerHTML = "";
    console.log("New: ");
    updatePiles(piles);
    pileArchive.push(sortPiles(piles));
    createPileContainers(sortPiles(piles));
    for (let i of sortPiles(piles)) {
      console.log(i);
    }
    // console.log(pileArchive);
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
