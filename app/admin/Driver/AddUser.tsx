"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { ArrowLeft, User, Mail, Phone, Check, ChevronDown } from "lucide-react-native"
import {router} from "expo-router";
import React from "react";
import { API_URL } from "../../../config";

type Role = "ADMIN" | "DRIVER" | "CLIENT"

type UserFormData = {
    firstName: string
    lastName: string
    email: string
    role: Role
    phone: string
}

export default function AddUserForm({ onCancel }: { onCancel?: () => void }) {
    const [formData, setFormData] = useState<UserFormData>({
        firstName: "",
        lastName: "",
        email: "",
        role: "CLIENT",
        phone: "",
    })
    const navigateToUsers = () => router.push('/admin/users');
    const [showRoleDropdown, setShowRoleDropdown] = useState(false)
    const [errors, setErrors] = useState<Partial<UserFormData>>({})

    const handleChange = (field: keyof UserFormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }))
        }
    }

    const selectRole = (role: Role) => {
        setFormData((prev) => ({ ...prev, role }))
        setShowRoleDropdown(false)
        if (errors.role) {
            setErrors((prev) => ({
                ...prev,
                role: undefined,
            }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<UserFormData> = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (formData.role === "DRIVER" && !formData.phone.trim()) {
            newErrors.phone = "Phone number is required for drivers"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }
        try {
            const response = await fetch(`${API_URL}/api/users/addUser`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa("admin:h200317")
              },
              body: JSON.stringify(formData)
            })

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }else{
                const data = await response.text()
                Alert.alert("Success", "User added successfully")
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    role: "CLIENT",
                    phone: "",
                })
            }
        } catch (err) {
            console.error("Error adding user:", err)
            Alert.alert("Error", "Failed to add user")
        }
    }

    const getRoleLabel = (role: Role): string => {
        switch (role) {
            case "ADMIN":
                return "Admin"
            case "DRIVER":
                return "DRIVER"
            case "CLIENT":
                return "CLIENT"
            default:
                return "Select role"
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add User</Text>
                <Text style={styles.headerSubtitle}>Create a new user account</Text>
            </View>

            <ScrollView style={styles.formContainer}>
                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>User Information</Text>

                    {/* First Name */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputIconContainer}>
                            <User stroke="#1E40AF" size={18} />
                        </View>
                        <TextInput
                            style={[styles.input, errors.firstName ? styles.inputError : null]}
                            placeholder="First Name"
                            value={formData.firstName}
                            onChangeText={(value) => handleChange("firstName", value)}
                            placeholderTextColor="#64748B"
                        />
                    </View>
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                    {/* Last Name */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputIconContainer}>
                            <User stroke="#1E40AF" size={18} />
                        </View>
                        <TextInput
                            style={[styles.input, errors.lastName ? styles.inputError : null]}
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChangeText={(value) => handleChange("lastName", value)}
                            placeholderTextColor="#64748B"
                        />
                    </View>
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputIconContainer}>
                            <Mail stroke="#1E40AF" size={18} />
                        </View>
                        <TextInput
                            style={[styles.input, errors.email ? styles.inputError : null]}
                            placeholder="Email Address"
                            value={formData.email}
                            onChangeText={(value) => handleChange("email", value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#64748B"
                        />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                    {/* Role Dropdown */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownLabel}>Role</Text>
                        <TouchableOpacity style={styles.dropdown} onPress={() => setShowRoleDropdown(!showRoleDropdown)}>
                            <Text style={styles.dropdownText}>{getRoleLabel(formData.role)}</Text>
                            <ChevronDown stroke="#64748B" size={18} />
                        </TouchableOpacity>

                        {showRoleDropdown && (
                            <View style={styles.dropdownList}>
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectRole("ADMIN")}>
                                    <Text style={[styles.dropdownItemText, formData.role === "ADMIN" ? styles.selectedItemText : null]}>
                                        ADMIN
                                    </Text>
                                    {formData.role === "ADMIN" && <Check size={16} stroke="#1E40AF" />}
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectRole("DRIVER")}>
                                    <Text style={[styles.dropdownItemText, formData.role === "DRIVER" ? styles.selectedItemText : null]}>
                                        DRIVER
                                    </Text>
                                    {formData.role === "DRIVER" && <Check size={16} stroke="#1E40AF" />}
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectRole("CLIENT")}>
                                    <Text style={[styles.dropdownItemText, formData.role === "CLIENT" ? styles.selectedItemText : null]}>
                                        CLIENT
                                    </Text>
                                    {formData.role === "CLIENT" && <Check size={16} stroke="#1E40AF" />}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Phone Number (only for drivers) */}
                    {formData.role === "DRIVER" && (
                        <>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputIconContainer}>
                                    <Phone stroke="#1E40AF" size={18} />
                                </View>
                                <TextInput
                                    style={[styles.input, errors.phone ? styles.inputError : null]}
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChangeText={(value) => handleChange("phone", value)}
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#64748B"
                                />
                            </View>
                            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                        </>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelButton} onPress={navigateToUsers}>
                    <ArrowLeft stroke="#1E40AF" size={18} />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Check stroke="#FFFFFF" size={18} />
                    <Text style={styles.submitButtonText}>Save User</Text>
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
    formContainer: {
        flex: 1,
        padding: 16,
    },
    formSection: {
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 16,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
    },
    inputIconContainer: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EFF6FF",
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 12,
        color: "#1E293B",
    },
    inputError: {
        borderWidth: 1,
        borderColor: "#DC2626",
    },
    errorText: {
        color: "#DC2626",
        fontSize: 12,
        marginTop: -8,
        marginBottom: 12,
        marginLeft: 4,
    },
    dropdownContainer: {
        marginBottom: 16,
        position: "relative",
    },
    dropdownLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1E293B",
        marginBottom: 8,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F1F5F9",
        borderRadius: 8,
        padding: 12,
        height: 48,
    },
    dropdownText: {
        fontSize: 14,
        color: "#1E293B",
    },
    dropdownList: {
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        zIndex: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    dropdownItemText: {
        fontSize: 14,
        color: "#1E293B",
    },
    selectedItemText: {
        color: "#1E40AF",
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },
    cancelButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EFF6FF",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    cancelButtonText: {
        color: "#1E40AF",
        marginLeft: 8,
        fontWeight: "500",
    },
    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E40AF",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    submitButtonText: {
        color: "#FFFFFF",
        marginLeft: 8,
        fontWeight: "500",
    },
})
