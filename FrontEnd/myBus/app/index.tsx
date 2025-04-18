import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="Client"
        onPress={() => router.push('/client/client')}
      />
      <View style={styles.spacer} />
      <Button
        title="Chauffeur"
        onPress={() => router.push('/driver/DriverDashboard')}
      />
      <View style={styles.spacerSmall} />
      <Button
        title="Admin"
        onPress={() => router.push('/admin/admin')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  spacer: {
    height: 20,
  },
  spacerSmall: {
    height: 10,
  },
});
