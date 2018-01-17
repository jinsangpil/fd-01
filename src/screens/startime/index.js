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
  List,
  ListItem
} from "native-base";
import styles from "./styles";

class RecommendTime extends Component {
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
            <Title>RecommendTime</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <Text>
          {'RecommendTime'}
        </Text>
        </Content>
      </Container>
    );
  }
}

export default RecommendTime;
