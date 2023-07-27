from sqlalchemy import Integer, Column, String, DATETIME, DECIMAL, TEXT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(255))
    password = Column(String(255))
    nick_name = Column(String(255))
    age = Column(Integer)
    sex = Column(String(255))
    address = Column(String(255))
    role = Column(Integer, default=1)

    @staticmethod
    def keys():
        return ['id', 'username', 'password', 'nick_name', 'age', 'sex', 'address', 'role']


    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'nick_name': self.nick_name,
            'age': self.age,
            'sex': self.sex,
            'address': self.address,
            'role': self.role
        }


class Book(Base):
    __tablename__ = "book"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    price = Column(DECIMAL(10,2))
    author = Column(String(255))
    create_time = Column(DATETIME)
    cover = Column(String(255))

    @staticmethod
    def keys():
        return ['id', 'name', 'price', 'author', 'create_time', 'cover']


    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'author': self.author,
            'create_time': str(self.create_time)[0:10] if self.create_time else self.create_time,
            'cover': self.cover
        }


class Txt(Base):
    __tablename__ = "text"

    id = Column(Integer, primary_key=True)
    title = Column(String(255))
    content = Column(TEXT)
    author = Column(String(255))
    create_time = Column(DATETIME)

    @staticmethod
    def keys():
        return ['id', 'title', 'content', 'author', 'create_time']


    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author': self.author,
            'create_time': self.create_time.strftime("%m/%d/%Y, %H:%M:%S")
        }