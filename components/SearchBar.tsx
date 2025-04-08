import type React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import { Search } from "lucide-react-native"
import { Colors } from "../constants/Colors"

interface SearchBarProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <Search stroke={Colors.secondary.main} size={20} style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.secondary.main}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background.input,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: Colors.text.primary,
  },
})

