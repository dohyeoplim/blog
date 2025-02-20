import argparse
import os
import re
from PIL import Image as PILImage

def get_image_size(image_path):
    try:
        with PILImage.open(image_path) as img:
            return img.width, img.height
    except Exception as e:
        print(f"Error reading {image_path}: {e}")
        return None, None

def main():
    parser = argparse.ArgumentParser(
        description="MDX file 참조 -> 각 image에 대해 실제 크기를 가져와 Image 컴포넌트로 교체"
    )
    parser.add_argument(
        "-f", "--file", required=True, help="file path to the MDX file"
    )
    args = parser.parse_args()

    mdx_file_path = args.file
    with open(mdx_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Set the target image folder
    mdx_name = os.path.splitext(os.path.basename(mdx_file_path))[0]
    image_folder = os.path.join(".", "public", "blog", mdx_name)
    print(f"Using image folder: {image_folder}")

    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    matches = list(re.finditer(pattern, content))

    replacements = []
    i = 0
    while i < len(matches):
        current = matches[i]
        alt = current.group(1).strip() or os.path.splitext(os.path.basename(current.group(2)))[0]
        src = current.group(2).strip()
        file_name = os.path.basename(src)
        full_path = os.path.join(image_folder, file_name)
        w, h = get_image_size(full_path)
        if w is None or h is None:
            print(f"Skipping {src} (image not found or error occurred)")
            i += 1
            continue

        # 콜라주 이미지 인식
        if i + 1 < len(matches):
            next_match = matches[i+1]
            in_between = content[current.end():next_match.start()]
            if in_between.strip() == "":
                alt2 = next_match.group(1).strip() or os.path.splitext(os.path.basename(next_match.group(2)))[0]
                src2 = next_match.group(2).strip()
                file_name2 = os.path.basename(src2)
                full_path2 = os.path.join(image_folder, file_name2)
                w2, h2 = get_image_size(full_path2)
                if w2 is None or h2 is None:
                    replacement = f'<Image src="{src}" alt="{alt}" width={{{w}}} height={{{h}}} />'
                    replacements.append((current.start(), current.end(), replacement))
                    i += 1
                    continue
                replacement = (
                    f'<Image\n'
                    f'    leftImage={{{{\n'
                    f'        src: "{src}",\n'
                    f'        alt: "{alt}",\n'
                    f'        width: {w},\n'
                    f'        height: {h},\n'
                    f'    }}}}\n'
                    f'    rightImage={{{{\n'
                    f'        src: "{src2}",\n'
                    f'        alt: "{alt2}",\n'
                    f'        width: {w2},\n'
                    f'        height: {h2},\n'
                    f'    }}}}\n'
                    f'/>\n'
                )
                replacements.append((current.start(), next_match.end(), replacement))
                i += 2
                continue

        # 단일 이미지
        replacement = f'<Image src="{src}" alt="{alt}" width={{{w}}} height={{{h}}} />'
        replacements.append((current.start(), current.end(), replacement))
        i += 1

    # replace in reverse order
    new_content = content
    for start, end, rep in sorted(replacements, key=lambda x: x[0], reverse=True):
        new_content = new_content[:start] + rep + new_content[end:]

    with open(mdx_file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Done")

if __name__ == "__main__":
    main()