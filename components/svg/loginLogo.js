import * as React from "react"
import { Svg, G, Path, Defs, ClipPath} from 'react-native-svg'

const LoginLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={39}
    fill="none"
    {...props}
  >
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M30.948 0H20.634L0 20.474v8.289h20.634V39h10.314V20.474H10.315L30.948 0ZM35.367 10.237 45.684 0H35.366v10.237ZM56 10.237V0H45.685v10.237L35.366 20.474v10.241h10.32V20.474L56 10.237Z" />
      <Path d="m56 20.474-10.315 10.24H56v-10.24Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h56v39H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default LoginLogo
