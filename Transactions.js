import { Text,View,TouchableOpacity,Pressable,Image,StatusBar,StyleSheet,SectionList } from 'react-native';
import * as React from 'react';
import {GlobalData} from './Home.js';
import moment from 'moment/min/moment-with-locales';
moment.locale('en')


const Transactions=()=>{

	const{dateAsKeys,dummy,setEditData,set$$$,toEditData}=React.useContext(GlobalData)

	const [newDatesAsKey,setNewDatesAsKey]=React.useState([])

	const getDatas=(id)=>{
                  let selected;
                  dummy.map((v,i)=>{
                     if(id==v.id) 
                        selected=v})
                  setEditData(selected)
		  console.log(JSON.stringify(selected))
                  setTimeout(()=>set$$$(true),200)}


	React.useEffect(()=>{
	let items=dateAsKeys
	let datesOrdered=Object.keys(items)
	datesOrdered=datesOrdered.sort((a,b)=>{
		 a=a.split('/').reverse()
		 b=b.split('/').reverse()
		 a=new Date(a[0],a[1],a[2]).getTime()
                 b=new Date(b[0],b[1],b[2]).getTime()
        	 if(a>b)
           	   return -1;
        	 else if(a<b)
           	   return 1;
        	 else
           	   return 0 })

	let newDateAsKey=[]

	datesOrdered.forEach((v)=>{
		let V=v.split('/')
		V=moment({year:V[2],month:V[1]-1,date:V[0]}).format('ll')
	   newDateAsKey.push({title:((V==moment().format('ll'))?"Today":V),
		   data:items[v]})})
	setNewDatesAsKey([...newDateAsKey])
	},[dateAsKeys,dummy])

	return(
		<View style={{flex:0.7,marginLeft:10,marginRight:10,
				marginTop:8,width:'100%'}}>
		<SectionList
		 extraData={dummy}
		 sections={newDatesAsKey}
		 renderItem={({item})=>{return(
			 <TouchableOpacity onPress={()=>getDatas(item.id)}>
			 <View style={styles.outerSection}> 
			  <View style={styles.sectionItem}>
			  <Text style={{...styles.txnText,fontWeight:(item['isIncome']
				                          ?'bold':'normal')}}>
			   {item['desc']}
			  </Text>
			  <Text style={{...styles.txnText,color:(item['isIncome']!=true
				                                 ?'#D10000':'#00B152'),
					  fontWeight:'bold',}}
			  >
			  {" $" +item['amt']}
			 </Text>
			 </View>
			 </View>
		         </TouchableOpacity>)}
		 }
		 renderSectionHeader={({section:{title}})=><View style={styles.sectionHeader}>
			 <Text>{title}</Text>
			 </View>}
		/>
		</View>
		)
}

const styles=StyleSheet.create({
	sectionHeader:{
		flexDirection:'row',
		alignItems:'flex-end',
		justifyContent:'center',
		fontSize:14,
		marginTop:10},
	txnText:{
		fontSize:14,
		padding:'2%',
		borderTopLeftRadius:7,},
	outerSection:{
		padding:10,
		marginLeft:5,
		marginBottom:-10,
		flexDirection:'row',
		marginRight:5},
	sectionItem:{
		backgroundColor:'#FFFFFF',
		flex:1,
		flexDirection:'row',
		borderRadius:7,
		justifyContent:'space-between'}
})	


export default Transactions;
