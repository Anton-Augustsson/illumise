import React, {useState} from 'react';
import {colors} from "../../mainStyles/colors"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
  
const GooglePlaces = ({placeholder, ...props}) => {
    const [searching, setSearching] = useState(false);
    return (
        <GooglePlacesAutocomplete
            {...props}
            styles={{
                container: {

                },
                textInput: {
                    paddingLeft:10,
                    paddingRight:10,
                    paddingTop:5,
                    paddingBottom:5,
                    borderWidth:2,
                    borderStyle:"solid",
                    borderColor:colors.INPUT_BORDER,
                    borderRadius:10,
                    marginTop:5,
                    marginBottom:5,
                    elevation:5,
                    backgroundColor:"white",
                },
                row:{
                    padding:10,
                    borderBottomWidth:0.5,
                },
                poweredContainer: {
                    display:"none",
                }
            }}
            suppressDefaultStyles={true}
            query={{
                key: 'AIzaSyDbo3G-e4dC5IJfAvJ6S_0j_AsiO6Ewc8Q',
                language: 'se',
                components: 'country:se',
            }}
        />
    );

}

export default GooglePlaces;