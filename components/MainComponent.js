import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import { View, Platform,Image, StyleSheet,ScrollView,Text} from 'react-native';
import { createStackNavigator, createDrawerNavigator,DrawerItems,SafeAreaView } from 'react-navigation';
import Home from './HomeComponent';
import Aboutus from './AboutComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })
  

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
        
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name='menu' size={24}
            color= 'white'
            onPress ={()=>navigation.toggleDrawer()}/>
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} 
        onPress={ () => navigation.navigate('DrawerToggle') } />    
    })
  })
  
const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions:({ navigation})=>({
            headerLeft: <Icon name='menu' size={24}
            color= 'white'
            onPress ={()=>navigation.toggleDrawer()}/>
        }) },
    Dishdetail: { screen: Dishdetail }
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);

const AboutusNavigator = createStackNavigator({
    Aboutus: { screen: Aboutus },
},
{
    initialRouteName: 'Aboutus',
    navigationOptions:({ navigation})=>( {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
            color= 'white'
            onPress ={()=>navigation.toggleDrawer()}/>
    })
}
);

const ContactNavigator = createStackNavigator({
     Contact: { screen: Contact },
},
{
    initialRouteName: 'Contact',
    navigationOptions:({ navigation})=>( {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: <Icon name='menu' size={24}
            color= 'white'
            onPress ={()=>navigation.toggleDrawer()}/>
    })
}
);

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) =>(
              <Icon 
              name='home'
              type='font-awesome'
              size={24}
              color={tintColor}/>
          )
        }
      },
      Aboutus: 
      { screen: AboutusNavigator,
        navigationOptions: {
          title: 'Aboutus',
          drawerLabel: 'Aboutus',
          drawerIcon: ({ tintColor }) =>(
            <Icon 
            name='info-circle'
            type='font-awesome'
            size={24}
            color={tintColor}/>
        )
      }
        }, 
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor }) =>(
            <Icon 
            name='list'
            type='font-awesome'
            size={24}
            color={tintColor}/>
        )
      }
      },
      Contact:
      {
        screen: ContactNavigator,
        navigationOptions: {
          title: 'Contact',
          drawerLabel: 'Contact',
          drawerIcon: ({ tintColor }) =>(
            <Icon 
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}/>
        )
      }
      },
      Reservation:
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
      }
}, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent:CustomDrawerContentComponent
});


class Main extends Component {
 
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
}
  render() {
 
    return (
       
            <MainNavigator />
     
    );
  }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  export default connect(mapStateToProps, mapDispatchToProps)(Main);