import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar,SafeAreaView,Image,Pressable,StyleSheet,Modal,
	Dimensions,Text,View,TouchableOpacity,TextInput } from 'react-native';
import Home from './Home.js';
import Profile from './Profile.js';


const Stack=createStackNavigator();

const Nav=()=>{
	return(
		<NavigationContainer>
		 <Stack.Navigator>
		  <Stack.Screen 
		    name={"Home"} 
		    component={Home}
		    options={({navigation})=>({
			          title:"TrackIt",
		                  headerTitleAlign:'center',
		                  headerRight:()=>(
		                           <Pressable 
					     style={{margin:8}} 
					     onPress={()=>navigation.navigate("Profile")}>
					     <Image 
					      source={require("./ProfilePic.png")}/>
				            </Pressable>),
			          headerStyle:{backgroundColor:"#F9C201"},
				  headerTitleStyle:{fontWeight:'bold',color:'#FFFFFF'},
		                 })
		  }/>
		  <Stack.Screen
		   name={"Profile"}
		   component={Profile}
		   options={({navigation})=>({
			          title:"TrackIt",
			          headerStyle:{backgroundColor:'#F9C201'},
			          headerTitleStyle:{fontWeight:'bold',
				                    color:'#FFFFFF'},
			          headerTitleAlign:'center',
			          headerTintColor:'#fff',})
		           }/>
		 </Stack.Navigator>
		</NavigationContainer>
	)
}

export default Nav;
