import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import {ArrowLeft, Check, ChevronDown, Mail, Phone, User} from "lucide-react-native";
import React from "react";
import { API_URL } from "../../../../config";
type Role = "ADMIN" | "DRIVER" | "CLIENT"
type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
};

export default function EditUser() {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState<User | null>(null);
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
    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const res = await fetch(`${API_URL}/api/users/getUser/${id}`, {
                    headers: {
                        Authorization: "Basic " + btoa("admin:h200317"),
                    },
                });
                const data = await res.json();
                setUser(data);
            } catch (err) {
                Alert.alert("Erreur", "Impossible de charger les données de l'utilisateur");
            }
        };

        fetchDriver();
    }, [id]);




    const navigateToUsers = () => router.push('/admin/users');


    const handleSave = async () => {
        try {
            const res = await fetch(`${API_URL}/api/users/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa("admin:h200317"),
                },
                body: JSON.stringify(user),
            });

            if (res.ok) {
                Alert.alert("Succès", "Utilisateur mis à jour");
                router.back();
            } else {
                Alert.alert("Erreur", "Échec de la mise à jour");
            }
        } catch (err) {
            Alert.alert("Erreur", "Impossible de mettre à jour l'utilisateur");
        }
    };

    if (!user) {
        return <Text style={{ padding: 20 }}>Chargement...</Text>;
    }
    const handleInputChange = (field: keyof User, value: string) => {
        setUser(prev => prev ? { ...prev, [field]: value } : prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add User</Text>
                <Text style={styles.headerSubtitle}>Create a new user account</Text>
            </View>

            <ScrollView style={styles.formContainer}>
                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Update User Information</Text>

                    {/* First Name */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputIconContainer}>
                            <User stroke="#1E40AF" size={18} />
                        </View>
                        <TextInput
                            style={[styles.input ]}
                            placeholder="First Name"
                            value={user.firstName}
                            onChangeText={(text) => handleInputChange("firstName", text)}
                            placeholderTextColor="#64748B"
                        />
                    </View>
                    {/* Last Name */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputIconContainer}>
                            <User stroke="#1E40AF" size={18} />
                        </View>
                        <TextInput
                            style={[styles.input]}
                            placeholder="Last Name"
                            onChangeText={(text) => handleInputChange("lastName", text)}
                            value={user.lastName}
                            placeholderTextColor="#64748B"
                        />
                    </View>
                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputIconContainer}>
                            <Mail stroke="#1E40AF" size={18} />
                        </View>
                        <TextInput
                            style={[styles.input]}
                            placeholder="Email Address"
                            value={user.email}
                            keyboardType="email-address"
                            onChangeText={(text) => handleInputChange("email", text)}
                            autoCapitalize="none"
                            placeholderTextColor="#64748B"
                        />
                    </View>
                    {/* Role Dropdown */}
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.dropdownLabel}>Role</Text>
                        <View style={[styles.dropdown, { backgroundColor: "#E2E8F0" }]}>
                            <Text style={[styles.dropdownText, { color: "#64748B" }]}>
                                {getRoleLabel(user.role)}
                            </Text>
                        </View>
                    </View>


                    {/* Phone Number (only for drivers) */}
                    {user.role === "DRIVER" && (
                        <>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputIconContainer}>
                                    <Phone stroke="#1E40AF" size={18} />
                                </View>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder="Phone Number"
                                    value={user.phone}
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#64748B"
                                />
                            </View>
                             </>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelButton} onPress={navigateToUsers}>
                    <ArrowLeft stroke="#1E40AF" size={18} />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                    <Check stroke="#FFFFFF" size={18} />
                    <Text style={styles.submitButtonText}>Save User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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