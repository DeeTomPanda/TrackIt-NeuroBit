import { View,Text,Button,Image,StyleSheet } from 'react-native';


const Profile=({navigation})=>
{
	return(<View style={styles.container}>
		<View style={styles.profileContainer}>
                <Image source={require('./ProfileGuy.png')} style={styles.profilePic}/>
		<View style={{alignItems:'center',marginTop:20}}>
		 <Text style={{fontWeight:'bold',fontSize:28,color:'#000000'}}>{"Divakar"}</Text>
		 <Text style={{color:'#707070'}}>{"Shanna@melissa.tv"}</Text>
		 <Text style={{color:'#707070'}}>{"Victor Plains ,Suite 879,Wisokyburgh"}</Text>
		</View>
		</View>
	      </View>)
}

const styles=StyleSheet.create({
	container: {
    	flex: 1,
    	flexDirection:'column',
    	backgroundColor:'#FFFFFF',
    	alignItems: 'center',
    	paddingTop:0
  	},
	profilePic:{
	  borderWidth:1,
	  borderRadius:100,
	  height:105,
	  width:105,
  	},
  	profileContainer:{
	  marginTop:60,
	  flex:0.5,
	  height:80,
	  alignItems:'center'
  	}
  })
  
  export default Profile;
