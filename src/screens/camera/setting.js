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
let base_val= 6;
let speed_arr= {0:'2', 1:'4', 2:'8', 3:'15', 4:'30', 5:'60', 6:'120', 7:'240'};
class CamaraSetting extends Component {

  constructor(props) {
    super(props);

    this.state = {
      f_val: 0,
      i_val: 0,
      s_val: 3
    };
  }
  onValueChange(value: number) {
    this.setState({
      f_val: value,
      s_val: ( Number(value) + Number(this.state.i_val) ),
    });
    console.log('state', this.state);
  }

  onValueChange2(value: number) {
    this.setState({
      i_val: value,
      s_val: ( Number(value) + Number(this.state.f_val) ),
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
            <Label>조리개(F)</Label>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.f_val}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="F1.4" value="0" />
              <Item label="F2.0" value="1" />
              <Item label="F2.8" value="2" />
              <Item label="F4.0" value="3" />
            </Picker>
            <Label>ISO 감도</Label>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.i_val}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="800" value="4" />
              <Item label="1600" value="3" />
              <Item label="3200" value="2" />
              <Item label="6400" value="1" />
              <Item label="12800" value="0" />
            </Picker>
            <Label>셔터스피드(초)</Label>
            <Input value={speed_arr[this.state.s_val]} disabled placeholder='Disabled Textbox' />
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CamaraSetting;
