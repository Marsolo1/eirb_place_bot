const start = [70, 61];

const image = [['       ', '       ', '       ', '#222222', '       ', '#222222', '#222222', '#222222', '#222222', '       ', '       ', '       ', '       '], ['       ', '       ', '#222222', '#888888', '#222222', '#614632', '#f25469', '#614632', '#e50000', '#222222', '       ', '       ', '       '], ['       ', '#222222', '#94e044', '#222222', '#820080', '#f25469', '#e50000', '#e50000', '#614632', '#e50000', '#222222', '       ', '       '], ['       ', '#222222', '#94e044', '#820080', '#614632', '#f25469', '#e50000', '#f25469', '#614632', '#614632', '#e50000', '#222222', '       '], ['       ', '#222222', '#222222', '#94e044', '#820080', '#e50000', '#e50000', '#e50000', '#e50000', '#614632', '#614632', '#e50000', '#222222'], ['#222222', '#94e044', '#888888', '#94e044', '#820080', '#e50000', '#f25469', '#614632', '#e50000', '#614632', '#614632', '#e50000', '#222222'], ['#222222', '#94e044', '#888888', '#820080', '#614632', '#e50000', '#e50000', '#e50000', '#614632', '#614632', '#e50000', '#222222', '       '], ['       ', '#222222', '#94e044', '#222222', '#820080', '#e50000', '#e50000', '#e50000', '#614632', '#e50000', '#222222', '       ', '       '], ['       ', '       ', '#222222', '#888888', '#222222', '#614632', '#f25469', '#614632', '#e50000', '#222222', '       ', '       ', '       '], ['       ', '       ', '       ', '#222222', '       ', '#222222', '#222222', '#222222', '#222222', '       ', '       ', '       ', '       ']]


const n = image.length;
const m = image[0].length;

async function getPixelColor(x, y) {
	try {
		const response = await placeAjax.get(`api/pos-info?x=${x}&y=${y}`).then((data) => {
			if ("pixel" in data) {
				if (data.pixel != null && data.pixel != undefined && "colour" in data.pixel) {
					console.log(data.pixel.colour);
					return data.pixel.colour;
				} else {
					console.log("No colour");
					return "";
				}
			} else {
				console.log('No pixel found');
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
			console.log(data);
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

async function main() {
	console.log('Starting...');
	let x = 0;
	let y = 0;
	let currentHex = '#000000';
	let noskip = false;
	while (true) {
		console.log("iteration");
		px = start[0] + x;
		py = start[1] + y;
		currentHex = image[x][y];
		if (currentHex.startsWith('#')) {
			await getPixelColor(px, px).then((data) => {
				console.log(data);
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
		} else {
			if (x === n - 1) {
				x = 0;
				y = (y + 1) % m;
			} else {
				x++;
			}
		}
		if (x === n - 1) {
			x = 0;
			y = (y + 1) % m;
		} else {
			x++;
		}
		await sleep(100);
	}
}

main();