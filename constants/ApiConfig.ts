import { Platform } from 'react-native';

// Configuration de l'API
export const API_CONFIG = {
    // URL de base de l'API - Utilise l'URL ngrok pour le mobile
    BASE_URL: Platform.OS === 'web' 
        ? 'http://localhost:8081'
        : 'https://votre-url-ngrok.ngrok.io',  // Remplacez par votre URL ngrok
    
    // Informations d'authentification
    AUTH: {
        USERNAME: 'admin',
        PASSWORD: 'h200317',
        getAuthHeader: () => {
            return {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${API_CONFIG.AUTH.USERNAME}:${API_CONFIG.AUTH.PASSWORD}`),
                'Accept': 'application/json'
            }
        }
    },
    
    // Endpoints de l'API
    ENDPOINTS: {
        // Gestion des bus
        BUS: {
            LIST: '/api/buses/allBuses',
            CREATE: '/api/buses/add',
            UPDATE: (id: string) => `/api/buses/update/${id}`,
            DELETE: (id: string) => `/api/buses/bus/${id}`,
            GET_BY_ID: (id: string) => `/api/buses/getBus/${id}`,
            TYPES: '/api/buses/types',
            COUNT: '/api/buses/count'
        },
        
        // Gestion des conducteurs
        DRIVER: {
            LIST: '/api/drivers/getDrivers',
            ALL_DRIVERS: '/api/drivers/Alldrivers',
            CREATE: '/api/drivers/add',
            UPDATE: (id: string) => `/api/drivers/update/${id}`,
            DELETE: (id: string) => `/api/drivers/delete/${id}`,
            GET_BY_ID: (id: string) => `/api/drivers/getDriver/${id}`
        },
        
        // Gestion des utilisateurs
        USER: {
            LIST: '/api/users/allUsers',
            CREATE: '/api/users/addUser',
            UPDATE: (id: string) => `/api/users/update/${id}`,
            DELETE: (id: string) => `/api/users/delete/${id}`,
            GET_BY_ID: (id: string) => `/api/users/getUser/${id}`
        }
    }
};

// Fonction utilitaire pour construire les URLs complètes
export const getApiUrl = (endpoint: string): string => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    console.log('Request URL:', url); // Log pour le débogage
    return url;
};

// Fonction utilitaire pour faire des requêtes API avec l'authentification
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    try {
        const url = getApiUrl(endpoint);
        const headers = API_CONFIG.AUTH.getAuthHeader();
        
        console.log('Making request to:', url);
        console.log('With headers:', headers);
        
        const response = await fetch(url, {
            ...options,
            headers: {
                ...headers,
                ...options.headers
            }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        return response;
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
}; 