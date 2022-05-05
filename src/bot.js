const start = [,];

const image = [[]];

const n = image.length;
const m = image[0].length;

async function getPixelColor(x, y) {
	try {
		const response = await placeAjax.get(`api/pos-info?x=${x}&y=${y}`).then((data) => {
			if ("pixel" in data) {
				if (data.pixel != null && data.pixel != undefined && "colour" in data.pixel) {
					console.log(`(${x},${y}) is ${data.pixel.colour}`);
					return data.pixel.colour;
				} else {
					console.log(`(${x},${y}) is empty`);
					return "";
				}
			} else {
				console.log(`(${x},${y}) : no pixel found`);
			}
		});
		return response;
	} catch (error) {
		console.log(error);
	};
}

async function placePixel(x, y, hex) {
	try {
		const response = await placeAjax.post(`api/place`, { x: x, y: y, hex: hex }).then((data) => {
			return data;
		});
		return response;
	} catch (error) {
		console.log(error);
	};
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computexy(x, y, n, m) {
	if (x === n - 1 && y === m - 1) {
		x = 0;
		y = 0;
		return true;
	} else if (x === n - 1) {
		x = 0;
		y++;
		return false;
	} else {
		x++;
		return false;
	}
}

async function main() {
	console.log('Starting...');
	let x = 0;
	let y = 0;
	let currentHex = '#000000';
	let noskip = false;
	while (true) {
		px = start[0] + x;
		py = start[1] + y;
		currentHex = image[x][y];
		if (currentHex.startsWith('#')) {
			await getPixelColor(px, py).then((data) => {
				if (currentHex.slice(1) === data || (currentHex.slice(1) === "ffffff" && data === "")) {
					console.log(`Pixel ${px}, ${py} is already ${data === "" ? "empty" : data}`);
					noskip = false;
				} else {
					console.log(`Placing color ${currentHex} at pixel ${px}, ${py}`);
					noskip = true;
				}
			}, (error) => {
				console.log(error);
			});
			if (noskip) {
				await placePixel(px, py, currentHex).then((data) => {
					if (data.success) {
						console.log(`Placed color ${currentHex} at pixel ${px}, ${py}`);
					} else {
						console.log(`Failed to place color ${currentHex} at pixel ${px}, ${py}`);
					}
					currentTimer = data.timer.seconds;
				});
				await sleep((currentTimer) * 1000);
				await sleep(getRandomInt(150, 600) * 10);
			}
		}
		if (x === n - 1 && y === m - 1) {
			x = 0;
			y = 0;
			console.log("End of image, returning to start in 10 seconds");
			await sleep(10 * 1000);
		} else if (x === n - 1) {
			x = 0;
			y++;
		} else {
			x++;
		}
		await sleep(100);
	}
}

main();