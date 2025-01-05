from models import Node, Edge, modelJSON
from layers import Layers

def generate_model_function(starting_layer: Layers.BaseLayer, compile_config: dict):
    # TODO: Does this notation work for multihead models?
    # Is this the best notation?

    # Static beginning of function
    def_line: str = "def Model():\n"
    seq_initialization_line: str = "\tmodel = keras.Sequential()\n"

    # Add each layer to the model
    add_layer_lines: str = ""
    layer = starting_layer
    while True:
        add_layer_lines += f"\tmodel.add({layer.generate_code_snippet()})\n"
        if layer.next_layer:
            layer = layer.next_layer
        else:
            break

    # Compile the model
    compilation_line: str = (
        "\tmodel.compile("
        f"loss='{compile_config.get('loss')}', "
        f"optimizer='{compile_config.get('optimizer')}', "
        f"metrics={compile_config.get('metrics')})\n"
    )

    # Static return
    return_line = "\treturn model"

    # Build entire string
    model_function: str =  (
        def_line +
        seq_initialization_line +
        add_layer_lines +
        compilation_line +
        return_line
    )
    return model_function
    

def generate_notebook_from_JSON(model_JSON: modelJSON):
    # nb = nbf.v4.new_code_cell()
    library_imports: str = """import tensorflow as tf
                            import keras
                            from keras.layers import *\n\n"""
    # Convert JSON to linked layers
    parsed_nodes = JSON_to_linked_nodes(model_JSON.nodes, model_JSON.edges)

    # Get starting layer
    # NOTE: It's always an Input layer here
    starting_layer = None
    for _, Layer in parsed_nodes.items():
        if type(Layer) == Layers.Input:
            starting_layer = Layer

    # TODO: compile config params
    compile_config = {
        "loss": "TEST",
        "optimizer": "TEST",
        "metrics": "TEST"
    }
    model_function: str = generate_model_function(starting_layer, compile_config)
    model_script = library_imports + model_function

    return model_script


def parse_nodes(nodes: dict[str,Node]) -> dict:
    '''
    Cast each node JSON dict to a layer object
    Map the id of each layer to the actual layer
    '''
    parsed_nodes = dict()
    for node in nodes:
        # The "type" param from React Flow corresponds with layer name
        layer_name = node.type
        Layer = getattr(Layers, layer_name)
        parsed_nodes[node.id] = Layer(node)
    
    return parsed_nodes


def JSON_to_linked_nodes(nodes: list[Node], edges: list[Edge]) -> dict:
    '''
    Connect each node via their connecting edges
    '''
    # Cast to layer objects
    parsed_nodes = parse_nodes(nodes)
    
    # Link each node to the next through the next_layer attribute
    for edge in edges:
        source_node = parsed_nodes[edge.source]
        target_node = parsed_nodes[edge.target]

        source_node.next_layer = target_node
    
    return parsed_nodes