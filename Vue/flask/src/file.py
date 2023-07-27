from uuid import uuid4
import os
from src.models import Book
from src.database import db

from flask import Blueprint, request, jsonify
from src.path import FILE_DIR
from sqlalchemy.orm import sessionmaker

file = Blueprint('file', __name__)


# 上传文件
@file.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    name = str(uuid4()) + os.path.splitext(file.filename)[-1]
    # 用名字重复存储可以实现覆盖
    file.save(FILE_DIR + name)
    return jsonify({
        "status": 500,
        "data": name
    })


# 上传封面图
@file.route('/cover', methods=['POST'])
def cover():
    file = request.files.get('file')
    id = request.form.get("id")
    session = sessionmaker(bind=db)()

    if id: # 已经存在记录
        # print(id)
        res = session.query(Book).filter(Book.id == int(id)).one()
        path = res.cover
        if path:
            os.remove(FILE_DIR + path[12:])

    neo_path = str(uuid4()) + os.path.splitext(file.filename)[-1]
    file.save(FILE_DIR + neo_path)
    session.close()

    return jsonify({
        "status": 500,
        "data":  '/api/static/' + neo_path
    })