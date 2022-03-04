/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View,TextInput,Picker} from 'react-native';
import {Header, Text, ListItem, Input} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

const list = [
    {
        title: 'Hourly',
    },
    {
        title: 'Daily',
    },
    {
        title: 'Weekly',
    },
    {
        title: 'Bi-Weekly',
    },
    {
        title: 'Semi-Monthly',
    },
    {
        title: 'Monthly',
    },
    {
        title: 'Annually',
    },
];







export default class App extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            currency: '₦ - (Nigerian Naira)',
            currencySymbol : '₦',
            days : 5,
            hours : 8,

            hourly : 0,
            daily : 0,
            weekly : 0,
            biweekly : 0,
            semimonthly : 0,
            monthly : 0,
            annually : 0
        }
    }

    _rightElement = (i) => {
        return (<View style={styles.inputWrapper}>
            <Text style={styles.inputWrapperText}>{this.state.currencySymbol}</Text>
            <TextInput
                style={styles.inputWrapperTextField}
                placeholder='0.00'
                onChangeText={(amt) => this._handleInputChange(amt,i)}
                defaultValue={this._formatMoney(this._currentInputValue(i)).toString()}
                keyboardType={'numeric'}
        /></View>);
    };

    _currentInputValue = (i) => {
        //return 0;
        switch (i) {
            case 0 :
                return this.state.hourly;
                case 1 :
                    return this.state.daily;
                case 2 :
                return this.state.weekly;
                case 3 :
                return this.state.biweekly;
                case 4 :
                return this.state.semimonthly;
                case 5 :
                return this.state.monthly;
                case 6 :
                return this.state.annually;
        }
    };

    _handleInputChange = (amt, i) => {
        if(!amt){ return 0; }
        let a = parseFloat(amt);
        let hourly = this.state.hours;
        let days = this.state.days;

        let wkfreedays = 7 - days;
        let monthlyworkingdays = 30 - (wkfreedays * 4);

        let hh = hourly;
        let dh = hourly; //number of hours per day
        let wk = hourly * days; //weekly hour
        let bih = hourly * days * 2; //bi weekly hours
        let smh = hourly * (monthlyworkingdays/2); //semi monthly hours
        let  mh = hourly * monthlyworkingdays; //monthly hours
        let  my = hourly * monthlyworkingdays * 12; //monthly hours
       switch (i) {
           case 6:{
               //annual rate
               let byh = (a/my); //by hour
               this.setState({monthly : byh * mh});
               this.setState({semimonthly : byh * smh});
               this.setState({biweekly : byh * bih});
               this.setState({weekly : byh * wk});
               this.setState({daily : byh * dh});
               this.setState({hourly : byh});
           }
           break;
           case 5:{
               //monthly rate
               let byh = (a/mh); //by hour
               //this.setState({monthly : byh * mh});
               this.setState({annually : byh * my});
               this.setState({semimonthly : byh * smh});
               this.setState({biweekly : byh * bih});
               this.setState({weekly : byh * wk});
               this.setState({daily : byh * dh});
               this.setState({hourly : byh});
           }
           break;
           case 4 : {
               //semi monthly rate
               let byh = (a/smh); //by hour
               this.setState({annually : byh * my});
               this.setState({monthly : byh * mh});
               //this.setState({semimonthly : byh * smh});
               this.setState({biweekly : byh * bih});
               this.setState({weekly : byh * wk});
               this.setState({daily : byh * dh});
               this.setState({hourly : byh});
           }
           break;

           case 3 : {
               //Bi weekly rate
               let byh = (a/bih); //by hour
               this.setState({annually : byh * my});
               this.setState({monthly : byh * mh});
               this.setState({semimonthly : byh * smh});
               //this.setState({biweekly : byh * bih});
               this.setState({weekly : byh * wk});
               this.setState({daily : byh * dh});
               this.setState({hourly : byh});
           }
           break;

           case 2 : {
               //weekly rate
               let byh = (a/wk); //by hour
               this.setState({annually : byh * my});
               this.setState({monthly : byh * mh});
               this.setState({semimonthly : byh * smh});
               this.setState({biweekly : byh * bih});
               //this.setState({weekly : byh * wk});
               this.setState({daily : byh * dh});
               this.setState({hourly : byh});
           }
           break;

           case 1 : {
               //Daily rate
               let byh = (a/dh); //by hour
               this.setState({annually : byh * my});
               this.setState({monthly : byh * mh});
               this.setState({semimonthly : byh * smh});
               this.setState({biweekly : byh * bih});
               this.setState({weekly : byh * wk});
               //this.setState({daily : byh * dh});
               this.setState({hourly : byh});
           }
           break;

           case 0: {
               //Hourly rate
               //let byh = (a/hh); //by hour
               let byh = a;
               this.setState({annually : byh * my});
               this.setState({monthly : byh * mh});
               this.setState({semimonthly : byh * smh});
               this.setState({biweekly : byh * bih});
               this.setState({weekly : byh * wk});
               this.setState({daily : byh * dh});
               //this.setState({hourly : byh});
           }
       }
    };

    _formatMoney = (n) =>{
        return (n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    _optionalElement = (type) => {
        let data = [];
        let v = 0;
        switch (type) {
            case 'hours':
                for (let i= 1; i < 25; i++ ){
                    data.push({'value' : i});
                }
                v = this.state.hours;
                break;

            case 'days':
                for (let i= 1; i < 8; i++ ){
                    data.push({'value' : i});
                }
                v = this.state.days;
                break;

            case 'cur':
                let json = require('./resources/cc.js');
                let obj = json.default;
                let objKeys = Object.keys(obj);
                Object.keys(obj).map(function(key, index) {
                    let v =  obj[key].symbol + ' -  ('+ obj[key].name + ')';
                    data.push({value : v});
                });
                v = this.state.currency;
                break;

        }
        return(
            <View style={{margin : 0,padding : 0, width : (type === 'cur') ? 200 :  40,borderWidth : 0}}>
            <Dropdown
                data={data}
                animationDuration={100}
                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                containerStyle={{position : 'relative', height : 30, bottom : 30}}
                value={v}
                onChangeText={ (value,index,data) => this._dropdownValueChanged(value,index,data,type)}
            />
            </View>
           );
    };

    _dropdownValueChanged = (value, index, data,type) => {
        if(type === 'hours'){
            this.setState({hours : value});
            //handle change to change the input value here
            this._handleInputChange(this.state.hourly,0);
        }else if(type === 'days'){
            this.setState({days : value});
            //handle change to change the input value here
            this._handleInputChange(this.state.hourly,0);
        }else {
            let arr = value.split('-');
            let cSymbol = arr[0];
            this.setState({currencySymbol: cSymbol});
            this.setState({currency: value});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{icon: null, color: '#fff'}}
                    centerComponent={{text: 'Kobo', style: {color: '#fff'}}}
                    rightComponent={{icon: 'info-outline', color: '#fff'}}
                />
                <View>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                bottomDivider={true}
                                rightElement={this._rightElement(i)}
                                titleStyle={{color : '#555'}}
                            />
                        ))
                    }
                </View>

                <View>
                    <ListItem
                        title={'Additional Options'}
                        disabled={true}
                        titleStyle={{fontWeight : 'bold'}}
                        contentContainerStyle={{backgroundColor : '#f2f4f6'}}
                        containerStyle={{backgroundColor : '#f2f4f6'}}

                    />
                </View>
                <View>
                    <ListItem
                        title={'Hours/Day'}
                        titleStyle={styles.textColor}
                        containerStyle={{maxHeight : 50}}
                        bottomDivider={false}
                        rightElement={this._optionalElement('hours')}
                    />
                </View>
                <View>
                    <ListItem
                        title={'Days/Week'}
                        titleStyle={styles.textColor}
                        containerStyle={{maxHeight : 50}}
                        bottomDivider={false}
                        rightElement={this._optionalElement('days')}
                    />
                </View>
                <View>
                    <ListItem
                        title={'Currency'}
                        titleStyle={styles.textColor}
                        containerStyle={{maxHeight : 50}}
                        bottomDivider={false}
                        rightElement={this._optionalElement('cur')}

                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    inputWrapper : {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection:'row',
        color : '#555',
    },
    inputWrapperDropdown : {
    },
    inputWrapperText : {
        marginRight : 10,
        fontSize : 14,
    },
    inputWrapperTextField : {
        fontSize : 14,
        minWidth : 40,
    },

    textColor : {
        color : '#555'
    }
});
