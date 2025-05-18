import type React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

interface ActionButtonProps {
  label?: string
  icon?: React.ElementType
  variant?: "primary" | "secondary" | "outline" | "danger"
  onPress: () => void
  size?: "small" | "medium" | "large"
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  variant = "primary",
  onPress,
  size = "medium",
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButton
      case "secondary":
        return styles.secondaryButton
      case "outline":
        return styles.outlineButton
      case "danger":
        return styles.dangerButton
      default:
        return styles.primaryButton
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButtonText
      case "secondary":
        return styles.secondaryButtonText
      case "outline":
        return styles.outlineButtonText
      case "danger":
        return styles.dangerButtonText
      default:
        return styles.primaryButtonText
    }
  }

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.smallButton
      case "medium":
        return styles.mediumButton
      case "large":
        return styles.largeButton
      default:
        return styles.mediumButton
    }
  }

  return (
    <TouchableOpacity style={[styles.button, getButtonStyle(), getSizeStyle()]} onPress={onPress}>
      {Icon && (
        <Icon
          stroke={
            variant === "outline"
              ? Colors.primary.main
              : variant === "danger"
                ? Colors.status.error.text
                : Colors.primary.contrastText
          }
          size={size === "small" ? 16 : 18}
          style={label ? styles.buttonIcon : undefined}
        />
      )}
      {label && <Text style={getTextStyle()}>{label}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 6,
  },
  primaryButton: {
    backgroundColor: Colors.primary.main,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary.main,
  },
  outlineButton: {
    backgroundColor: Colors.background.sidebar,
    borderWidth: 1,
    borderColor: Colors.primary.main,
  },
  dangerButton: {
    backgroundColor: Colors.status.error.background,
  },
  primaryButtonText: {
    color: Colors.primary.contrastText,
    fontWeight: "500",
  },
  secondaryButtonText: {
    color: Colors.primary.contrastText,
    fontWeight: "500",
  },
  outlineButtonText: {
    color: Colors.primary.main,
    fontWeight: "500",
  },
  dangerButtonText: {
    color: Colors.status.error.text,
    fontWeight: "500",
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  mediumButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  largeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
})

