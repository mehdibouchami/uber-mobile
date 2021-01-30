import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, InteractionManager, Alert } from 'react-native';
import call from 'react-native-phone-call';
import { Icon } from "native-base";


const Marker = MapView.Marker
const Loading = () => (
  <View style={styles.container}>
    <Text>
      Loading...
    </Text>
  </View>
)
const { width, height } = Dimensions.get("window");

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      taxis: [
        {
          coordinate: {
            latitude: 36.89081068217014,
            longitude: 9.939622879028322,
          },
          title: "Best Place",
          description: "This is the best place in Portland",

        },
        {
          coordinate: {
            latitude: 36.888819929485564,
            longitude: 9.937369823455812,
          },
          title: "Second Best Place",
          description: "This is the second best place in Portland",

        },
        {
          coordinate: {
            latitude: 36.890107059997916,
            longitude: 9.94140386581421,
          },
          title: "Third Best Place",
          description: "This is the third best place in Portland",

        },
        {
          coordinate: {
            latitude: 36.889060195495254,
            longitude: 9.940545558929445,
          },
          title: "Fourth Best Place",
          description: "This is the fourth best place in Portland",

        },
      ],
      region: {
        latitude: 36.89002125197227,
        longitude: 9.939537048339846,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    }

  }
  renderMarkers() {
    return this.state.taxis.map((place, i) => (
      
      <Marker  key={i} title={place.title} coordinate={place.coordinate}
      
      
      onPress={()=> 
        Alert.alert(
          place.title,
          place.description,
          [
            
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Call", onPress: () => call({
              number: '21525597', 
              prompt: false 
            }).catch(console.error) }
          ],
          { cancelable: false }
        )
      }/>
    ))
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    })
  }
  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  render() {
    const { region } = this.state
    return (
      <View style={{ width, height }}>
        {this.state.loading ? (
          <Loading />
        ) : (
            <MapView
              style={styles.container}
              region={region}
              followUserLocation={true}
              showsUserLocation={true}
              showsMyLocationButton={true}
              onLayout={this.onMapLayout}
            >
              {this.state.isMapReady && this.renderMarkers()}
            </MapView>
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
