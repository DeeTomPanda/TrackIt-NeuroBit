import { TextInput,Modal,Dimensions,Text,View,StyleSheet,Image,Pressable } from 'react-native';
import React from'react';
import {GlobalData} from './Home.js';
import {AddScreen,EditScreen,Show$$$} from './BasicScreens.js'

export default function Modals(){
         
	const {showAddScreen,showEditScreen,show$$$,
	       setAddScreen,setEditScreen,set$$$}=React.useContext(GlobalData)
	const [isIncome,setIsIncome]=React.useState(true)
	return(
	       <Modal visible={(showAddScreen || show$$$ || showEditScreen) } 
		      backdropColor={'transparent'}
		      animationType={"slide"}
		      transparent={true}>
		<View style={styles.innerModal}>
		<Pressable style={styles.exitBtn}
		       onPress={()=>{
			            set$$$(false)
			            setAddScreen(false)
			            setEditScreen(false)}
		}>
		 <Image source={require('./exit.png')}/>
		</Pressable>
	     { showAddScreen && 
	       <AddScreen/>
	     }
	     {
		show$$$ &&
		<Show$$$/> 
	     }
	     {
		showEditScreen &&
		<EditScreen/>
	     } 
	       </View>
	       </Modal>
	      )
}

const styles=StyleSheet.create({
	
	exitBtn:{
		position:'absolute',
		right:15,
		top:15,
	},
	innerModal:{
		   flex:1,
		   marginTop:25,
		   backgroundColor:'rgba(255,255,255,1)',
		   borderTopLeftRadius:20,
		   borderTopRightRadius:20
	}
	
})
