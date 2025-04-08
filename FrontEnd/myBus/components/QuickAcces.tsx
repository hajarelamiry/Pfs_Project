import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Users, Bus, BarChart2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function QuickAccess() {
  const router = useRouter();

  const navigateToUsers = () => router.push('../admin/users');
  const navigateToBuses = () => router.push('../admin/buses');
  const navigateToStatistics = () => router.push('../admin/statistics');

  return (
    <View style={styles.quickAccessContainer}>
      <TouchableOpacity style={styles.quickAccessCard} onPress={navigateToUsers}>
        <Users stroke="#1E40AF" size={24} />
        <Text style={styles.quickAccessText}>Users</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quickAccessCard} onPress={navigateToBuses}>
        <Bus stroke="#1E40AF" size={24} />
        <Text style={styles.quickAccessText}>Buses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quickAccessCard} onPress={navigateToStatistics}>
        <BarChart2 stroke="#1E40AF" size={24} />
        <Text style={styles.quickAccessText}>Statistics</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quickAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  quickAccessCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAccessText: {
    marginTop: 8,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
});
