from sqlalchemy import create_engine

DB_URI = 'mysql+pymysql://root:662258@localhost:3306/spring'

db = create_engine(DB_URI)