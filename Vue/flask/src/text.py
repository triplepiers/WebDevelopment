import time

from flask import Blueprint, request, jsonify
from src.models import Txt
from src.database import db
from sqlalchemy.orm import sessionmaker

text = Blueprint('text', __name__)


# 新建富文本
@text.route('/add', methods=['POST'])
def add_book():
    data = request.get_json()
    k_set = data.keys()

    neo_text = Txt()
    neo_text.__setattr__('create_time', time.strftime('%Y-%m-%d %H:%M:%S', time.localtime()))

    for key in Txt.keys():
        if key in k_set:  # 对提交数据中包含的属性进行赋值
            neo_text.__setattr__(key, data[key])
            # print(key, data[key])

    session = sessionmaker(bind=db)()
    session.add(neo_text)
    session.commit()
    session.close()

    return jsonify({
        "status": 500  # 正常插入
    })


# 根据 title 查找文本
@text.route('/all', methods=['GET'])
def get_all():
    page = int(request.values.get("page")) - 1
    size = int(request.values.get("size"))
    search = request.values.get("search")

    session = sessionmaker(bind=db)()

    if len(search):
        res = session.query(Txt).filter(Txt.title.like("%"+search+"%")).limit(size).offset(page*size).all()  # 手动分页查询
        tableData = []
        for item in res:
            tableData.append(item.to_json())
        res = session.query(Txt).filter(Txt.title.like("%"+search+"%")).all()
    else:
        res = session.query(Txt).limit(size).offset(page*size).all()
        tableData = []
        for item in res:
            tableData.append(item.to_json())

        res = session.query(Txt).all()

    total = len(res)

    session.close()

    return jsonify({
        "status": 500,
        "data": {
            "total": total,
            "tableData": tableData
        }
    })


# 更新数据
@text.route('/update', methods=["PUT"])
def update_info():
    data = request.get_json()
    data.pop('create_time')

    session = sessionmaker(bind=db)()
    session.query(Txt).filter(Txt.id == data['id']).update(data)
    session.commit()
    session.close()

    return jsonify({
        "status": 500
    })