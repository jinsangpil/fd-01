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

class InfoSetup extends Component {
  render() {
    return (
      <ScrollView style={{flex:1, padding:10}} >
        <Text>
{'\n'}
Exposuer(노출){'\n'}
{'\n'}
쉽게 말해서 "카메라가 받아들이는 빛의 양"이다. "노출과다"라고 한다면 말 그대로 카메라가 빛을 받아들인 양이 많았다는 것이고, 사진은 눈에 보이는 것보다 밝게 나온다. "노출부족"이라고 한다면 카메라가 빛을 받아들인 양이 충분치 않고 부족하다는 뜻, 그러므로 사진은 어둡게 나온다. 노출이 적절하다고 한다면 이를 "적정노출"이라한다.{'\n'}
{'\n'}
노출의 3요소{'\n'}
{'\n'}
노출을 결정하는 3요소는 바로 "조리개값", "셔터스피드" 그리고 "감도(ISO)"이다. 여기에 "조리개값"과 "셔터스피드"는 사진의 밝기 뿐만 아니라, 사진의 표현에도 중요한 역할을 하는 요소이기 때문에 더욱 자세히 공부를 해둘 필요가 있다.{'\n'}
{'\n'}
조리개값{'\n'}
{'\n'}
조리개는 렌즈안에 있다. 조리개는 우리 눈의 동공과 같은 역할로 빛이 지나는 통로이다. 이 통로의 넓이를 카메라에서 다이얼을 움직여 변경을 할 수 있다. 조리개값이라는 수치로 표기가 되어 있다. F와 함께 나타나는 숫자가 바로 조리개값이다.{'\n'}
조리개값이 작을수록 조리개는 개방이고. 조리개값이 클수록 조리개는 좁아진다.{'\n'}
조리개값이 작을수록 한꺼번에 통과하는 빛의 양이 많고, 조리개값이 클수록 한꺼번에 통과하는 빛의 양이 적다.{'\n'}
조리개값을 f1.4 > f2 > f2.8 > f4 > f5.6 > f8 > f11 >f16 으로 한스탑씩 올릴 때마다 카메라로 들어오는 빛의 양은 반으로 줄어들게 된다.{'\n'}
조리개값은 필름카메라 시절에는 보통  F2.8 , F4, F5.6 , F8 , F11, F16 으로 나타나 있었고, 하나씩 변하는 것을 1스탑(stop)이라고 표현한다. {'\n'}
조리개값이 낮을수록 초점이 맞은 부분만 선명하고, 그 이외의 부분은 흐리게 보인다.{'\n'}
조리개값이 높을수록 초점이 맞은 부분 이외의 부분도 점점 더 선명하게 보이기 시작합니다.{'\n'}
조리개값이 낮을수록 "아웃포커스"가 되고, 조리개값이 높을수록 "팬포커스"가 된다.{'\n'}
조리개값만 바꿔서 촬영할 수 있는 모드는 A모드이다.{'\n'}
{'\n'}
셔터스피드{'\n'}
{'\n'}
DSLR에는 미러가 있고, 그 뒤에 이렇게 생긴 셔터막이 있다.{'\n'}
렌즈의 조리개를 통과한 빛은 셔터막이 열리는 순간 빠르게 카메라의 센서에 닿게 된다.{'\n'}
이 셔터막이 열렸다가 닫히는 속도를 "셔터스피드"라고 한다.{'\n'}
문을 오래 열어두면 빛이 많이 들어가고, 문을 빠르게 열었다 닫으면 빛이 조금만 들어간다.{'\n'}
카메라의 셔터스피드는 빠르게는 1/4000초, 1/8000초 정도로 눈깜박할 사이 보다 더 빠른 속력으로 열렸다가 닫히게 된다.{'\n'}
셔터스피드가 1/15초 > 1/30초 > 1/60초 >1/125초 >1/250초 > 1/500초 > 1/1000초가 될수록 카메라로 들어오는 빛의 양은 반으로 줄어들게 된다. "조리개값"이나 "ISO"가 변하지 않는다면 사진은 점점 어둡게 찍히게 된다.{'\n'}
셔터스피드만 바꿔서 촬영할 수 있는 모드는 S모드 또는 TV 모드이다.{'\n'}
{'\n'}
감도(ISO){'\n'}
{'\n'}
필름 카메라 시절에는 사진을 찍기 위해서 필름을 구입해야 했는데, 이때 빛에 대한 민감도를 수치를 나타낸 것이 바로 ISO(감도)이다.{'\n'}
ISO가 높을수록 작은 빛에도 반응을 하게 되어 어두운 곳에서 촬영을 하기가 좋다. 하지만 그 대가로 화질을 잃게 된다. {'\n'}
디지털 카메라에서는 필름을 교체하지 않아도 쉽게 ISO를 설정해서 사용할 수 있다. 보통은 AUTO로 설정이 되어 있고, 이대로 사용하셔도 무방하지만 경우에 따라서 ISO를 직접 설정해서 촬영하면 좋다.{'\n'}
ISO 값이 200, 100 이렇게 낮을수록 더 나은 퀄리티의 이미지를 얻을 수 있고, ISO 값이 1600 3200 이렇게 될 수록 어두운 곳에서도 사진을 찍을 수 있지만 이미지의 퀄리티는 떨어지게 된다.{'\n'}
ISO는 기계적으로 들어온 빛을 카메라가 받아들이는 방식을 바꾸는 것이라고 생각하면 된다. ISO 값이 100, 200, 400, 800, 1600, 3200 이렇게 두 배가 될수록 빛의 두 배씩 뻥튀기를 시켜 준다.{'\n'}
빛이 열악한 상황에서 사진을 밝게 찍고 싶다면, 바로 이 ISO를 높여서 촬영하면 된다. 하지만 ISO는 이미 카메라에 들어온 물리적 빛을 뻥튀기를 하다 보니, 화질에 영향을 미치게 된다. 흔히 "노이즈"라고 하는 자글자글한 입자감을 형성하게 된다.{'\n'}
        </Text>
      </ScrollView>
    );
  }
}

export default InfoSetup;
