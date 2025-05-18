import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import { Play, Square } from "lucide-react-native"

interface StartTripButtonProps {
  isActive: boolean
  onStart: () => void
  onEnd: () => void
}

export default function StartTripButton({ isActive, onStart, onEnd }: StartTripButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, isActive ? styles.endButton : styles.startButton]}
      onPress={isActive ? onEnd : onStart}
    >
      <View style={styles.buttonContent}>
        {isActive ? <Square size={24} color="#fff" /> : <Play size={24} color="#fff" />}
        <Text style={styles.buttonText}>{isActive ? "Terminer le trajet" : "Commencer le trajet"}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startButton: {
    backgroundColor: "#0070f3",
  },
  endButton: {
    backgroundColor: "#f44336",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})
