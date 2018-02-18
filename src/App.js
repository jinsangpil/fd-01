import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";



import Home from "./screens/home/";
import SideBar from "./screens/sidebar";
import RecommendTime from "./screens/startime/";
import MoonInfo from "./screens/startime/mooninfo";
import SunInfo from "./screens/startime/suninfo";
import CameraInfo from "./screens/camera/";
import CameraSetting from "./screens/camera/setting";
import CameraSetting2 from "./screens/camera/setting2";


const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    RecommendTime: { screen: RecommendTime },
    MoonInfo: { screen: MoonInfo },
    SunInfo: { screen: SunInfo },
    CameraInfo: { screen: CameraInfo },
    CameraSetting: { screen: CameraSetting },
    CameraSetting2: { screen: CameraSetting2 },
  },
  {
    initialRouteName: "CameraSetting",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
