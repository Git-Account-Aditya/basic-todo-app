from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Annotated, Optional
from sqlmodel import select

from backend.models.todo_models import *
from backend.app import _engine, get_session

router = APIRouter()
engine = _engine()

# --- Response Models ---

class TodoCreateResponse(BaseModel):
    todo: TodoRead | None
    response: Dict[str, str] | None


class TodoReadResponse(BaseModel):
    todos: Optional[List[TodoRead]] | None
    response: Dict[str, str] | None


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None



# --- Create Todo Route ---
@router.post("/create_todo/", response_model=TodoCreateResponse)
async def create_todo(todo: TodoCreate):
    with get_session() as session:
        try:
            new_todo = TodoTable(title=todo.title, description=todo.description)

            session.add(new_todo)
            session.commit()
            session.refresh(new_todo)

            todo_response = TodoRead.model_validate(new_todo, from_attributes=True)

            return {
                "todo": todo_response,
                "response": {"status": "success", "message": "Todo created successfully"},
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


# --- Get All Todos Route ---
@router.get("/todos/", response_model=TodoReadResponse)
async def get_all_todos():
    with get_session() as session:
        todos = session.exec(select(TodoTable)).all()
        todos_list = [TodoRead.model_validate(todo, from_attributes=True) for todo in todos]

        return {
            "todos": todos_list,
            "response": {"status": "success",
                         "message": "Todos retrieved successfully"},
        }


# --- Delete Todo Route ---
@router.delete("/delete_todo/{todo_id}", response_model=dict)
async def delete_todo(todo_id: int):
    with get_session() as session:
        todo = session.exec(select(TodoTable).where(TodoTable.id == todo_id)).first()

        if not todo:            
            raise HTTPException(status_code=404, detail="Todo not found")

        title, description = todo.title, todo.description
        session.delete(todo)
        session.commit()

        return {
            "response": {
                "todo": {"title": title, "description": description},
                "status": "success",
                "message": "Todo deleted successfully",
            }
        }


# --- Delete All Todos Route ---
@router.delete("/delete_all_todos/", response_model=dict)
async def delete_all_todos():
    with get_session() as session:
        todos = session.exec(select(TodoTable)).all()

        if not todos:
            raise HTTPException(status_code=404, detail="No todos found")

        for todo in todos:
            session.delete(todo)
        session.commit()

        return {
            "response": {"status": "success", "message": "All todos deleted successfully"}
        }


# --- Modify Todo Route ---
@router.put("/modify_todo/{todo_id}", response_model=dict)
async def modify_todo(todo_id: int, todo: TodoUpdate):
    with get_session() as session:
        existing_todo = session.exec(
            select(TodoTable).where(TodoTable.id == todo_id)
        ).first()

        if not existing_todo:
            raise HTTPException(status_code=404, detail="Todo not found")

        if todo.title is not None:
            existing_todo.title = todo.title
        if todo.description is not None:
            existing_todo.description = todo.description

        session.commit()

        return {
            "response": {
                "todo": {
                    "title": existing_todo.title,
                    "description": existing_todo.description,
                },
                "status": "success",
                "message": "Todo modified successfully",
            }
        }
