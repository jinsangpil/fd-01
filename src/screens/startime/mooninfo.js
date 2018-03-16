import React, { Component, ImageBackground } from "react";
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
    CardItem
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    Platform,
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Dimensions
} from 'react-native';

import { Constants, Location, Permissions } from 'expo';

import styles from "./styles"; 

class MoonInfo extends Component {
    constructor(props) {
        super(props);
        
        date = new Date();
        this.state = {
            location: null,
            errorMessage: null,
            times: null,
            sunriseStr: null,
            sunrisePos: null,
            sunriseAzimuth: null,
        
        
            latitude : null,
            longitude : null,

            nowYear : date.getFullYear(),
            nowMonth : date.getMonth(),
            error : null
        };
    }



componentWillMount() {
    //Expo API 를 통한 위치 가져오기
    if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
    } else {
        this._getLocationAsync();
    }
}


//위치값 setState
_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied',
        });
    }
    
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
};


render() {

    //위치값 가져오기
    let locationText = 'Waiting..';
    if (this.state.errorMessage) {
        var boolGps = false;
        locationText = this.state.errorMessage;

    } else if (this.state.location) {
        var boolGps = true;
        locationText = JSON.stringify(this.state.location);
    }


    //해당년월 에 몇일까지 있는지 
    leapchk = function (year,month){
        current=new Date(year,month-1,1);
        next=new Date(year,month,1);
        if(current.getDay()>=5){
            totaldate=42-(current.getDay()+(7-next.getDay()));
        }
        else{
            totaldate=35-(current.getDay()+(next.getDay()==0 ? next.getDay():7-next.getDay()));
        }
        return totaldate;
    }

    function clone(obj) {
      if (obj === null || typeof(obj) !== 'object')
      return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = obj[attr];
        }
      }
      return copy;
    }

    /*-----------------------해 - 달 시간 가져오기*/
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

	// 경도(har) / 위도(lat)  = 없을경우 default 서울시청37.5650172,126.8494631
    /*
     *  도시이름 가져오기 ( 영문코드값 )    적용X
        https://www.npmjs.com/package/cities
        https://www.npmjs.com/package/node-geocoder
    */
    if( boolGps ) {
	    var har = this.state.location.coords.latitude; 
	    var lat = this.state.location.coords.longitude; 
    } else {
        //서울특별시청
	    var har = "37.5650172"; 
	    var lat = "126.8494631"; 
    }

	var SunCalc = require('suncalc');

	// get today's sunlight times for London 
    var untilDay = leapchk(this.state.nowYear, this.state.nowMonth) 

    var objData = {};
//console.log(SunCalc.getTimes(new Date(this.state.year, this.state.month, 2), har, lat), "startTime");
    for( i=1; i<=untilDay; i++ ) {
        let suntime  = SunCalc.getTimes(new Date(this.state.year, this.state.month, 2), har, lat);
//        Object.assign(objData, suntime);
        objData[i] = {};
        objData[i] = Object.assign(objData[i], {'suntime':suntime});
        //objData[i]['suntime'] = suntime;
    }
    console.log(objData, "objData");
	var sunTimes = SunCalc.getTimes(new Date(), har, lat);

console.log("===================================================================");
	console.log(sunTimes, "sunTimes"); 
sunTimes.sunrise;	//일출 - object
sunTimes.sunset;	//일몰 - object


	// format sunrise time from the Date object 
//	var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
//
//
//
//

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


    var {height, width} = Dimensions.get('window');

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

        <Content style={{backgroundColor:'#00DD00', flexDirection:'row',flex:1}}>
            <Grid style={{width:width, backgroundColor:'#444444'}}>
                <Row size={1} style={{ backgroundColor: '#D954D7'}}>
                    <Text>aaa</Text>
                </Row>
                <Row size={4} style={{ backgroundColor: '#cccccc'}}>
                    <View>
                        <View style={{alignSelf:"center"}}>
                            <Text style={{fontSize:20}}>◁  {this.state.nowYear}.{this.state.nowMonth} ▷</Text>
                        </View>
        {/*
                        <View style={{alignSelf:"center", height:250}}>
                            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Roundel-sable.svg/1200px-Roundel-sable.svg.png'}} style={{height: 200, width: 200/*, position:"absolute", top:0, left:'auto'}}/>
                            <Image source={{uri: 'https://png.pngtree.com/element_origin_min_pic/00/16/05/105731797561d64.jpg'}} style={{height: 200, width: 200, position:"absolute", top:0, left:phase-50}}/>
        
                        </View>
        */}

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
                        <Text>달모양(초승☽->상현(오른쪽반달◑)->보름● ->반(왼쪽반달◐)->그믐☾) : {phase}</Text>
                
                        <Text>{"\n"}</Text>
                        <Text>LocationText</Text>
                        <Text>{locationText}</Text>
                    </View>
                </Row>
                <Row size={1} style={{ backgroundColor: '#D93735'}}>
                    <Text>cc</Text>
                </Row>
            </Grid>
        </Content>
        
      </Container>
    );
  }
}
/*
 *
        <Content>
        <Text>{"\n"}</Text>
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
        <Text>달모양(초승☽->상현(오른쪽반달◑)->보름● ->반(왼쪽반달◐)->그믐☾) : {phase}</Text>

        <Text>{"\n"}</Text>
        <Text>LocationText</Text>
        <Text>{locationText}</Text>
        </Content>
 * */
export default MoonInfo;
