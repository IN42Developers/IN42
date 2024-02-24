import * as React from "react"
import { Svg, Path, ClipPath, G, Defs, Mask } from "react-native-svg"
const Logo42 = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={143}
    height={101}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={80}
        height={101}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path
          stroke="#fff"
          strokeWidth={66}
          d="M33 33.517h13.344v34.42H33v-34.42Z"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          stroke="#fff"
          strokeWidth={2}
          d="M26.448 54.27h51.896V100H53.895V73.623H1V53.685L53.309 1.516h23.616L25.742 52.562l-1.713 1.708h2.419Z"
        />
      </G>
      <Path
        stroke="#fff"
        strokeWidth={2}
        d="M89.682 1h22.268L89.682 23.412V1ZM117.407 27.314l.281-.29V1h23.67v25.216l-25.39 26.33-.28.29V78.86H92.016V53.644l25.391-26.329ZM141.358 78.86H119.09l22.268-22.411V78.86Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h143v101H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Logo42
