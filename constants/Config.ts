// Configuration des URLs de l'API
export const API_CONFIG = {
    // URL de base de l'API
    BASE_URL: 'http://localhost:8081',
    
    // Endpoints de l'API
    ENDPOINTS: {
        // Gestion des bus
        BUS: {
            LIST: '/api/bus',
            CREATE: '/api/bus',
            UPDATE: (id: string) => `/api/bus/${id}`,
            DELETE: (id: string) => `/api/bus/${id}`,
            GET_BY_ID: (id: string) => `/api/bus/${id}`,
        },
        
        // Gestion des conducteurs
        DRIVER: {
            LIST: '/api/driver',
            CREATE: '/api/driver',
            UPDATE: (id: string) => `/api/driver/${id}`,
            DELETE: (id: string) => `/api/driver/${id}`,
            GET_BY_ID: (id: string) => `/api/driver/${id}`,
        },
        
        // Gestion des utilisateurs
        USER: {
            LOGIN: '/api/auth/login',
            REGISTER: '/api/auth/register',
            PROFILE: '/api/user/profile',
            UPDATE_PROFILE: '/api/user/profile',
        },
        
        // Gestion des trajets
        ROUTE: {
            LIST: '/api/route',
            CREATE: '/api/route',
            UPDATE: (id: string) => `/api/route/${id}`,
            DELETE: (id: string) => `/api/route/${id}`,
            GET_BY_ID: (id: string) => `/api/route/${id}`,
        }
    }
};

// Fonction utilitaire pour construire les URLs complètes
export const getApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 