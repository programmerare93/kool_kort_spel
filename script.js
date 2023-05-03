// TODO: Input där användaren anger antal högar och sedan väljer fördelning vid början

function createPiles(deckSize) {
	let piles = [];

	while (deckSize > 0) {
		let pileSize = Math.floor(Math.random() * deckSize) + 1;
		piles.push(pileSize);
		deckSize -= pileSize;
	}

	return piles
}

function sortPiles(piles) {
	piles.sort().reverse();

	// Tar bort alla tomma högar
	let index = 0;
	for (let pile of piles) {
		if (pile === 0) {
			piles.splice(index, 1);
		}
		index++;
	}
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
	while (pilesLeft > 0) {

	}
}

function play() {
	let piles = createPiles(10);
	sortPiles(piles);
	for (let i of piles) {
		console.log(i);
	}

	let pileArchive = new Array();
	pileArchive.push(piles);


	let isRunning = true;
	let i = 0;
	while (isRunning) {
		console.log("New: ");
		updatePiles(piles);
		sortPiles(piles);
		for (let i of piles) {
			console.log(i);
		}

		pileArchive.push(piles);
		console.log(pileArchive);
		//isRunning = hasWon(pileArchive);
		isRunning = false;
	}
}

play();
