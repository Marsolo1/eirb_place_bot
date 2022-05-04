import math
from PIL import ImageColor


class ColorMapper:
    COLOR_MAP = {
		'#FFFFFF': 0,
		'#E4E4E4': 1,
		'#B6B6B6': 2,
		'#888888': 3,
		'#222222': 4,
		'#614632': 5,
		'#A06A42': 6,
		'#D0898A': 7,
		'#D0B5A1': 8,
		'#FFA7D1': 9,
		'#F25469': 10,
		'#E50000': 11,
		'#E54B00': 12,
		'#E59500': 13,
		'#E5D900': 14,
		'#94E044': 15,
		'#02BE01': 16,
		'#00D3DD': 17,
		'#0083C7': 18,
		'#0000EA': 19,
		'#6837E7': 20,
		'#CF6EE4': 21,
		'#A937B2': 22,
		'#820080': 23,
	}

    @staticmethod
    def rgb_to_hex(rgb: tuple):
        """Convert rgb tuple to hexadecimal string."""
        return ("#%02x%02x%02x" % rgb).upper()

    @staticmethod
    def closest_color(
        target_rgb: tuple, rgb_colors_array: list, legacy_transparency: bool
    ):
        """Find the closest rgb color from palette to a target rgb color, as well as handling transparency"""

        # first check is for the alpha channel transparency in ex. png
        if target_rgb[3] == 0:
            return (69, 42, 0)
        # second check is for the legacy method of transparency using hex #452A00.
        if target_rgb[:3] == (69, 42, 0) and legacy_transparency:
            return (69, 42, 0)

        r, g, b = target_rgb[:3]
        color_diffs = []
        for color in rgb_colors_array:
            cr, cg, cb = color
            color_diff = math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2)
            color_diffs.append((color_diff, color))
        return min(color_diffs)[1]

    @staticmethod
    def generate_rgb_colors_array():
        """Generate array of available rgb colors to be used"""
        return [
            ImageColor.getcolor(color_hex, "RGB")
            for color_hex in list(ColorMapper.COLOR_MAP.keys())
        ]
