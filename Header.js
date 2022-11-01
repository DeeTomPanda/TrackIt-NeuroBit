import {StyleSheet,View,Text,Dimensions,StatusBar} from 'react-native';

const hWidth=Dimensions.get('screen').width;

export const Header=({navigation})=>{
	console.log(navigation);
	return(
		<View style={styles.header}>
		 <StatusBar hidden={true}/>
		 <Text style={styles.headerText}>{"Trackit"}</Text>
		 <Text style={styles.profilePic}>{"Logo"}</Text>
		</View>)
}

const styles=StyleSheet.create({
	header:{
		flexDirection:'row',
		backgroundColor:'#F9C201',
		textAlign:'center',
		justifyContent:'center',
		alignItems:'center',
		height:80,
		width:hWidth,
	},
	headerBlurr:{
		 flexDirection:'row',
		 backgroundColor:'rgba(174,135,0,1)',
		 textAlign:'center',
		 justifyContent:'center',
		 alignItems:'center',
		 height:80,
		 width:hWidth
	},
	headerText:{
		fontFamily:'Roboto',
		fontSize:18,
		fontWeight:'bold',
		color:'#FFFFFF',
		padding:30,
		position:'relative',
		top:8.33,
		bottom:8.33
	},
	profilePic:{
		position:'absolute',
		right:8.33,
		bottom:12.33,
		color:'#FFFFFF',
		borderWidth:1,
		padding:4,
		borderRadius:100,
		fontWeight:'bold',
		borderColor:'white'

	}
})
