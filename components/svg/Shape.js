import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Shape = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={390}
    height={1000}
    fill="none"
    {...props}
  >
    <Path
      stroke="#8B8B8B"
      strokeOpacity={0.13}
      strokeWidth={3}
      d="M-368-952.08 351.26 847M-364-982.08-116.857-1235H799.025L1020-982.08m-1384 0 122.118 529.568 284.94 79.798L-224.436-52.54M351.26 223.125V847m0-623.875L912.42-52.54M351.26 223.125-224.437-52.54M1020-952.08 351.26 847M1020-952.08 912.42-451.53 636.202-342.714 912.42-52.54m0 0H-324.437"
    />
  </Svg>
)
export default Shape
