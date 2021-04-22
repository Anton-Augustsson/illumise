import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, _ScrollView } from 'react-native';


const getDirections = async (startLoc, destinationLoc) => {
    try {
      const KEY = "insert api key";
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      console.log(points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };

export const MapScreen = () => {

const _map = React.useRef(null);
const _scrollView = React.useRef(null);

const initialMapState = {
    markers,
    categories: [
        {
            name: "doer",
            icon: "swag", 
        },
        {
            name: "requester",
            icon: "yolo", 
        },
    ],
    region: {
        latitude: 100,
        longitude: -100,
        latitudeDelta: 0,
        longitudeDelta: 0, 
    },
},

const [state, setState] = React.useState(initialMapState);

const CustomMarker = () => (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderColor: "#black",
        borderRadius: 5,
        elevation: 10
      }}
    >
      <Text style={{ color: "black" }}>SwagTown</Text>
    </View>
  );

useEffect(() => {
    getDirections("10", "10")
      .then(coords => setCoords(coords))
      .catch(err => console.log("Something went wrong"));
}, []);

const onMarkerPress = (eventSwag) => {
    const markerID = //godtycklig funktion för att få ut id

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
} 


return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
        >     
        <Marker coordinate={{ latitude: 10, longitude: -10 }} >
            <CustomMarker/>
        </Marker>
      </MapView>
    </View>
  );
};