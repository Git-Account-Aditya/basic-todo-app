from pydantic import BaseModel
from sqlmodel import SQLModel, Field
from datetime import datetime, timezone


'''
    Creating Models for Todo App
'''
# --- Base Class for Todo
class TodoBase(BaseModel):
    title: str
    description: str | None = None


'''
    --- TodoCreate Model ---
    Used when creating a new Todo.
'''
class TodoCreate(TodoBase):
    pass


'''
    --- TodoRead Model ---
    Used when reading a Todo from DB/response.
'''
class TodoRead(TodoBase):
    id: int
    created_at: datetime

    class config:
        orm_mode = True


'''
    --- TodoUpdate Model ---
    Used when updating a Todo. All fields optional.
'''
class TodoUpdate(BaseModel):
    title: str | None = None
    description: str | None = None


'''
    Todo Table SQLModel
        - This table stores all the todos
'''
# --- SQLModel Table ---
class TodoTable(SQLModel, table=True):
    __tablename__ = "todos"

    id: int | None = Field(default=None, primary_key=True)
    title: str
    description: str | None = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
