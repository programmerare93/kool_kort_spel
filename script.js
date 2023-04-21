function createPiles(deckSize) {
	let piles = [];

	while (deckSize > 0) {
		let pileSize = Math.floor(Math.random() * deckSize) + 1;
		piles.push(new Array(pileSize));
		deckSize -= pileSize;
	}

	return piles
}

let piles = createPiles(10);
for (let i of piles) {
	console.log(i);
}
