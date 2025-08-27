from sqlmodel import SQLModel, create_engine, Session

def _engine():
    engine = create_engine("sqlite:///database.db")
    SQLModel.metadata.create_all(engine)
    return engine

def get_session() -> Session:
    engine = _engine()
    return Session(bind=engine)

