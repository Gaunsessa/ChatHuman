from PIL import Image, ImageSequence, ImageDraw, ImageChops, ImageFilter
import os

input_gif = "ChatHumanTitle.gif"
output_gif = "ChatHumanTitleWhite.gif"

frames = []
durations = []

def add_outline(frame):
    frame = frame.convert("RGBA")
    datas = frame.getdata()

    # Create a binary mask where black pixels become opaque white
    mask = Image.new("L", frame.size, 0)
    mask_data = mask.load()
    for y in range(frame.height):
        for x in range(frame.width):
            r, g, b, a = frame.getpixel((x, y))
            if r < 10 and g < 10 and b < 10 and a > 0:
                mask_data[x, y] = 255

    # Expand the mask to create the outline
    outline = mask.filter(ImageFilter.MaxFilter(5))  # adjust thickness
    outline_img = Image.new("RGBA", frame.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(outline_img)
    draw.bitmap((0, 0), outline, fill=(255, 255, 255, 255))

    # Composite: white outline behind original frame
    result = Image.alpha_composite(outline_img, frame)
    return result

# Open the input GIF
with Image.open(input_gif) as im:
    for frame in ImageSequence.Iterator(im):
        processed = add_outline(frame.copy())
        frames.append(processed)
        durations.append(frame.info.get("duration", 40))  # default to 40ms/frame

# Save final animated GIF
frames[0].save(
    output_gif,
    save_all=True,
    append_images=frames[1:],
    duration=durations,
    loop=0,
    disposal=2,
    transparency=0
)

print(f"✅ Saved outlined GIF as: {output_gif}")

