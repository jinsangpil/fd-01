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
import { Col as GridCol, Row as GridRow, Grid } from "react-native-easy-grid"; 
import {
    Platform,
    AppRegistry,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


import { Constants, Location, Permissions } from 'expo';

import styles from "./styles";

class MoonInfo extends Component {
    constructor(props) {
        super(props);
        
        date = new Date();
        this.state = {
            location: null,
            errorMessage: null,
//            times: null,
            sunriseStr: null,
            sunrisePos: null,
            sunriseAzimuth: null,
        
        
            latitude : null,
            longitude : null,

            nowYear : date.getFullYear(),
            nowMonth : date.getMonth()+1,
            error : null,

            tableHead : [],
            tableData : [],
            flexArr : []
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

//날짜 변경
_btnDate(action) {
var today = new Date('2018','4','2');
console.log("todayMonth : "+    today.getMonth());

if( action == "right" ) {
    var plus = 0;
} else {
    var plus = -1;
}

var d = new Date(this.state.nowYear, this.state.nowMonth+plus-1, 1);
d.setMonth(d.getMonth()+plus+1 );
        year = d.getFullYear();
        month= d.getMonth()+1;
    console.log("Year : "+year+" , month : "+month);
    this.setState({nowYear:year, nowMonth:month});
//    this.state.nowYear;
//    this.state.nowMonth;
//    Alert.alert(`This is row {action}`);
}

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

    //in_array()
    function inArray(needle, haystack) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
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
boolGps =false;
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
    for( i=1; i<=untilDay; i++ ) {
	    let timeDate =  SunCalc.getMoonTimes(new Date(this.state.nowYear, this.state.nowMonth-1, i), har, lat);
        objData[i] = {};
        objData[i] = Object.assign(objData[i], {'moontime':timeDate});
    }
    console.log(objData, "objData");

    var outputKey = this.state.tableHead = ['date', 'rise','set'];
        this.state.flexArr = [1,1,1];

    var i = 0;
    for( var day in objData ) {
        this.state.tableData[i] = new Array();
        for( key in outputKey ) {
            dateData = objData[day]['moontime'][outputKey[key]];
            this.state.tableData[i][key] = outputKey[key] == "date" ? this.state.nowMonth+"/"+day : (typeof dateData == "undefined" ? "-" : (dateData.getHours()<10?"0":"")+dateData.getHours() + ":" + (dateData.getMinutes()<10?"0":"")+dateData.getMinutes()); 
        }

        i++;
    }
    
	var sunTimes = SunCalc.getTimes(new Date(), har, lat);

console.log("===================================================================");
console.log(this.state.tableHead, "tableHeader===================");

//sunTimes.sunrise;	//일출 - object
//sunTimes.sunset;	//일몰 - object



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

        <Content style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                    <Button iconLeft light small onPress={() => this._btnDate('left')}><Icon name='arrow-back' /><Text>Left</Text></Button>
                    <Text style={{fontSize:20}}>{this.state.nowYear}.{this.state.nowMonth}</Text>
                    <Button iconRight light small onPress={() => this._btnDate('right')} ><Icon name='arrow-forward' /><Text>Right</Text></Button>

{/*
                <View style={{alignSelf:"center", height:250}}>
                    <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Roundel-sable.svg/1200px-Roundel-sable.svg.png'}} style={{height: 200, width: 200/*, position:"absolute", top:0, left:'auto'}}/>
                    <Image source={{uri: 'https://png.pngtree.com/element_origin_min_pic/00/16/05/105731797561d64.jpg'}} style={{height: 200, width: 200, position:"absolute", top:0, left:phase-50}}/>

                </View>
*/}
{/*
310                     <Table borderStyle={{borderWidth: 2, borderColor: '#c8e
310                 <View style={{width:300}}>
                <Text>경도 : {lat} / 위도 : {har}</Text>
                <Text>{"\n"}</Text>
                <Text>일출 : {sunTimes.sunrise.toString()}</Text>
                <Text>일몰 : {sunTimes.sunset.toString()}</Text>
                <Text>월출 : {moonrise.toString()}</Text>
                <Text>월몰 : {moonset.toString()}</Text>
                <Text>달%(0:초승, 1:보름) : {fraction}</Text>
                <Text>달모양(초승☽->상현(오른쪽반달◑)->보름● </Text>
                <Text>->반(왼쪽반달◐)->그믐☾) : {phase}</Text>
*/}
        
{/*
                <Text>{"\n"}</Text>
                <Text>LocationText</Text>
                <Text>{locationText}</Text>
*/}

                <View style={{flex:1}}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={this.state.tableHead} flexArr={this.state.flexArr} style={styles.head} textStyle={styles.text}/>
                        <Rows data={this.state.tableData} flexArr={this.state.flexArr} textStyle={styles.text}/>
                    </Table>
                </View>

{/*
                <View style={{ flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' }}>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={{borderColor: '#C1C0B9'}}>
                                <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={{ height: 50, backgroundColor: '#537791' }} textStyle={{ textAlign: 'center', fontWeight: '100' }}/>
                            </Table>
                            <ScrollView style={{ marginTop: -1 }}>
                                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                                    {
                                        this.state.tableData.map((rowData, index) => (
                                            <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={this.state.widthArr}
                                                style={[{ height: 40, backgroundColor: '#E7E6E1' }, index%2 && {backgroundColor: '#F7F6E7'}]}
                                                textStyle={{ textAlign: 'center', fontWeight: '100' }}
                                            />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>

    */}


            </ScrollView>
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
