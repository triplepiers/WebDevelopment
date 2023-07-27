from flask import Blueprint, request, jsonify
from src.models import Book
from src.database import db
from sqlalchemy.orm import sessionmaker

book = Blueprint('book', __name__)


# 新建图书
@book.route('/add', methods=['POST'])
def add_book():
    data = request.get_json()
    k_set = data.keys()

    neo_book = Book()

    for key in Book.keys():
        if key in k_set:  # 对提交数据中包含的属性进行赋值
            neo_book.__setattr__(key, data[key])
            # print(getattr(neo_usr, key))

    session = sessionmaker(bind=db)()
    session.add(neo_book)
    session.commit()
    session.close()

    return jsonify({
        "status": 500  # 正常插入
    })


# 根据 name 查找书本
@book.route('/all', methods=['GET'])
def get_all():
    page = int(request.values.get("page")) - 1
    size = int(request.values.get("size"))
    search = request.values.get("search")

    session = sessionmaker(bind=db)()

    if len(search):
        res = session.query(Book).filter(Book.name.like("%"+search+"%")).limit(size).offset(page*size).all()  # 手动分页查询
        tableData = []
        for item in res:
            tableData.append(item.to_json())
        res = session.query(Book).filter(Book.name.like("%"+search+"%")).all()
    else:
        res = session.query(Book).limit(size).offset(page*size).all()
        tableData = []
        for item in res:
            tableData.append(item.to_json())
            # print(item.create_time)
        res = session.query(Book).all()

    total = len(res)
    # print(total)

    session.close()

    return jsonify({
        "status": 500,
        "data": {
            "total": total,
            "tableData": tableData
        }
    })


# 更新数据
@book.route('/update', methods=["PUT"])
def update_info():
    data = request.get_json()

    session = sessionmaker(bind=db)()
    session.query(Book).filter(Book.id == data['id']).update(data)
    session.commit()
    session.close()

    return jsonify({
        "status": 500
    })


# 删除书本
@book.route('/delete/<id>', methods=['DELETE'])
def del_user(id):
    session = sessionmaker(bind=db)()
    session.query(Book).filter(Book.id == id).delete()
    session.commit()
    session.close()

    return jsonify({
        "status": 500
    })