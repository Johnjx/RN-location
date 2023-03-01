import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm({ onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  function titleChangeHandler(text) {
    setEnteredTitle(text);
  }

  function imageTakenHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, selectedLocation);

    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        {/* Text label */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={imageTakenHandler} />
      <LocationPicker onLocationPick={locationPickedHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700,
    backgroundColor: Colors.primary100,
  },
});
