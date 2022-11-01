import * as React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar,SafeAreaView,Image,Pressable,ActivityIndicator,StyleSheet,Modal,Dimensions,Text,View,TouchableOpacity,TextInput } from 'react-native';
import MainFrame  from './MainFrame.js';
import Modals from './Modals.js';
import Nav from './Nav.js';
export const DB=React.createContext()


const Stack=createStackNavigator();
const DBkeys=["dateAsKeys","dummy","income","expense"];
export default function App(){
const [asyncData,setAsyncData]=React.useState([]);
const [isLoading,setIsLoading]=React.useState(true)	
React.useEffect(()=>{
	const getData=async()=>{
	try{ 
	     let value=(await AsyncStorage.multiGet([...DBkeys]))
	     if(JSON.parse(value[1][1]).length>0)
		setAsyncData([...value])
		}
	     catch(e){console.log(e)}
	    setIsLoading(false)
	}	
	getData()},[])
	return(<>
		<DB.Provider value={{asyncData}}>
		<StatusBar translucent={true}/>
		{!isLoading
		 ?<Nav/>
		 :<LoadScreen/>}
		</DB.Provider>
	      </>)
}

const LoadScreen=()=>{
	return(
		<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
		<ActivityIndicator size="large" animating={true}/>
		</View>)
		}




  
