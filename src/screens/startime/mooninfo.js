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

class MoonInfo extends Component {
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
            <Title>달정보</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <Text>
          {'MoonInfo'}
        </Text>
        </Content>
      </Container>
    );
  }
}

export default MoonInfo;
