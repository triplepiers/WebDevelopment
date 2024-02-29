import re
import os

savePath = "./handled"

def readFile(fileName: str) -> str:
    try:
        with open(fileName, mode="r", encoding='utf-8') as f:
            contents = f.read()	
    except:
        print(f'[Error] File {filename} doesn\'t exist')
        return None

    return contents

def filterCP(contents: str) -> dict:
    # 获取标题 <title></title>
    title = re.findall(r'<title>.*?</title>', contents)[0][7:-8]

    # 正文渲染在 <div class="chapter-render-box" data-cid=""></div> 内
    article = re.findall(r'<div.*class="cp-reader reader".*>.*</div>', contents)

    if len(article) == 0:
        print("[Error] failed to catch 'cp-reader'")
        return None
    else:
        article = article[0]

    # 非水印段落: <p data-v-4d771888="" class="">“靠，下死手啊。”</p>
    params = re.findall(r'<p data-v-[0-9a-zA-Z]*="" class="">.+?</p>', article) # ? -> 非贪婪模式    

    # 掐头去尾
    return {
        "title": title,
        "params": [ p[31:-4] for p in params ]
    }

def saveFile(content: dict) -> None:
    title = content["title"]
    filePath = os.path.join(savePath, f'{title}.txt')
    with open(filePath, "w") as f:
        # save title
        f.write(f'《{title}》\n\n')

        # save contents
        for p in content["params"]:
            f.write(f"{p}\n")
    print(f'Saved as {title}.txt')
    return

def HandleFile(fileName: str) -> None:
    print(f"Handling {fileName} ...")

    contents = readFile(fileName)

    if contents != None:
        saveFile(filterCP(contents))
        print("Finishied.")
    else:
        print("# Failed")

def Clear() -> None:
    # 清空路径（不考虑递归删除）
    if os.path.exists(savePath):
        for item in os.listdir(savePath):
            os.remove(os.path.join(savePath, item))
    else:
        os.makedir(savePath)