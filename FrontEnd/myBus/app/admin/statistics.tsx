"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { TrendingUp, Users, Bus, Calendar, ArrowUp, ArrowDown, Filter } from "lucide-react-native"
import { LineChart, BarChart, PieChart } from "react-native-chart-kit"

export default function Statistics() {
  const [activeTab, setActiveTab] = useState("overview")
  const screenWidth = Dimensions.get("window").width - 40

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF", 
    color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  }

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["User Growth"],
  }

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  }

  const pieChartData = [
    {
      name: "Downtown",
      population: 45,
      color: "#1E40AF",
      legendFontColor: "#1E293B",
      legendFontSize: 12,
    },
    {
      name: "Airport",
      population: 28,
      color: "#3B82F6",
      legendFontColor: "#1E293B",
      legendFontSize: 12,
    },
    {
      name: "Suburbs",
      population: 17,
      color: "#93C5FD",
      legendFontColor: "#1E293B",
      legendFontSize: 12,
    },
    {
      name: "Business",
      population: 10,
      color: "#BFDBFE",
      legendFontColor: "#1E293B",
      legendFontSize: 12,
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Text style={styles.headerSubtitle}>Analytics and reports</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "overview" && styles.activeTab]}
          onPress={() => setActiveTab("overview")}
        >
          <Text style={[styles.tabText, activeTab === "overview" && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "users" && styles.activeTab]}
          onPress={() => setActiveTab("users")}
        >
          <Text style={[styles.tabText, activeTab === "users" && styles.activeTabText]}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "buses" && styles.activeTab]}
          onPress={() => setActiveTab("buses")}
        >
          <Text style={[styles.tabText, activeTab === "buses" && styles.activeTabText]}>Buses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "routes" && styles.activeTab]}
          onPress={() => setActiveTab("routes")}
        >
          <Text style={[styles.tabText, activeTab === "routes" && styles.activeTabText]}>Routes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Calendar stroke="#1E40AF" size={16} />
          <Text style={styles.filterButtonText}>Last 30 days</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterIconButton}>
          <Filter stroke="#1E40AF" size={16} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Total Users</Text>
              <View style={[styles.statBadge, styles.increaseBadge]}>
                <ArrowUp size={12} stroke="#22C55E" />
                <Text style={styles.increaseBadgeText}>12%</Text>
              </View>
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>1,254</Text>
              <Users stroke="#1E40AF" size={24} />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Active Buses</Text>
              <View style={[styles.statBadge, styles.decreaseBadge]}>
                <ArrowDown size={12} stroke="#DC2626" />
                <Text style={styles.decreaseBadgeText}>3%</Text>
              </View>
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>42</Text>
              <Bus stroke="#1E40AF" size={24} />
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Daily Trips</Text>
              <View style={[styles.statBadge, styles.increaseBadge]}>
                <ArrowUp size={12} stroke="#22C55E" />
                <Text style={styles.increaseBadgeText}>8%</Text>
              </View>
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>186</Text>
              <TrendingUp stroke="#1E40AF" size={24} />
            </View>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>User Growth</Text>
          <Text style={styles.chartSubtitle}>Monthly user registrations</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Daily Bus Activity</Text>
          <Text style={styles.chartSubtitle}>Number of active buses per day</Text>
          <BarChart
            data={barChartData}
            width={screenWidth}
            height={220}
            yAxisLabel="" 
            yAxisSuffix=" buses"
            chartConfig={chartConfig}
            style={styles.chart}
            fromZero
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Route Distribution</Text>
          <Text style={styles.chartSubtitle}>Percentage of buses by route area</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </ScrollView>
    </View>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#1E40AF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },
  activeTabText: {
    color: "#1E40AF",
  },
  filterContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  filterButtonText: {
    color: "#1E40AF",
    marginLeft: 6,
    fontWeight: "500",
  },
  filterIconButton: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    width: "31%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 12,
    color: "#64748B",
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  increaseBadge: {
    backgroundColor: "#DCFCE7",
  },
  decreaseBadge: {
    backgroundColor: "#FEE2E2",
  },
  increaseBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#22C55E",
    marginLeft: 2,
  },
  decreaseBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#DC2626",
    marginLeft: 2,
  },
  statContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
  },
  chartSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
})

