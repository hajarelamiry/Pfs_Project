"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Search, Filter, MoreVertical, Edit, Trash2, UserPlus, ChevronLeft, ChevronRight } from "lucide-react-native"

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for users
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", status: "Active" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "Driver", status: "Inactive" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "User", status: "Active" },
    { id: 5, name: "Michael Brown", email: "michael.b@example.com", role: "Admin", status: "Active" },
    { id: 6, name: "Sarah Wilson", email: "sarah.w@example.com", role: "Driver", status: "Active" },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Management</Text>
        <Text style={styles.headerSubtitle}>Manage your system users</Text>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.searchContainer}>
          <Search stroke="#64748B" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#64748B"
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter stroke="#1E40AF" size={18} />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton}>
            <UserPlus stroke="#FFFFFF" size={18} />
            <Text style={styles.addButtonText}>Add User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Name</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Email</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Role</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Status</Text>
        <Text style={[styles.tableHeaderCell, { width: 50 }]}>Actions</Text>
      </View>

      <ScrollView style={styles.tableContainer}>
        {users.map((user) => (
          <View key={user.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{user.name}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{user.email}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{user.role}</Text>
            <View
              style={[styles.statusContainer, { backgroundColor: user.status === "Active" ? "#EFF6FF" : "#FEF2F2" }]}
            >
              <Text style={[styles.statusText, { color: user.status === "Active" ? "#1E40AF" : "#DC2626" }]}>
                {user.status}
              </Text>
            </View>
            <View style={[styles.tableCell, { width: 50, flexDirection: "row" }]}>
              <TouchableOpacity style={styles.actionButton}>
                <MoreVertical stroke="#64748B" size={18} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.paginationContainer}>
        <TouchableOpacity style={styles.paginationButton}>
          <ChevronLeft stroke="#1E40AF" size={20} />
        </TouchableOpacity>

        <View style={styles.paginationNumbers}>
          <TouchableOpacity style={[styles.paginationNumber, styles.activePaginationNumber]}>
            <Text style={styles.activePaginationNumberText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationNumber}>
            <Text style={styles.paginationNumberText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationNumber}>
            <Text style={styles.paginationNumberText}>3</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.paginationButton}>
          <ChevronRight stroke="#1E40AF" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.userActionSheet}>
        <TouchableOpacity style={styles.userActionButton}>
          <Edit stroke="#1E40AF" size={16} />
          <Text style={styles.userActionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.userActionButton, styles.deleteButton]}>
          <Trash2 stroke="#DC2626" size={16} />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  actionsContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
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
    color: "#1E293B",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterButtonText: {
    color: "#1E40AF",
    marginLeft: 6,
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E40AF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontWeight: "500",
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tableHeaderCell: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  tableCell: {
    fontSize: 14,
    color: "#1E293B",
  },
  statusContainer: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  actionButton: {
    padding: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  paginationButton: {
    padding: 8,
  },
  paginationNumbers: {
    flexDirection: "row",
    marginHorizontal: 16,
  },
  paginationNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  paginationNumberText: {
    color: "#1E293B",
  },
  activePaginationNumber: {
    backgroundColor: "#1E40AF",
  },
  activePaginationNumberText: {
    color: "#FFFFFF",
  },
  userActionSheet: {
    position: "absolute",
    right: 16,
    top: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    width: 120,
    display: "none", // Hidden by default, would be shown on action button press
  },
  userActionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
  },
  userActionText: {
    marginLeft: 8,
    color: "#1E293B",
  },
  deleteButton: {
    marginTop: 4,
  },
  deleteButtonText: {
    marginLeft: 8,
    color: "#DC2626",
  },
})

