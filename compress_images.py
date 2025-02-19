import argparse
import logging
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

def compress_image(image_path: Path, quality: int = 85) -> None:
    try:
        with Image.open(image_path) as img:
            img = img.convert("RGB")
            img.save(image_path, optimize=True, quality=quality)
        logging.info(f"✅ Compressed: {image_path}")
    except Exception as e:
        logging.error(f"❌ Failed: {image_path} - {e}")

def get_image_files(folder: Path) -> list:
    supported_exts = {".jpg", ".jpeg", ".png"}
    return [p for p in folder.rglob("*") if p.suffix.lower() in supported_exts]

def main():
    parser = argparse.ArgumentParser(description="Compress Images in a Folder")
    parser.add_argument("folder", type=str, help="폴더 경로")
    parser.add_argument("-q", "--quality", type=int, default=85, help="압축 품질 (default: 85)")
    parser.add_argument("-w", "--workers", type=int, default=4, help="Workers (default: 4)")
    args = parser.parse_args()

    folder = Path(args.folder)
    if not folder.exists():
        logging.error(f"지정한 폴더가 존재하지 않습니다: {folder}")
        return

    image_files = get_image_files(folder)
    logging.info(f"{len(image_files)}개의 이미지 파일을 찾았습니다: {folder}")

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        for image_path in image_files:
            executor.submit(compress_image, image_path, args.quality)

    logging.info("완료")

if __name__ == "__main__":
    main()