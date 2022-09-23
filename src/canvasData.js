import Boxes from "./components/canvas/Boxes";
import Transform from "./components/canvas/Transform";
import Angles from "./components/canvas/Angles";
import Arc from "./components/canvas/Arc";
import Dots from "./components/canvas/Dots";
import Animation from "./components/canvas/Animation";
import AnimatedLines from "./components/canvas/AnimatedLines";
import Grid from "./components/canvas/Grid";
import Text from "./components/canvas/Text";

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
  new Canvas("Arc", <Arc />),
  new Canvas("Dots", <Dots />),
  new Canvas("Animation", <Animation />),
  new Canvas("Animated Lines", <AnimatedLines />),
  new Canvas("Grid", <Grid />),
  new Canvas("Text", <Text />),
];

export default canvasData;
