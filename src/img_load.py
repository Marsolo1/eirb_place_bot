
from PIL import Image
import numpy as np
from mappings import *
import sys

def rgbToHex(rgb):
	return '#%02x%02x%02x' % rgb

image = Image.open(sys.argv[1])
pixels = image.load()
colormap = ColorMapper()
colorarray = colormap.generate_rgb_colors_array()
# print(colorarray)

result = np.array([["       "]*image.size[1]]*image.size[0])
for i in range(image.size[0]): # for every pixel:
	for j in range(image.size[1]):
		(r, g, b) = colormap.closest_color(pixels[i, j], colorarray, True)
		# print(r, g, b)
		# print(rgbToHex((r, g, b)))
		if (r,g,b) != (69, 42, 0):
			result[i,j] = rgbToHex((r, g, b))

print(result)

imgArray = open(sys.argv[1].replace(".png",".txt"), "w")
imgArray.write(str(result.tolist()))
imgArray.close()