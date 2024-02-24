import * as React from "react"
import { Svg, G, Path, Defs, Mask, ClipPath } from 'react-native-svg'

const NoCoalitionIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={46}
    fill="none"
    {...props}
  >
    <G ClipPath="url(#a)">
      <Path
        stroke="#fff"
        strokeWidth={2}
        d="m28.08 1 .01 26.939-13.18 15.847L1.72 27.938 1.73 1h26.35Zm0-.04ZM1.69.96H.73h1-.04Z"
      />
      <G ClipPath="url(#b)">
        <Mask
          id="d"
          width={9}
          height={11}
          x={7}
          y={13}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <Mask id="c" fill="#fff">
            <Path d="M7 13.056h8.323v10.937H7V13.056Z" />
          </Mask>
          <Path fill="#000" d="M7 13.056h8.323v10.937H7V13.056Z" />
          <Path
            fill="#fff"
            d="M7 13.056v-66h-66v66H7Zm8.323 0h66v-66h-66v66Zm0 10.937v66h66v-66h-66Zm-8.323 0h-66v66H7v-66Zm0 55.063h8.323v-132H7v132Zm-57.677-66v10.937h132V13.056h-132Zm66-55.063H7v132h8.323v-132Zm57.677 66V13.056H-59v10.937H73Z"
            mask="url(#c)"
          />
        </Mask>
        <G mask="url(#d)">
          <Path
            fill="#fff"
            stroke="#fff"
            d="M9.774 19.302h5.049V23.5h-1.774v-2.873H7.5v-1.623l5.26-5.448h1.385l-4.73 4.898-.819.848h1.178Z"
          />
        </G>
        <Path
          fill="#fff"
          stroke="#fff"
          d="M16.802 13.5h1.023l-1.023 1.068V13.5ZM19.606 16.24l.134-.144V13.5h1.693v2.203l-2.56 2.755-.133.144v2.596h-1.693v-2.203l2.56-2.756ZM21.433 21.198H20.41l1.023-1.069v1.069Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h29.93v45.35H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M7 13h15v11H7z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default NoCoalitionIcon
