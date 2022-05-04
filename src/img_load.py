
from PIL import Image
import numpy as np
from mappings import *

def rgbToHex(rgb):
	return '#%02x%02x%02x' % rgb

image = Image.open("img/bs.png")
pixels = image.load()
colormap = ColorMapper()
colorarray = colormap.generate_rgb_colors_array()
# print(colorarray)

result = np.array([["       "]*image.size[1]]*image.size[0])
# print(pixels[4,15])
print(colormap.closest_color(pixels[0, 0], colormap.generate_rgb_colors_array(), True))
for i in range(image.size[0]): # for every pixel:
	for j in range(image.size[1]):
		(r, g, b) = colormap.closest_color(pixels[i, j], colorarray, True)
		# print(r, g, b)
		# print(rgbToHex((r, g, b)))
		if (r,g,b) != (69, 42, 0):
			result[i,j] = rgbToHex((r, g, b))

print(result)

imgArray = open("array.txt", "w")
imgArray.write(str(result.tolist()))
imgArray.close()