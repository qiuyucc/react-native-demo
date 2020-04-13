
import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Button, Modal, StyleSheet,Alert,PanResponder, Platform } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites,
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


function RenderDish(props) {
    const dish = props.dish;
    
   //handleViewRef = ref => this.view = ref;
    
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx > 200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        // onPanResponderGrant: () => {this.view.rubberBand(1000).
        //     then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},  * ref={this.handleViewRef} --put ref into anmiatable.view
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
                else if(recognizeComment(gestureState)){
                    props.showComment();
                }

            return true;
        }
    })
    
    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
            {...panResponder.panHandlers} >
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorited') : props.onPress()}
                    />
                    <Icon
                        raiseds
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.showComment()}
                    />
                </View>
            </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>

                <Rating imageSize={16}
                    readonly
                    startingValue={item.rating}
                    style={{ alignItems: "flex-start" }} />


                <Text style={{ fontSize: 12 }}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    if (comments != null) {
        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
            <Card title="Comments" >
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>)
    }
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: null,
            author: '',
            comment: '',
            showComment: false
        }
    }
    toggleModal() {
        this.setState({ showComment: !this.state.showComment });
    }

    submitComment(dishId) {

        this.props.postComment(dishId,this.state.rating, this.state.author, this.state.comment);
        this.resetForm();
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    resetForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: '',
            showComment: false
        })
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    showComment={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType={"slide"} transparent={false}
                    visible={this.state.showComment}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating showRating type="star" StartingValue={3}
                            showRating={true}
                            onFinishRating={(rating) => this.setState({ rating: rating })}></Rating>
                        <Input placeholder="Author"
                            value={this.state.author}
                            leftIcon={<Icon name='user' type='font-awesome' />}
                            onChangeText={(value) => this.setState({ author: value })} />
                        <Input placeholder="Comment"
                            value={this.state.comment}
                            leftIcon={<Icon name='comment' type='font-awesome' />}
                            onChangeText={(value) => this.setState({ comment: value })} />
                        <View style={{ margin: 10 }}>
                            <Button title='SUBMIT'
                                color='#512DA8'
                                onPress={() => this.submitComment(dishId)}
                            />
                        </View>

                        <View style={{ margin: 10 }}>
                            <Button title='CANCEL' color='#6c757d' onPress={() => { this.toggleModal(); this.resetForm(); }} />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 40,
        padding: 10
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);