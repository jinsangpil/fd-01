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

class InfoMode extends Component {
  render() {
    return (
        <Text>
          {'카메라 모드 설명'}
        </Text>
    );
  }
}

export default InfoMode;
