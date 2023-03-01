import { Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}> {children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    backgroundColor: Colors.primary800,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.primary50,
  },
});
