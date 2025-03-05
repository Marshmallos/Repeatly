from pydantic import BaseModel
from datetime import date
from typing import Optional

class CycleSchema(BaseModel):
    name: str
    start_date: date
    duration: int
    description: Optional[str] = None
