import React, {Component} from "react";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";
import { Alert, Button, TouchableOpacity, View } from "react-native";
import CustomButton from "./customButton";

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
 * @property {function(Region):[MarkerStruct]} onMount
 * @property {function(Region, [MarkerStruct]):[MarkerStruct]} onUpdate
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
                longitudeDelta: 0.1
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
        let region = await this.getLocalRegion();
        this.setState({
            region: region,
            markers: this.state.onMount(region)
        });
    }

    /**
     * Called when the viewpoint on the map is moved
     * @param {Region} region Contains the location data of the region
     */
    onRegionChangeComplete(region)
    {
        try 
        {
            this.setState({ region: region, 
                            markers: this.state.onUpdate(region, this.state.markers)});
        } 
        catch (error) 
        {
            console.error(error);
            //Alert.alert(error);
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
                return region = {
                    latitude:  position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.004
                }
            }
        }
        catch(error)
        {
            console.log(error);
            //Alert.alert(error);
            return this.state.region;
        }
    }

    render() 
    {
        return(
        <View style = {this.props.style}>
            <MapView
                style = {{flex:1, zIndex: -1}}
                region = {this.state.region}
                showsUserLocation={true}
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
            
            <Button
                title = "Center on me"
                onPress = {async () => {
                    let region = await this.getLocalRegion();
                    this.onRegionChangeComplete(region);
                }}
            />
        </View>
        );
    }
}