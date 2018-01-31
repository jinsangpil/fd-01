import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body,
  Footer,
  FooterTab,
  Tabs, Tab,
} from "native-base";
import styles from "./styles";

import InfoSetup from './info_setup';
import InfoMode from './info_mode';
import InfoFocus from './info_focus';

class CamaraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab0: true,
      tab1: false,
      tab2: false,
    };
  }
/*
  toggleTab(idx) {
    this.setState ({
      tab0: (Number(idx) == 0 ) ? true : false,
      tab1: (Number(idx) == 1 ) ? true : false,
      tab2: (Number(idx )== 2 ) ? true : false,
    });
    this.tabView.goToPage(idx);
    console.log(this.state);
  }
*/
  render() {

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>기본 카메라 정보</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <Tabs initialPage={0} ref={(tabView) => {this.tabView = tabView}} tabUnderlineStyle={{opacity:0}}>
          <Tab heading="setup">
            <InfoSetup />
          </Tab>
          <Tab heading="mode">
            <InfoMode />
          </Tab>
          <Tab heading="focus">
            <InfoFocus />
          </Tab>
        </Tabs>
        </Content>
      </Container>
    );
  }
}

export default CamaraInfo;
