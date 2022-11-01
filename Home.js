import { Text,View,TouchableOpacity,Pressable,Image,StatusBar,StyleSheet,SectionList } from 'react-native';
import * as React from 'react';
import MainFrame  from './MainFrame.js';
import Modals from './Modals.js';
import Transactions from './Transactions.js';
import moment from 'moment/min/moment-with-locales';
import AsyncStorage from '@react-native-async-storage/async-storage';
moment.locale('en')

import {DB} from './App.js';

export const GlobalData=React.createContext();

const DBkeys=["dateAsKeys","dummy","income","expense"];

const Home=({navigation})=>{
	const {asyncData}=React.useContext(DB)
	const [DATA,setDATA]=React.useState([...asyncData])
	const [show$$$,set$$$]=React.useState(false);
	const [showAddScreen,setAddScreen]=React.useState(false);
	const [showEditScreen,setEditScreen]=React.useState(false);
        const [dte,setDte]=React.useState()
	const [dateAsKeys,setDateAsKeys]=React.useState(DATA.length<2?{}
		                                                    :JSON.parse(DATA[0][1]))//
	const [dummy,setDummy]=React.useState(DATA.length<2?[]
					                   :JSON.parse(DATA[1][1]))//
	const [income,setIncome]=React.useState(DATA.length<2?0
						             :Number(DATA[2][1]))//
	const [expense,setExpense]=React.useState(DATA.length<2?0
						               :Number(DATA[3][1]))//
	const [toEditData,setEditData]=React.useState()   
	React.useLayoutEffect(()=>{
		let DATEAsKey={}
		dummy.forEach((v)=>
		{
		  if(!DATEAsKey[v.DATE])
		    DATEAsKey[v.DATE]=[]
		  DATEAsKey[v.DATE].push({amt:v.amt,desc:v.desc,isIncome:v.isIncome,id:v.id})
		})
		setDateAsKeys({...DATEAsKey})
		
		const storeData=async()=>{
		const dateAsKeysDB=[DBkeys[0],JSON.stringify(dateAsKeys)]
		const dummyDB=[DBkeys[1],JSON.stringify(dummy)]
		const incomeDB=[DBkeys[2],String(income)]
		const expenseDB=[DBkeys[3],String(expense)]
		try{await AsyncStorage.multiSet([dateAsKeysDB,dummyDB,incomeDB,expenseDB])}
		catch(e){console.log(e)}
		}
		
	if(dummy.length>0)
	  storeData()							//Sets only if elements not empty
	},[dummy])
	return(<>
		<StatusBar hidden={true} />
		<GlobalData.Provider 
		value={{		     toEditData,
			                     expense,
					     income,
			                     dateAsKeys,
				             setDateAsKeys,
			                     dte,
				             dummy,
				             setDummy,
				             setDte,
			                     show$$$,
		                             set$$$,
		                             showAddScreen,
		                             setAddScreen, 
		                             showEditScreen,
		                             setEditScreen,
					     setExpense,
		                             setIncome,
					     setEditData}}>
		<Modals/>
		<View style={styles.container}>
		 <MainFrame/>
		 <Transactions/>
		 <TouchableOpacity
		  onPress={()=>setAddScreen(true)}
		  style={styles.addButton}>
		 <Image source={require('./Add.png')}/>
		 </TouchableOpacity>
		</View>
		</GlobalData.Provider>
	       </>)
}


const styles=StyleSheet.create({
	container: {
    		flex: 1,
    		flexDirection:'column',
    		backgroundColor:'#D3D3D3',
    		alignItems: 'center',
    		paddingTop:0
  		},

  	addButton:{
	 	 marginTop:'auto',
	  	marginBottom:'10%',
  		},
  
});

export default Home;
