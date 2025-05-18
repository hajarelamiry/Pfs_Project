// components/QuickAccessCard.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface QuickAccessCardProps {
  icon: React.ReactNode;
  label: string;
  screenName: string;
  style?: ViewStyle;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ icon, label, screenName, style }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => navigation.navigate(screenName as never)}
    >
      {icon}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    flexDirection: 'column',
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default QuickAccessCard;
