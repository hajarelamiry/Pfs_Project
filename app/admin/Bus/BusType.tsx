import * as React from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import {API_URL} from '../../../config'
import { router } from "expo-router";
type Station = {
  name: string;
  positionActuelle: {
    lat: number;
    lng: number;
  };
};

type TypeBus = {
  name: string;
  firstStation: string;
  lastStation: string;
  stations: Station[];
};

type Props = {
  onSubmit: (data: TypeBus) => void;
};

export default function AddTypeBusForm({ onSubmit }: Props) {
  const [selectedCoords, setSelectedCoords] = React.useState<{ latitude: number; longitude: number } | null>(null);
  const [name, setName] = React.useState("");
  const [firstStation, setFirstStation] = React.useState("");
  const [lastStation, setLastStation] = React.useState("");
  const [stations, setStations] = React.useState<Station[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  
  const [showStationForm, setShowStationForm] = React.useState(false);
  const [stationName, setStationName] = React.useState("");
  const [searchTimeout, setSearchTimeout] = React.useState<ReturnType<typeof setTimeout> | null>(null);


  const navigateToBuses = () => router.push('/admin/buses');


  
  const submitToApi = async (typeBusData: TypeBus) => {
    try {
      // Validate data before sending
      if (!typeBusData.name || !typeBusData.firstStation || !typeBusData.lastStation) {
        throw new Error("Tous les champs obligatoires doivent être remplis");
      }

      if (!typeBusData.stations || typeBusData.stations.length === 0) {
        throw new Error("Au moins une station doit être ajoutée");
      }

      // Validate station data
      const invalidStation = typeBusData.stations.find(
        station => !station.name || station.positionActuelle.lat === 0 || station.positionActuelle.lng === 0
      );
      if (invalidStation) {
        throw new Error(`Station invalide: ${invalidStation.name || 'Sans nom'}`);
      }

      console.log("Envoi des données:", JSON.stringify(typeBusData, null, 2));
  
      const response = await fetch(`${API_URL}/api/bustypes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:h200317"),
        },
        body: JSON.stringify(typeBusData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Erreur serveur (${response.status})`;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage += `: ${errorJson.error || errorText}`;
        } catch {
          errorMessage += `: ${errorText}`;
        }
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      Alert.alert("Success", "Bus type added successfully!");
      return result;
    } catch (error) {
      console.error("Erreur API:", error);
      if (error instanceof Error) {
        Alert.alert("Erreur", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred while sending the data.");
      }
      throw error;
    }
  };
  
  const handleAddStation = () => {
    if (stationName.trim() === "") {
      alert("Please enter a station name");
      return;
    }

    const newStation: Station = {
      name: stationName.trim(),
      positionActuelle: {
        lat: selectedCoords?.latitude || 0,
        lng: selectedCoords?.longitude || 0,
      },
    };

    setStations([...stations, newStation]);
    setStationName("");
    setSelectedCoords(null); 
    setShowStationForm(false);
  };

  const handleRemoveStation = (index: number) => {
    const updatedStations = [...stations];
    updatedStations.splice(index, 1);
    setStations(updatedStations);
  };

  const handleSubmit = () => {
    if (name.trim() === "" || firstStation.trim() === "" || lastStation.trim() === "") {
      alert("Please fill in all required fields");
      return;
    }

    if (stations.length < 1) {
      alert("Please add at least one station");
      return;
    }

    const newTypeBus: TypeBus = {
      name,
      firstStation,
      lastStation,
      stations,
    };

    submitToApi(newTypeBus);
  };

  const fetchCoordinatesFromAddress = async (address: string) => {
    if (isSearching) return null;
    
    setIsSearching(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'User-Agent': 'BusRouteApp/1.0',
            'Accept-Language': 'fr',
          },
          signal: controller.signal
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
      } else {
        console.log("No results found for:", address);
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error("The request timed out");
        } else {
          console.error("Geocoding error:", error.message);
        }
      }
      return null;
    } finally {
      setIsSearching(false);
    }
  };

  React.useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    if (stationName.trim() !== "") {
      const timeoutId = setTimeout(async () => {
        const coords = await fetchCoordinatesFromAddress(stationName);
        if (coords) {
          setSelectedCoords(coords);
        }
      }, 1000); 
      
      setSearchTimeout(timeoutId);
    }
    
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [stationName]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Bus Type</Text>

      <Text style={styles.label}>Bus Type Name</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Bus Express"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>First Station</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Station A"
        value={firstStation}
        onChangeText={setFirstStation}
      />

      <Text style={styles.label}>Last Station</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Station Z"
        value={lastStation}
        onChangeText={setLastStation}
      />

      <Text style={styles.sectionTitle}>Stations</
      Text>

      {stations.length > 0 ? (
        <View style={styles.stationsList}>
          {stations.map((station, index) => (
            <View key={index} style={styles.stationItem}>
              <View style={styles.stationInfo}>
                <Text style={styles.stationName}>{station.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveStation(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyMessage}>No stations added</Text>
      )}

      {!showStationForm ? (
        <TouchableOpacity
          style={styles.addStationButton}
          onPress={() => setShowStationForm(true)}
        >
          <Text style={styles.addStationButtonText}>+ Add a station</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.stationForm}>
          <Text style={styles.formTitle}>New station</Text>

          <Text style={styles.label}>Station Name</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Station B"
            value={stationName}
            onChangeText={setStationName}
          />
          
          {isSearching && (
            <Text style={styles.searchingText}>Searching ...</Text>
          )}
          
          {showStationForm && (
            <View style={styles.mapContainer}>
              <Text style={styles.mapInstructions}>
               Enter a name or click on the map to select a location
              </Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 31.6295,
                  longitude: -7.9811,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                region={
                  selectedCoords
                    ? {
                        latitude: selectedCoords.latitude,
                        longitude: selectedCoords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }
                    : undefined
                }
                onPress={(e: MapPressEvent) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  setSelectedCoords({ latitude, longitude });
                }}
              >
                {selectedCoords && <Marker coordinate={selectedCoords} />}
              </MapView>
            </View>
          )}

          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.formButton, styles.cancelButton]}
              onPress={() => {
                setShowStationForm(false);
                setStationName("");
                setSelectedCoords(null);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.formButton, styles.saveButton]}
              onPress={handleAddStation}
            >
              <Text style={styles.saveButtonText}></Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Type Bus</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={navigateToBuses}>
        <Text style={styles.submitButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  stationsList: {
    marginBottom: 15,
  },
  stationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginBottom: 15,
  },
  addStationButton: {
    padding: 12,
    backgroundColor: "#4dabf7",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addStationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  stationForm: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  mapContainer: {
    marginBottom: 15,
  },
  mapInstructions: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
    fontStyle: "italic",
  },
  map: {
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchingText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginBottom: 10,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e9ecef",
    marginRight: 5,
  },
  cancelButtonText: {
    color: "#495057",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#40c057",
    marginLeft: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#228be6",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});