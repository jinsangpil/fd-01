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
  constructor(props) {
    super(props);

    this.state = {
      times: null,
      sunriseStr: null,
      sunrisePos: null,
      sunriseAzimuth: null,

	
      latitude : null,
      longitude : null,
      error : null
    };
  }







  render() {

    getDateTime = function(dateObj){
        console.log(dateObj, "dateObj");
/*
getDate()	Returns the day of the month (from 1-31)
getDay()	Returns the day of the week (from 0-6)
getFullYear()	Returns the year
getHours()	Returns the hour (from 0-23)
getMilliseconds()	Returns the milliseconds (from 0-999)
getMinutes()	Returns the minutes (from 0-59)
getMonth()	Returns the month (from 0-11)
getSeconds()	Returns the seconds (from 0-59)
*/
        var year, month, day, hour, min, sec;
        year = dateObj.getFullYear();
        month= dateObj.getMonth();
        day  = dateObj.getDay(); 
        hour = dateObj.getHours(); 
        min  = dateObj.getMinutes();
        sec  = dateObj.getSeconds();

        return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
    }

	// 경도(har) / 위도(lat)  = 부천기준
	var har = 37.490130;
	var lat = 126.753939;


	var SunCalc = require('suncalc');

	// get today's sunlight times for London 
	var sunTimes = SunCalc.getTimes(new Date(), har, lat);
console.log("===================================================================");
	console.log(sunTimes, "sunTimes"); 
sunTimes.sunrise;	//일출 - object
sunTimes.sunset;	//일몰 - object


	// format sunrise time from the Date object 
//	var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();

	var moonTimes =  SunCalc.getMoonTimes( new Date(), har, lat);  
console.log(moonTimes, "moonTimes");

moonTimes.rise;		//월출
moonTimes.set;		//월몰

	var moonIllu = SunCalc.getMoonIllumination (new Date());
console.log(moonIllu, "moonIllu");
moonIllu.fraction;	//달 몇%;
moonIllu.phase;		//초승->반->보름->반->그믐



console.log(this.state, " -> this.state");





    //var sunrise = getDateTime(sunTimes.sunrise);	//일출 - object
    //var sunset = getDateTime(sunTimes.sunset);	//일몰 - object

    var moonrise = moonTimes.rise;		//월출
    var moonset = moonTimes.set;		//월몰

    var fraction = moonIllu.fraction;	//달 몇%;
    var phase = moonIllu.phase;		    //초승->반->보름->반->그믐


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
        <Text>{"\n"}</Text>
        <Text>부천기준 ( 37.490130, 126.753939 )</Text>
        <Text>경도 : {lat}</Text>
        <Text>위도 : {har}</Text>
        <Text>{"\n"}</Text>
        <Text>일출 : {sunTimes.sunrise.toString()}</Text>
        <Text>일몰 : {sunTimes.sunset.toString()}</Text>

        <Text>{"\n"}</Text>
        <Text>월출 : {moonrise.toString()}</Text>
        <Text>월몰 : {moonset.toString()}</Text>

        <Text>{"\n"}</Text>
        <Text>달%(0:초승, 1:보름) : {fraction}</Text>
        <Text>달모양(초승->반->보름->반->그믐) : {phase}</Text>
        </Content>
      </Container>
    );
  }
}

export default MoonInfo;
