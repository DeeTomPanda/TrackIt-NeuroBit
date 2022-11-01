import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import {GlobalData} from './Home.js'

export default function MainFrame(){
	const {income,expense}=React.useContext(GlobalData)
	return(
	       <View style={{flex:0.3,backgroundColor:'#FFFFFF',padding:5}}>
		<View style={styles.mainFrame}>
		 <View style={styles.balance}>
		 <Text>{"Balance"}</Text>
		 <Text style={{color:'#02BEE8',fontWeight:'bold',fontSize:24}}>
		  {'$'+(income-expense)}
		 </Text>
		 </View>
		 <View style={{borderWidth:1,borderColor:'#D3D3D3'}}>
		 </View>
		 <View style={{...styles.balance,justifyContent:'space-around',textAlign:'center'}}>
		  <View>
		   <Text>{"Income"}</Text>
		   <Text style={{...styles.expenditure,color:'#00B152'}}>
		    {"$"+income}
		   </Text>
		  </View>
		  <View>
		   <Text>{"Expense"}</Text>
		   <Text style={{...styles.expenditure,color:'#D10000'}}>
		    {"$"+expense}
		   </Text>
		  </View>
		 </View>
		</View>
	       </View>);
}


const styles=StyleSheet.create({
	mainFrame:{
	           flex:1,
		   flexDirection:'row',
		   borderWidth:1,
		   width:'95%',
		   margin:'5%',
		   borderColor:'grey',
		   height:'18%',
		   backgroundColor:'#FFFFFF',
		   borderRadius:20
		   },
	balance:{
		 flex:1,
		 justifyContent:'center',
	         alignItems:'center'
	         },
       expenditure:{
       	    textAlign:'center',
       	    fontWeight:'bold',
       	    fontSize:20
       	    }
       
})
