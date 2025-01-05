from pydantic import BaseModel

class Edge(BaseModel):
    id: str
    source: str
    target: str


class Node(BaseModel):
    data: dict
    id: str
    measured: dict
    position: dict
    type: str


class modelJSON(BaseModel):
    nodes: list[Node]
    edges: list[Edge]
    viewport: dict
