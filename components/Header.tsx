import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

interface HeaderProps {
  title: string
  subtitle?: string
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: Colors.primary.main,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary.contrastText,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 5,
  },
})

