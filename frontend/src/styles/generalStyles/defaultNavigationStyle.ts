import { ParamListBase, RouteProp } from "@react-navigation/native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

type ScreenOptions = {};

export const defaultNavigationStyle: ScreenOptions = {
    tabBarActiveTintColor: '#00B5C0',
    tabBarInactiveTintColor: 'gray',
    headerShown: true,
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    tabBarStyle: {
      backgroundColor: '#202020',
      borderTopColor: '#202020',
    },
    tabBarLabelStyle: {
      fontFamily: 'Inter_500Medium',
      fontSize: 11,
    },
    headerStyle: {
      backgroundColor: '#202020',
      borderColor: '#595959',
      borderEndWidth: 0,
      shadowRadius: 0,
    },
    headerTitleStyle: {
      color: '#fff',
      fontFamily: 'Inter_500Medium',
    },
  };