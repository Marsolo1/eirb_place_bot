const start = [148, 31];

const image = [['       ', '       ', '       ', '       ', '       ', '       ', '       ', '#222222', '#222222', '#222222', '#222222', '#222222', '#222222', '       ', '       ', '       ', '       ', '       ', '       ', '       '], ['       ', '       ', '       ', '       ', '       ', '#222222', '#222222', '#0083c7', '#0083c7', '#0083c7', '#0083c7', '#0000ea', '#0000ea', '#222222', '#222222', '       ', '       ', '       ', '       ', '       '], ['       ', '       ', '       ', '       ', '#222222', '#6837e7', '#0083c7', '#00d3dd', '#00d3dd', '#00d3dd', '#e4e4e4', '#0000ea', '#0000ea', '#0083c7', '#0083c7', '#222222', '       ', '       ', '       ', '       '], ['       ', '       ', '       ', '#222222', '#6837e7', '#00d3dd', '#0083c7', '#0083c7', '#0083c7', '#00d3dd', '#e4e4e4', '#0000ea', '#0000ea', '#e4e4e4', '#0083c7', '#00d3dd', '#222222', '       ', '       ', '       '], ['       ', '       ', '#222222', '#6837e7', '#00d3dd', '#0083c7', '#e4e4e4', '#e4e4e4', '#e4e4e4', '#ffffff', '#ffffff', '#0000ea', '#0000ea', '#ffffff', '#e4e4e4', '#94e044', '#00d3dd', '#222222', '       ', '       '], ['       ', '#222222', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#222222', '       '], ['       ', '#222222', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#222222', '       '], ['#222222', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#222222'], ['#222222', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#0000ea', '#222222'], ['#222222', '#820080', '#cf6ee4', '#e4e4e4', '#e4e4e4', '#e4e4e4', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#0000ea', '#0000ea', '#ffffff', '#ffffff', '#e4e4e4', '#94e044', '#ffffff', '#02be01', '#222222'], ['#222222', '#820080', '#cf6ee4', '#cf6ee4', '#cf6ee4', '#e4e4e4', '#e4e4e4', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#0000ea', '#0000ea', '#ffffff', '#e4e4e4', '#94e044', '#94e044', '#02be01', '#02be01', '#222222'], ['#222222', '#820080', '#cf6ee4', '#820080', '#cf6ee4', '#cf6ee4', '#e4e4e4', '#e4e4e4', '#94e044', '#e4e4e4', '#ffffff', '#0000ea', '#0000ea', '#e4e4e4', '#94e044', '#94e044', '#02be01', '#02be01', '#94e044', '#222222'], ['#222222', '#820080', '#820080', '#820080', '#cf6ee4', '#cf6ee4', '#cf6ee4', '#e4e4e4', '#94e044', '#94e044', '#e4e4e4', '#0000ea', '#0000ea', '#e4e4e4', '#94e044', '#02be01', '#02be01', '#94e044', '#e5d900', '#222222'], ['       ', '#222222', '#820080', '#820080', '#e59500', '#cf6ee4', '#cf6ee4', '#e59500', '#ffffff', '#94e044', '#e4e4e4', '#0000ea', '#0000ea', '#e4e4e4', '#02be01', '#02be01', '#94e044', '#02be01', '#222222', '       '], ['       ', '#222222', '#820080', '#cf6ee4', '#820080', '#cf6ee4', '#e59500', '#e59500', '#e59500', '#ffffff', '#94e044', '#0000ea', '#0000ea', '#94e044', '#94e044', '#02be01', '#02be01', '#94e044', '#222222', '       '], ['       ', '       ', '#222222', '#e54b00', '#e59500', '#e54b00', '#e54b00', '#e59500', '#e59500', '#ffffff', '#ffffff', '#0000ea', '#0000ea', '#ffffff', '#02be01', '#02be01', '#00d3dd', '#222222', '       ', '       '], ['       ', '       ', '       ', '#222222', '#e54b00', '#e59500', '#e59500', '#e54b00', '#e54b00', '#e59500', '#e5d900', '#0000ea', '#0000ea', '#ffffff', '#02be01', '#00d3dd', '#222222', '       ', '       ', '       '], ['       ', '       ', '       ', '       ', '#222222', '#e54b00', '#e59500', '#e59500', '#e59500', '#e59500', '#ffffff', '#0000ea', '#0000ea', '#94e044', '#94e044', '#222222', '       ', '       ', '       ', '       '], ['       ', '       ', '       ', '       ', '       ', '#222222', '#222222', '#e59500', '#e5d900', '#e5d900', '#e59500', '#0000ea', '#0000ea', '#222222', '#222222', '       ', '       ', '       ', '       ', '       '], ['       ', '       ', '       ', '       ', '       ', '       ', '       ', '#222222', '#222222', '#222222', '#222222', '#222222', '#222222', '       ', '       ', '       ', '       ', '       ', '       ', '       ']]


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
				if (currentHex.slice(1) !== data) {
					console.log(`Placing color ${currentHex} at pixel ${px}, ${py}`);
					noskip = true;
				} else {
					console.log(`Pixel ${px}, ${py} is already ${data}`);
					noskip = false;
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
				await sleep(getRandomInt(5, 11) * 1000);
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