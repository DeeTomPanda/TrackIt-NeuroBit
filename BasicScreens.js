import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput,Modal,Dimensions,Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import React from'react';
import {GlobalData} from './Home.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment/min/moment-with-locales';
moment.locale('en-in');

const ToggleCalendar=({setTemp,temp,setDate_,setDte,currentDT})=>{
	if(currentDT!=undefined)
		 currentDT=currentDT.split('/')
	return(<DateTimePicker
		value={!currentDT?new Date():new Date(currentDT[2],currentDT[1]-1,currentDT[0])}
		maximumDate={new Date()}
		onChange={(e,dt)=>{ 
			setDate_(false)
			if(e.type==='set'){
			   if(!currentDT)
			      setDte(moment(dt).format('L'))
			   else
			      setTemp({...temp,DATE:moment(dt).format('l')})}
		}}
		/>)
}


const Switch=({isIncome,setIsIncome,setTemp,temp})=>{
	return(
	       <View style={styles.switch_}>
		 <TouchableOpacity>
		  <Text style={[styles.income,isIncome?styles.btnSelected:{}]}
		        onPress={()=>{!setTemp?setIsIncome(true):setTemp({...temp,isIncome:true})}}>
		   {"Income"}
		  </Text>
		 </TouchableOpacity>
		 <TouchableOpacity>
		  <Text style={[styles.expense,!isIncome?styles.btnSelected:{}]}
		        onPress={()=>{!setTemp?setIsIncome(false):setTemp({...temp,isIncome:false})}}>
		   {"Expense"}
		  </Text>
		 </TouchableOpacity>
		</View>)
}             
             
const AddScreen=()=>{  

	const [isDate_,setDate_]=React.useState(false)
	const [isIncome,setIsIncome]=React.useState(true)
	const {dummy,setDummy,dateAsKeys,setDateAsKeys,
	       showAddScreen,dte,setAddScreen,setDte,income,setIncome,
	       setExpense,expense}=React.useContext(GlobalData)
	const [amt,setAmt]=React.useState(0)
	const [desc,setDesc]=React.useState(null)
	const [isFocus,setFocus]=React.useState({amt:false,
						 desc:false,
						 dte:false})

	return(
               <View style={styles.modalScreen}>
		<Text style={{fontSize:18}}>{"Add Income/Expense"}</Text>
		<Switch isIncome={isIncome} setIsIncome={setIsIncome}/>
		<TextInput  
		style={{...styles.textIP,borderColor:isFocus.amt?'#F9C201':'#FFFFFF'}} 
		placeholder={"Amount"} 
		onChangeText={(txt)=>setAmt(txt)}
		keyboardType={"number-pad"}
		onFocus={()=>setFocus({...isFocus,amt:true})}
		onBlur={()=>setFocus({...isFocus,amt:false})}
		/>
		<TextInput  
		style={{...styles.textIP,borderColor:isFocus.desc?'#F9C201':'#FFFFFF'}} 
		placeholder={"Description"}
		onChangeText={(txt)=>setDesc(txt)}
		onFocus={()=>setFocus({...isFocus,desc:true})}
		onBlur={()=>setFocus({...isFocus,desc:false})}
		/>
		<TextInput  
		style={{...styles.textIP,borderColor:isFocus.dte?'#F9C201':'#FFFFFF'}} 
		placeholder={"Date"} 
		onFocus={()=>{
			setFocus({...isFocus,dte:true})
			setDate_(true)}}
		onBlur={()=>setFocus({...isFocus,dte:false})}
		showSoftInputOnFocus={false}
		value={dte}
		/>
		{isDate_ && 
		 <ToggleCalendar setDte={setDte} setDate_={setDate_}/>}
		<TouchableOpacity 
		      onPress={()=>{
			      if(dte && amt && desc)
			      {
				setDummy([...dummy,{DATE:dte,amt:amt,desc:desc,
					isIncome:isIncome,id:(dte+(Math.random()*99))}])
				isIncome?setIncome(income+Number(amt)):setExpense(expense+Number(amt))
				console.log("HIi")
			      }
			      setTimeout(()=>setAddScreen(false),50)
		      }
		}>
		 <Text style={styles.saveBtn}>
		  {"Save"}
		 </Text>
		</TouchableOpacity>
	       </View>)
}

const Show$$$=()=>{
	const {set$$$,setEditScreen,dummy,setDummy,
	       toEditData,setIncome,setExpense,income,expense}=React.useContext(GlobalData);
        const [delData,setDelData]=React.useState(false)
	let localDate=toEditData.DATE.split('/')
        localDate=moment({year:localDate[2],month:localDate[1]-1,date:localDate[0]}).format('ll')

	React.useLayoutEffect(()=>{
		if(delData){
		   let dummy_=dummy.filter((v)=>v.id!=toEditData.id)
		   toEditData.isIncome
			?setIncome(income-toEditData.amt)
			:setExpense(expense-toEditData.amt)
		   setDummy(dummy_)
		   console.log("Firing from show$$")
		}
	},[delData])

	return(<View style={styles.modalScreen}>
		 <Text style={{fontSize:18}}>{toEditData.isIncome?"Income":"Expense"}</Text>
		 <Text style={{fontSize:32,padding:40,fontWeight:'bold',
				color:(toEditData.isIncome?'#00B152':'#D10000')}}>
		 {'$'+toEditData.amt}
		 </Text>
		 <Text style={{fontSize:18}}>{toEditData.desc}</Text> 
		 <Text>{localDate}</Text>
		 <View style={styles.editOptions}>
		  <TouchableOpacity 
		     onPress={()=>{
		                   set$$$(false)
			     	   setDelData(false)
			           setEditScreen(true)
		                  }
		   }>
		    <Text style={{fontWeight:'bold',color:'#F9C201',fontSize:14}}>
		     {"Edit"}
		    </Text>
		   </TouchableOpacity>
		   <TouchableOpacity onPress={()=>{
			         if(dummy.length==1){
					 const clearAll=async()=>await AsyncStorage.clear()
					 clearAll()}
		  		 setDelData(!delData)
		                 setTimeout(()=>set$$$(false),50)}
		   }>
		    <Text style={{fontSize:14}}> 
		     {"Delete"}
		    </Text>
		   </TouchableOpacity>
		 </View>
                </View>)
}

const EditScreen=()=>{
	const [isDate_,setDate_]=React.useState(false)
	const [isIncome,setIsIncome]=React.useState(false)
        const {setEditScreen,dte,setDte,dummy,setDummy,income,expense,
		setIncome,setExpense,toEditData}=React.useContext(GlobalData);
	const [temp,setTemp]=React.useState({...toEditData})
        const[editData,setEditData]=React.useState(false)
        const [isFocus,setFocus]=React.useState({amt:false,
						 desc:false,
						 dte:false})


	React.useLayoutEffect(()=>{
                 if(editData){
		  console.log( `local income is ${income}`)
		   let dummy_=dummy.filter((v)=>v.id!=toEditData.id)
		   toEditData.isIncome
				?setIncome(income-Number(toEditData.amt))
				:setExpense(expense-Number(toEditData.amt))
		console.log(`income is ${income} expense is ${expense} toEdit ${toEditData.amt}`)
		   setDummy(dummy_)
		   dummy_.push({...temp})
		   console.log(`temp amt ${temp.amt}`)
			
		   setDummy(dummy_)
		   console.log("Firing from EditScreen")}
	},[editData])
	
	return(
		<View style={styles.modalScreen}>
		<Text>{"Edit Income/Expense"}</Text>
		<Switch 
		isIncome={temp.isIncome} 
		temp={temp} 
		setIsIncome={setIsIncome} 
		setTemp={setTemp}/>
		<TextInput 
		style={{...styles.textIP,borderColor:isFocus.amt?'#F9C201':'#FFFFFF'}}
		value={temp.amt} 
		onFocus={()=>setFocus({...isFocus,amt:true})}
		onBlur={()=>setFocus({...isFocus,amt:false})}
		onChangeText={(txt)=>setTemp({...temp,amt:txt})}
		keyboardType={"number-pad"}
		placeholder={"Amount"}/>
		<TextInput 
		style={{...styles.textIP,borderColor:isFocus.desc?'#F9C201':'#FFFFFF'}}
		onFocus={()=>setFocus({...isFocus,desc:true})}
		onBlur={()=>setFocus({...isFocus,desc:false})} 
		value={temp.desc} 
		onChangeText={(txt)=>setTemp({...temp,desc:txt})}
		placeholder={"Description"}/>
		<TextInput  
		style={{...styles.textIP,borderColor:isFocus.dte?'#F9C201':'#FFFFFF'}} 
		value={temp.DATE} 
		placeholder={"Date"} 
		onFocus={(e)=>{
			setDate_(true)
			setFocus({...isFocus,dte:true})}}
		onBlur={()=>setFocus({...isFocus,dte:false})} 
		showSoftInputOnFocus={false}
		/>
		{isDate_ && 
		 <ToggleCalendar temp={temp} setTemp={setTemp} setDte={setDte} 
			setDate_={setDate_} currentDT={toEditData.DATE}/>}
		 <TouchableOpacity
		  onPress={()=>{
		  	  setEditData(!editData)
		  	  temp.isIncome
				   ?setIncome(income+Number(temp.amt))
				   :setExpense(expense+Number(temp.amt))
		  	  setTimeout(()=>setEditScreen(false),100)}
		 }>
		  <Text style={styles.saveBtn}>
		   {"Save"}
		  </Text>
		 </TouchableOpacity>
		</View>)
}

const styles=StyleSheet.create({
	modalScreen:{
		alignItems:'center',
		justifyContent:'space-between',
		marginTop:15
	}, 
	textIP:{
		width:Dimensions.get('window').width/1.10,
		margin:'3%',
		padding:10,
		borderWidth:1,
		borderColor:'#D3D3D3',
		borderRadius:10,
		alignItems:'flex-start'},
	saveBtn:{
		color:"#F9C201",
		fontSize:14,},
	switch_:{
		marginTop:15,
		marginBottom:15,
		flexDirection:'row',
		justifyContent:'center',
	},
	income:{
		borderWidth:1,
		borderTopLeftRadius:10,
		borderBottomLeftRadius:10,
		padding:10,
		borderColor:'#FFFFFF',
		backgroundColor:"#E9E9E9",
		color:"black",
		marginRight:0
	},
	expense:{
		borderWidth:1,
		borderTopRightRadius:10,
		borderBottomRightRadius:10,
		padding:10,
		borderColor:'#FFFFFF',
		backgroundColor:'#E9E9E9',
		color:'black',
		marginLeft:0
	},
	btnSelected:{
		backgroundColor:'#F9C201',
		color:'#FFFFFF'
	},
	editOptions:{
		height:70,
		justifyContent:'space-around',
		marginTop:20,
		alignItems:'center'
	},
})
	

export {EditScreen,AddScreen,Show$$$}
