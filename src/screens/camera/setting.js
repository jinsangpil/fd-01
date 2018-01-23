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
  Form,
  Picker,
  Item,
  Label,
  Input,
} from "native-base";
import styles from "./styles";

class CamaraSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: "key0"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

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
          <Form>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Full Frame" value="key0" />
              <Item label="DSLR 1.3X" value="key1" />
              <Item label="DSLR 1.5X" value="key2" />
              <Item label="DSLR 1.6X" value="key3" />
              <Item label="DSLR 1.9X" value="key4" />
              <Item label="DSLR 2.0X" value="key5" />
              <Item label="DSLR 2.7X" value="key6" />
              <Item label="DSLR 3.9X" value="key7" />
            </Picker>

            <Item floatingLabel>
              <Label>Focal length(mm)</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Aperture(f)</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Focus distance(m)</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CamaraSetting;
