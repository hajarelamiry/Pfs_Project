"use client"

import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Edit, Trash2 } from "lucide-react-native"
import { Colors } from "../constants/Colors"
import { StatusBadge } from "./StatusBadge"
import { ActionButton } from "./ActionButton"

interface UserListItemProps {
  user: {
    id: number
    name: string
    email: string
    role: string
    status: "Active" | "Inactive"
  }
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const UserListItem: React.FC<UserListItemProps> = ({ user, onEdit, onDelete }) => {
  const [showActions, setShowActions] = React.useState(false)

  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 2 }]}>{user.name}</Text>
      <Text style={[styles.tableCell, { flex: 2 }]}>{user.email}</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>{user.role}</Text>
      <View style={styles.statusCell}>
        <StatusBadge status={user.status} size="small" />
      </View>
      <View style={[styles.tableCell, { width: 100, flexDirection: "row", justifyContent: "flex-end" }]}>
        <ActionButton icon={Edit} variant="outline" size="small" onPress={() => onEdit(user.id)} />
        <View style={styles.buttonSpacer} />
        <ActionButton icon={Trash2} variant="danger" size="small" onPress={() => onDelete(user.id)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  statusCell: {
    flex: 1,
    alignItems: "flex-start",
  },
  buttonSpacer: {
    width: 8,
  },
})

