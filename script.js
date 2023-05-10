// TODO: Input där användaren anger antal högar och sedan väljer fördelning vid början

"use strict";

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

function hasWon(pilesArray) {
  let localPilesArray = pilesArray.map((x) => x); // Kopia

  let pilesLeft = pilesArray.length();
  while (pilesLeft > 0) {}
}

function play() {
	let piles = createPiles();
	debugger;

	let pileArchive = new Array();
	pileArchive.push(sortPiles(piles));

	let  i = 0;
	let isRunning = true;
	while (isRunning) {
		console.log("New: ");
		updatePiles(piles);
		for (let i of sortPiles(piles)) {
			console.log(i);
		}

		pileArchive.push(sortPiles(piles));
		//isRunning = !hasWon(pileArchive);
		isRunning = (i < 9);
		i++;
	}
}

play();
