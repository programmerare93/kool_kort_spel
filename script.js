// TODO: Input där användaren anger antal högar och sedan väljer fördelning vid början

// OLO

function createPiles(deckSize) {
  let piles = [];

  while (deckSize > 0) {
    let pileSize = Math.floor(Math.random() * deckSize) + 1;
    piles.push(pileSize);
    deckSize -= pileSize;
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
	let piles = createPiles(10);
	for (let i of sortPiles(piles)) {
		console.log(i);
	}

	let pileArchive = new Array();
	pileArchive.push(sortPiles(piles));

	let isRunning = true;
	while (isRunning) {
		console.log("New: ");
		updatePiles(piles);
		for (let i of sortPiles(piles)) {
			console.log(i);
		}

		pileArchive.push(sortPiles(piles));
		//isRunning = hasWon(pileArchive);
		isRunning = false;
	}
}

play();
