import React, {Component} from "react";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import { Alert, StyleSheet, TouchableHighlight, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 


/**
 * @typedef Region
 * @property {Number} latitude
 * @property {Number} longitude
 * @property {Number} latitudeDelta
 * @property {Number} longitudeDelta
 */

/**
 * @typedef MarkerStruct
 * @property {Number} latitude
 * @property {Number} longitude
 * @property {String} title
 * @property {String} description
 * @property {String} key
 */

/**
 * @typedef {Object.<string, string>} Style
 */

/**
 * @typedef Props
 * @property {Style} style
 * @property {function(Region):[MarkerStruct]} onMount Used to add initial markers
 * @property {function(Region, [MarkerStruct]):[MarkerStruct]} onUpdate Used to update/add/remove markers. Will be called after onMount
 */

/**
 * @typedef State
 * @property {Region} region
 * @property {[MarkerStruct]} markers
 * @property {function(Region):Promise<[MarkerStruct]>} onMount
 * @property {function(Region, [MarkerStruct]):Promise<[MarkerStruct]>} onUpdate
 */

/**
 * @class
 * @extends {Component<Props>}
 * @prop onMount
 * @prop onUpdate
 * @prop getLocalRegion
 */
export default class CustomMap extends Component
{
    /**
     * @constructor
     * @param {Props} props 
     */
    constructor(props) 
    {
        super(props);

        /** @type {State} */
        this.state = { 
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            },
            markers: [],
            onMount:  props.onMount  ? props.onMount  
                                     : (_)   => {return []},
            onUpdate: props.onUpdate ? props.onUpdate 
                                     : (_,markers) => {return markers}
        }
    }
    
    async componentDidMount()
    {
        try
        {
            let region = await this.getLocalRegion();
            setTimeout(async ()=>this.setState({
                region: region,
                markers: await this.state.onMount(region)
            }), 200);
        }
        catch(error)
        {
            console.error(error);
            Alert.alert("MountError", error.message);
        }
    }

    /**
     * Called when the viewpoint on the map is moved
     * @param {Region} region Contains the location data of the region
     */
    async onRegionChangeComplete(region)
    {
        try 
        {
            this.setState({ region: region, 
                            markers: await this.state.onUpdate(region, this.state.markers)});
        } 
        catch (error) 
        {
            console.error(error);
            Alert.alert("UpdateError", error.message);
        }
    }

    /**
     * Returns the current region
     * @returns {Promise<Region>}
     */
    async getLocalRegion()
    {
        try
        {
            let response = await Location.requestForegroundPermissionsAsync();
            if (response.granted)
            {
                let position = await Location.getCurrentPositionAsync();
                return {
                    latitude:  position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.004
                };
            }
        }
        catch(error)
        {
            console.log(error);
            Alert.alert("GetLocalError", error.message);
            return this.state.region;
        }
    }

    render() 
    {
        return(
            <View style={{flex:1}}>
                <MapView
                    style = {this.props.style}
                    region = {this.state.region}
                    showsUserLocation={true}
                    showsPointsOfInterest={true}
                    onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            title={marker.title}
                            description={marker.description}
                            coordinate={{ longitude: marker.longitude, 
                                        latitude:  marker.latitude}}
                        />
                    ))}
                </MapView>
                <TouchableHighlight 
                    style={styles.centerButton}
                    underlayColor="#f2f2f2"
                    onPress={async () => 
                    {
                        let region = await this.getLocalRegion();
                        this.setState({region: region});
                    }}
                >
                    <AntDesign name="enviromento" size={24} color="black"/>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerButton: {
        padding:5, 
        zIndex:10, 
        backgroundColor:"rgba(255,255,255,0.7)",
        position:"absolute",
        alignSelf:"flex-end",
        top:7,
        right:7,
        borderRadius: 20,
        borderWidth: 1
    }
});