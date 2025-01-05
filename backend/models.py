from pydantic import BaseModel

class Edge(BaseModel):
    id: str
    source: str
    sourceHandle: str | None = None
    target: str
    targetHandle: str | None = None


class Node(BaseModel):
    data: dict
    dragging: bool | None = None
    height: int
    id: str
    position: dict
    positionAbsolute: dict
    selected: bool | None = None
    type: str
    width: int


class modelJSON(BaseModel):
    nodes: list[Node]
    edges: list[Edge]
    viewport: dict
