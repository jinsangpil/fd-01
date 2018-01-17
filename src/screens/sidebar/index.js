import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-kitchen-sink.png");
const datas = [
  {
    name: "달정보",
    route: "MoonInfo",
    icon: "ios-moon-outline",
    bg: "#C5F442"
  },
  {
    name: "해정보",
    route: "SunInfo",
    icon: "ios-sunny-outline",
    bg: "#C5F442"
  },
  {
    name: "별 촬영 추천시간",
    route: "RecommendTime",
    icon: "ios-clock-outline",
    bg: "#477EEA",
  },
  {
    name: "카메라정보",
    route: "CameraInfo",
    icon: "ios-camera-outline",
    bg: "#DA4437",
  },
  {
    name: "별 촬영 추천세팅",
    route: "CameraSetting",
    icon: "ios-settings-outline",
    bg: "#4DCAE0"
  },
  {
    name: "별 궤적 촬영 방법",
    route: "CameraSetting2",
    icon: "ios-sync-outline",
    bg: "#1EBC7C",
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
