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

class CamaraSetting2 extends Component {
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
            <Title>궤적촬영 방법</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <Text>
          {'CamaraSetting - 궤적'}
        </Text>
        </Content>
      </Container>
    );
  }
}

export default CamaraSetting2;
