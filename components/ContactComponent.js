import React ,{Component} from 'react';
import {Text ,StyleSheet, View} from 'react-native'
import { Card } from 'react-native-elements';

class address extends Component{

    static navigationOptions={
        title: 'Our Address'
    };

    render(){
        return(
            <Card>
             <Text style={styles.headline}>Contact Info</Text>
                <View style ={styles.lineStyle}/>
                <Text>
                    {`\n`}121, Clear Water Bay Road
                    {`\n`} Clear Water Bay, Kowloon
                    {`\n`} HONG KONG
                    {`\n`} Tel: +85212345678
                    {`\n`} Fax: +85287654321
                    {`\n`} Email:confustion@food.net
                </Text>
            </Card>
        );
    }

   

}

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 300
    },
    lineStyle:{
        borderWidth: 0.3,
        borderColor:'grey',
        margin:10,
   }
});


export default address;