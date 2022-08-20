import BoxesCanvas from "./components/canvas/BoxesCanvas";
import TransformCanvas from "./components/canvas/TransformCanvas";

class Canvas {
  constructor(name, component) {
    this.name = name;
    this.component = component;
  }
}

const canvasData = [
  new Canvas(
    "Boxes",
    (
      <BoxesCanvas
        padding={20}
        gap={20}
        borderWidth={5}
        rowBoxCount={10}
        height={450}
        key="Boxes"
      />
    )
  ),
  new Canvas("Transform", <TransformCanvas />),
];

export default canvasData;
