import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Users, Bus, Home, TrendingUp, AlertCircle, Clock } from 'lucide-react-native';
import  QuickAccess  from '../../components/QuickAcces'

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome to your admin panel</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Users stroke="#fff" size={24} />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>1,254</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <Bus stroke="#fff" size={24} />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Active Buses</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <TrendingUp stroke="#fff" size={24} />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statValue}>89%</Text>
            <Text style={styles.statLabel}>Performance</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>
      <QuickAccess />


   



      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <View style={styles.activitiesContainer}>
        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <Users stroke="#1E40AF" size={20} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>New User Registered</Text>
            <Text style={styles.activityDescription}>John Doe has registered as a new user</Text>
            <View style={styles.activityTimeContainer}>
              <Clock stroke="#64748B" size={14} />
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <Bus stroke="#1E40AF" size={20} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Bus Added to Fleet</Text>
            <Text style={styles.activityDescription}>Bus #B-42 has been added to the fleet</Text>
            <View style={styles.activityTimeContainer}>
              <Clock stroke="#64748B" size={14} />
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={styles.activityIconContainer}>
            <AlertCircle stroke="#1E40AF" size={20} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>System Alert</Text>
            <Text style={styles.activityDescription}>System maintenance scheduled for tomorrow</Text>
            <View style={styles.activityTimeContainer}>
              <Clock stroke="#64748B" size={14} />
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: '#1E40AF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    backgroundColor: '#1E40AF',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statInfo: {
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
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
  activitiesContainer: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIconContainer: {
    backgroundColor: '#EFF6FF',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  activityDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  activityTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
});
