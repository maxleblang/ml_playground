import InputLayer from './InputLayer';
import Conv2DLayer from './Conv2DLayer';
import MaxPool2DLayer from './MaxPool2DLayer';
import FlattenLayer from './FlattenLayer';


const customNodes = {
    Input: InputLayer,
    Conv2D: Conv2DLayer,
    MaxPool2D: MaxPool2DLayer,
    Flatten: FlattenLayer
};

export default customNodes;