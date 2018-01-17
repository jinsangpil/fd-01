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
} from "native-base";
import styles from "./styles";

class CamaraSetting extends Component {
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
            <Title>별 촬영 추천세팅</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <Text>
          {'CamaraSetting - 기본'}
        </Text>
        </Content>
      </Container>
    );
  }
}

export default CamaraSetting;
