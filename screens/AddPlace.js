import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  // {place} = second param for navigate

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
