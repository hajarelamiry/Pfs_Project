"use client"
import { useEffect, useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import {View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity, Switch, StyleSheet} from "react-native"
import axios from "axios"
import {ArrowLeft, Battery, Bus, Check, ChevronDown, Shield, Wifi} from "lucide-react-native";

type BusType = {
    id: string
    name: string
}
interface Statut {
    id: number;
    label: string;
}
type Driver = {
    id: string
    firstName: string
    lastName: string
}

export default function EditBus({onCancel}: { onCancel?: () => void }) {
    const router = useRouter();
    const navigateToBuses = () => router.push('/admin/buses');
    const [formData, setFormData] = useState({
        busTypeId: "",
        driverId: "",
        capacity: "",
        wifi: false,
        charging: false,
        security: false,
        statut:""
    })
    const [busTypes, setBusTypes] = useState<BusType[]>([])
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [showBusTypeDropdown, setShowBusTypeDropdown] = useState(false)
    const [showDriverDropdown, setShowDriverDropdown] = useState(false)
    const [selectedBusType, setSelectedBusType] = useState<BusType | null>(null)
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Statut | null>(null);

    const statuses: Statut[] = [
        {id: 1, label: 'In service'},
        {id: 2, label: 'Out of service'},
        {id: 3, label: 'Under maintenance'}
    ];

    const selectBusType = (busType: BusType) => {
        setSelectedBusType(busType)
        setFormData((prev) => ({...prev, busTypeId: busType.id}))
        setShowBusTypeDropdown(false)
    }

    const selectDriver = (driver: Driver) => {
        setSelectedDriver(driver)
        setFormData((prev) => ({...prev, driverId: driver.id}))
        setShowDriverDropdown(false)
    }

    const selectStatus = (statut: Statut) => {
        console.log("Selected status:", statut);
        setSelectedStatus(statut);
        setFormData((prev) => ({
            ...prev,
            statut: statut.label,
        }));
        setShowStatusDropdown(false);
    };

    const { id } = useLocalSearchParams()
    const [bus, setBus] = useState<any>(null)

    useEffect(() => {
        fetchBusDetails()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const driverRes = await fetch("http://100.89.162.239:8003/api/drivers/getDrivers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + btoa("admin:h200317")
                    },
                });

                const busTypeRes = await fetch("http://100.89.162.239:8003/api/buses/types", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + btoa("admin:h200317")
                    },
                });

                const driverText = await driverRes.text();
                const busTypeText = await busTypeRes.text();

                console.log("Drivers response:", driverText);
                console.log("Bus Types response:", busTypeText);

                if (driverText) {
                    const driversData = JSON.parse(driverText);
                    setDrivers(driversData);
                } else {
                    console.error("No data for drivers");
                }

                if (busTypeText) {
                    const busTypesData = JSON.parse(busTypeText);
                    setBusTypes(busTypesData);
                } else {
                    console.error("No data for bus types");
                }

            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchData()
    }, [])

    const fetchBusDetails = async () => {
        try {
            const response = await axios.get(`http://100.89.162.239:8003/api/buses/getBus/${id}`, {
                headers: {
                    Authorization: "Basic " + btoa("admin:h200317"),
                },
            })
            setBus(response.data)
            setFormData({
                busTypeId: response.data.busType?.id || "",
                driverId: response.data.driver?.id || "",
                capacity: response.data.capacity?.toString() || "",
                wifi: response.data.wifi || false,
                charging: response.data.charging || false,
                security: response.data.security || false,
                statut: response.data.statut || "",
            });
            if (onCancel) onCancel();
        } catch (error) {
            Alert.alert("Error", "Unable to load bus")
            console.error(error)
        }
    }

    useEffect(() => {
        if (bus) {
            setFormData({
                busTypeId: bus.busType?.id || "",
                driverId: bus.driver?.id || "",
                capacity: bus.capacity?.toString() || "",
                wifi: bus.wifi || false,
                charging: bus.charging || false,
                security: bus.security || false,
                statut: bus.status || "",
            });
        }
    }, [bus]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://100.89.162.239:8003/api/buses/update/${id}`, {
                busTypeId: formData.busTypeId,
                driverId: formData.driverId,
                capacity: parseInt(formData.capacity),
                wifi: formData.wifi,
                charging: formData.charging,
                security: formData.security,
                statut: formData.statut,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + btoa("admin:h200317"),
                },
            })

            router.push("/admin/buses")
        } catch (error) {
            alert("Unable to update bus")
            console.error(error)
        }
    }

    if (!bus) return <Text>Loading...</Text>

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Update Bus</Text>
            </View>

            <ScrollView style={styles.formContainer}>
                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Basic Information</Text>

                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity style={styles.dropdown} onPress={() => setShowBusTypeDropdown(!showBusTypeDropdown)}>
                            <View style={styles.dropdownSelection}>
                                <Bus stroke="#1E40AF" size={18} style={styles.dropdownIcon} />
                                <Text style={styles.dropdownText}>
                                    {selectedBusType ? selectedBusType.name :`${bus.busType.name}` }
                                </Text>
                            </View>
                            <ChevronDown stroke="#64748B" size={18} />
                        </TouchableOpacity>

                        {showBusTypeDropdown && (
                            <View style={styles.dropdownList}>
                                {busTypes.map((busType) => (
                                    <TouchableOpacity key={busType.id} style={styles.dropdownItem} onPress={() => selectBusType(busType)}>
                                        <Text style={styles.dropdownItemText}>{busType.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Driver selector */}
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity style={styles.dropdown} onPress={() => setShowDriverDropdown(!showDriverDropdown)}>
                            <View style={styles.dropdownSelection}>
                                <Text style={styles.dropdownIcon}>👤</Text>
                               $
                                <Text style={styles.dropdownText}>
                                    {selectedDriver
                                        ? `${selectedDriver.firstName} ${selectedDriver.lastName}`
                                        : bus.driver
                                            ? `${bus.driver.firstName} ${bus.driver.lastName}`
                                            : "no driver"}
                                </Text>

                            </View>
                            <ChevronDown stroke="#64748B" size={18} />
                        </TouchableOpacity>

                        {showDriverDropdown && (
                            <View style={styles.dropdownList}>
                                {drivers.map((driver) => (
                                    <TouchableOpacity key={driver.id} style={styles.dropdownItem} onPress={() => selectDriver(driver)}>
                                        <Text style={styles.dropdownItemText}>
                                            {driver.firstName} {driver.lastName}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Details</Text>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputIconContainer}>
                            <Text style={styles.capacityIcon}>#</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Capacity (seats)"
                            value={formData.capacity}
                            onChangeText={(value) => setFormData((prev) => ({ ...prev, capacity: value }))}
                            keyboardType="numeric"
                            placeholderTextColor="#64748B"
                        />
                    </View>

                    {/* Dropdown for status */}
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity style={styles.dropdown} onPress={() => setShowStatusDropdown(!showStatusDropdown)}>
                            <View style={styles.dropdownSelection}>
                                <Text style={styles.dropdownIcon}>🚍</Text>
                                <Text style={styles.dropdownText} >
                                    {selectedStatus ? selectedStatus.label : `${bus.statut}`}
                                </Text>
                            </View>
                            <ChevronDown stroke="#64748B" size={18} />
                        </TouchableOpacity>

                        {showStatusDropdown && (
                            <View style={styles.dropdownList}>
                                {statuses.map((status) => (
                                    <TouchableOpacity key={status.id} style={styles.dropdownItem} onPress={() => selectStatus(status)}>
                                        <Text style={styles.dropdownItemText}>
                                            {status.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Features</Text>

                    <View style={styles.featureRow}>
                        <View style={styles.featureItem}>
                            <Wifi size={18} stroke="#1E40AF" />
                            <Text style={styles.featureText}>WiFi</Text>
                        </View>
                        <Switch
                            value={formData.wifi}
                            onValueChange={() => setFormData((prev) => ({ ...prev, wifi: !prev.wifi }))}
                            trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
                            thumbColor={formData.wifi ? "#1E40AF" : "#F9FAFB"}
                        />
                    </View>

                    <View style={styles.featureRow}>
                        <View style={styles.featureItem}>
                            <Battery size={18} stroke="#1E40AF" />
                            <Text style={styles.featureText}>Charging</Text>
                        </View>
                        <Switch
                            value={formData.charging}
                            onValueChange={() => setFormData((prev) => ({ ...prev, charging: !prev.charging }))}
                            trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
                            thumbColor={formData.charging ? "#1E40AF" : "#F9FAFB"}
                        />
                    </View>

                    <View style={styles.featureRow}>
                        <View style={styles.featureItem}>
                            <Shield size={18} stroke="#1E40AF" />
                            <Text style={styles.featureText}>Security</Text>
                        </View>
                        <Switch
                            value={formData.security}
                            onValueChange={() => setFormData((prev) => ({ ...prev, security: !prev.security }))}
                            trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }}
                            thumbColor={formData.security ? "#1E40AF" : "#F9FAFB"}
                        />
                    </View>

                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelButton} onPress={navigateToBuses}>
                    <ArrowLeft stroke="#1E40AF" size={18} />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
                    <Check stroke="#FFFFFF" size={18} />
                    <Text style={styles.submitButtonText}>Update</Text>
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
    dropdownContainer: {
        marginBottom: 16,
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
    dropdownSelection: {
        flexDirection: "row",
        alignItems: "center",
    },
    dropdownIcon: {
        marginRight: 12,
    },
    dropdownText: {
        fontSize: 14,
        color: "#000000",
    },
    dropdownList: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginTop: 4,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        maxHeight: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    dropdownItemText: {
        fontSize: 14,
        color: "#1E293B",
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
    capacityIcon: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1E40AF",
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 12,
        color: "#1E293B",
    },
    featureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    featureText: {
        marginLeft: 12,
        fontSize: 14,
        color: "#1E293B",
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