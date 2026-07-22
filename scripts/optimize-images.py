from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / "public" / "images"
ICON_DIR = ROOT / "public" / "icons" / "noun"
WIDTHS = (640, 1024, 1440)


for source in IMAGE_DIR.glob("*.jpg"):
    with Image.open(source) as image:
        for width in WIDTHS:
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            destination = source.with_name(f"{source.stem}-{width}.webp")
            resized.save(destination, "WEBP", quality=72, method=6)

for source in ICON_DIR.glob("*.png"):
    with Image.open(source) as image:
        image.thumbnail((96, 96), Image.Resampling.LANCZOS)
        image.save(source.with_suffix(".webp"), "WEBP", lossless=True, method=6)
