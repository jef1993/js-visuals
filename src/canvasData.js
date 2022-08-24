import Boxes from "./components/canvas/Boxes";
import Transform from "./components/canvas/Transform";
import Angles from "./components/canvas/Angles";

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
      <Boxes
        padding={20}
        gap={20}
        borderWidth={5}
        rowBoxCount={10}
        height={450}
        key="Boxes"
      />
    )
  ),
  new Canvas("Transform", <Transform />),
  new Canvas("Angles", <Angles />),
];

export default canvasData;
