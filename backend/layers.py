from models import Node

def to_tuple(tuple_str: str):
    '''
    Converts a tuple in string form into a tuple of integers
    Example: "(2,3,4)" -> (2,3,4)
    '''
    return tuple(map(int, tuple_str[1:-1].split(",")))

class Layers:
    class BaseLayer:
        id: str = None
        next_layer = None

        def __init__(self, node: Node) -> None:
            self.id = node.id


    class Input(BaseLayer):
        shape: tuple = None

        def __init__(self, node: Node) -> None:
            super().__init__(node)
            layer_data = node.data
            self.shape = to_tuple(layer_data.get('shape'))
        
        def generate_code_snippet(self):
            return f"Input(shape={self.shape})"


    class Conv2D(BaseLayer):
        filters: int = None
        kernel: tuple = None
        activation: str = None

        def __init__(self, node: Node) -> None:
            super().__init__(node)
            layer_data = node.data
            self.filters = int(layer_data.get('filters'))
            self.kernel = to_tuple(layer_data.get('kernel'))
            self.activation = layer_data.get('activation')
        
        def generate_code_snippet(self):
            return f"Conv2D(filters={self.filters}, kernel_size={self.kernel}, activation={self.activation})"


    class MaxPool2D(BaseLayer):
        pool_size: tuple = None

        def __init__(self, node: Node) -> None:
            super().__init__(node)
            layer_data = node.data
            self.pool_size = to_tuple(layer_data.get('pool_size'))
        
        def generate_code_snippet(self):
            return f"MaxPooling(pool_size={self.pool_size})"


    class Flatten(BaseLayer):
        def __init__(self, node: Node) -> None:
            super().__init__(node)
        
        def generate_code_snippet(self):
            return "Flatten()"