import React, { Component } from "react";
import { ScrollView } from "react-native";
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

class InfoFocus extends Component {
  render() {
    return (
      <ScrollView style={{flex:1}} >
        <Text>
          {'카메라 초점 설명'}
        </Text>
      </ScrollView>
    );
  }
}

export default InfoFocus;
