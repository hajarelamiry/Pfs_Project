"use client"
import { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { Users, Bus, TrendingUp } from "lucide-react-native"
import QuickAccess from "../../components/QuickAcces"
import { useIsFocused } from "@react-navigation/core"

type Counts = {
  busCount: number
  driverCount: number
}

export default function Dashboard() {
  const isFocused = useIsFocused()
  const [count, setCount] = useState<Counts | null>(null)

  useEffect(() => {
    const countFun = async () => {
      try {
        const response = await fetch("http://100.89.162.239:8003/api/buses/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("admin:h200317"),
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        setCount(data)
      } catch (err) {
        console.error("Error", err)
      }
    }

    if (isFocused) {
      countFun()
    }
  }, [isFocused])

  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome to your admin panel</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View style={styles.statIconContainer}>
                <Users stroke="#fff" size={24} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{count?.driverCount || 0}</Text>
                <Text style={styles.statLabel}>Total Drivers</Text>
              </View>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View style={styles.statIconContainer}>
                <Bus stroke="#fff" size={24} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{count?.busCount || 0}</Text>
                <Text style={styles.statLabel}>Total Buses</Text>
              </View>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <View style={styles.statIconContainer}>
                <TrendingUp stroke="#fff" size={24} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>89%</Text>
                <Text style={styles.statLabel}>Performance</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Access</Text>
        <QuickAccess />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 20,
    backgroundColor: "#1E40AF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    marginTop: 5,
  },
  statsContainer: {
    padding: 16,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIconContainer: {
    backgroundColor: "#1E40AF",
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statInfo: {
    justifyContent: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E293B",
  },
  statLabel: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
})