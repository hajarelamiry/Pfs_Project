"use client"

import {useEffect, useState} from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, TouchableWithoutFeedback } from "react-native"
import { Search, Filter, MoreVertical, Edit, Trash2, UserPlus, ChevronLeft, ChevronRight } from "lucide-react-native"
import {useIsFocused} from "@react-navigation/core";
import {router} from "expo-router";
type Driver={
  id:number,
  firstName:string,
  lastName:string,
  email: string,
  role: string,
  phone:string
}
export default function UsersManagement() {
  const [drivers,setDrivers]=useState([])
  const isFocused = useIsFocused()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigateToAddUser=()=>{router.push("/admin/Driver/AddUser")}
  const handleEdit = (driver: Driver) => {
    router.push(`/admin/Driver/Edit/${driver.id}`)
  }
  const handleDelete = async (id: number) => {
    Alert.alert(
        "Confirmer la suppression",
        "Voulez-vous vraiment supprimer cet utilisateur ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Supprimer",
            onPress: async () => {
              try {
                const res = await fetch(
                    `http://100.89.162.239:8003/api/users/delete/${id}`,
                    {
                      method: "DELETE",
                      headers: {
                        Authorization: "Basic " + btoa("admin:h200317"),
                      },
                    }
                );
                if (res.ok) {
                  Alert.alert("Succes", "Utilisateur supprime");
                  countFun();
                } else {
                  Alert.alert("Erreur", "echec hors de la suppression");
                }
              } catch (err) {
                Alert.alert("Erreur", "Impossible de supprimer l'utilisateur");
              }
            },
            style: "destructive",
          },
        ]
    );
  }
  const countFun = async () => {
    try {
      const response = await fetch("http://100.89.162.239:8003/api/users/allUsers", {
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
      setDrivers(data)
      setFilteredData(data)
    } catch (err) {
      console.error("Error", err)
    }
  }
  useEffect(() => {
    if (isFocused) {
      countFun()
    }
  }, [isFocused])
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = drivers.filter((driver: Driver) => {
      const fullName = `${driver.firstName} ${driver.lastName}`.toLowerCase();
      return fullName.includes(text.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const handleCloseMenu = () => {
    setSelectedUserId(null);
  };
  return (
      <TouchableWithoutFeedback onPress={handleCloseMenu}>
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
            onChangeText={handleSearch}
            placeholderTextColor="#64748B"
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter stroke="#1E40AF" size={18} />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={navigateToAddUser}>
            <UserPlus stroke="#FFFFFF" size={18} />
            <Text style={styles.addButtonText}>Add User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Name</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Role</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Email</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Phone</Text>
        <Text style={[styles.tableHeaderCell, { width: 50 }]}>Actions</Text>
      </View>

      <ScrollView style={styles.tableContainer}>
        {filteredData.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#0465f3' }}>No Drivers Found.</Text>
            ):
            (filteredData.map((driver:Driver) => (
          <View key={driver.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>{driver.firstName} {driver.lastName}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{driver.role}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{driver.email}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{driver.phone}</Text>
            <View style={[styles.tableCell, { width: 50, flexDirection: "row" }]}>
              <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setSelectedUserId(driver.id)}>
                <MoreVertical stroke="#64748B" size={18} />
              </TouchableOpacity>
              {selectedUserId === driver.id && (
                  <View style={styles.userActionSheet}>
                    <TouchableOpacity style={styles.userActionButton} onPress={() => handleEdit(driver)}>
                      <Edit stroke="#1E40AF" size={16} />
                      <Text style={styles.userActionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.userActionButton, styles.deleteButton]}
                        onPress={() => handleDelete(driver.id)}
                    >
                      <Trash2 stroke="#DC2626" size={16} />
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
              )}
            </View>
          </View>
        )))}
      </ScrollView>




    </View>
      </TouchableWithoutFeedback>
  )
};

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
    position: "relative",
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
    top: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    width: 120,
    zIndex: 10,
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

