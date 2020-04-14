import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class address extends Component {
    
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    static navigationOptions = {
        title: 'Our Address'
    };

    render() {
        return (
            <ScrollView>
                  <Animatable.View animation="fadeInDown" duration={2000}>
                 <Card title="Contact Information">
                    <Text>
                        {`\n`}121, Clear Water Bay Road
                    {`\n`} Clear Water Bay, Kowloon
                    {`\n`} HONG KONG
                    {`\n`} Tel: +85212345678
                    {`\n`} Fax: +85287654321
                    {`\n`} Email:confustion@food.net
                </Text>
                <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
                </Animatable.View>
            </ScrollView>

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
    lineStyle: {
        borderWidth: 0.3,
        borderColor: 'grey',
        margin: 10,
    }
});


export default address;