import os, json

base_path = os.path.abspath('./')
print("Current work path is: ", base_path)

res = {"data": []}

with open("data.json", "w") as f:
    for item in os.listdir():
        if os.path.isdir(item) and item[0] != '.' and item not in ["img", "tmp", "ref"]:
            for paths, dirs, files, in os.walk(os.path.join(base_path, item)):
                for file in files:
                    if file.endswith(".html"):
                        res["data"].append({
                            "name": file[:-5],
                            "path": os.path.relpath(os.path.join(paths, file), base_path)
                        })
    json.dump(res, f)

print("Finished, you can check result in data.json!")