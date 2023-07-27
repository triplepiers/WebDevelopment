from flask import Blueprint, request, jsonify
from src.models import User
from src.database import db
from sqlalchemy.orm import sessionmaker

user = Blueprint('user', __name__)


# 新建用户
@user.route('/add', methods=['POST'])
def add_user():
    data = request.get_json()
    k_set = data.keys()

    neo_usr = User()
    neo_usr.__setattr__('password', '123456')  # 因为表单里没有 pwd
    for key in User.keys():
        if key in k_set:  # 对提交数据中包含的属性进行赋值
            neo_usr.__setattr__(key, data[key])
            # print(getattr(neo_usr, key))

    session = sessionmaker(bind=db)()
    session.add(neo_usr)
    session.commit()
    session.close()

    return jsonify({
        "status": 500  # 正常插入
    })


# 根据 nick_name 查找用户
@user.route('/all', methods=['GET'])
def get_all():
    page = int(request.values.get("page")) - 1
    size = int(request.values.get("size"))
    search = request.values.get("search")

    session = sessionmaker(bind=db)()

    if len(search):
        res = session.query(User).filter(User.nick_name.like("%"+search+"%")).limit(size).offset(page*size).all()  # 手动分页查询
        tableData = []
        for item in res:
            tableData.append(item.to_json())
        res = session.query(User).filter(User.nick_name.like("%"+search+"%")).all()
    else:
        res = session.query(User).limit(size).offset(page*size).all()
        tableData = []
        for item in res:
            tableData.append(item.to_json())
        res = session.query(User).all()

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
@user.route('/update', methods=["PUT"])
def update_info():
    data = request.get_json()

    session = sessionmaker(bind=db)()
    session.query(User).filter(User.id == data['id']).update(data)
    session.commit()
    res = session.query(User).filter(User.id == data['id']).one()
    session.close()

    return jsonify({
        "status": 500,
        "data": {
            "user": res.to_json()
        }
    })


# 删除用户
@user.route('/delete/<id>', methods=['DELETE'])
def del_user(id):
    session = sessionmaker(bind=db)()
    session.query(User).filter(User.id == id).delete()
    session.commit()
    session.close()

    return jsonify({
        "status": 500
    })


# 登录验证
@user.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    session = sessionmaker(bind=db)()
    res = session.query(User).filter(User.username == data['username']).filter(User.password == data['password']).all()
    session.close()

    if len(res) > 0:
        return jsonify({
            "status": 500,
            "data": {
                "user": res[0].to_json()
            }
        })
    else:
        return jsonify({
            "status": 501
        })


# 用户注册
@user.route('/register', methods=['POST'])
def reg():
    data = request.get_json()
    session = sessionmaker(bind=db)()

    res = session.query(User).filter(User.username == data['username']).all()
    if len(res) > 0:
        session.close()
        return jsonify({
            "status": 501
        })
    else:
        neo_usr = User(username=data['username'], password=data['password'])
        session.add(neo_usr)
        session.commit()
        info = session.query(User).filter(User.username==data['username']).all()
        session.close()
        return jsonify({
            "status": 500,
            "data": {
                "user": info[0].to_json()
            }
        })