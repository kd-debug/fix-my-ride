import api from './api';

export interface Mechanic {
    id: string;
    name: string;
    email: string;
    phone: string;
    experience: string;
    certification: string;
    completedJobs: number;
}

export interface MechanicApplication {
    name: string;
    email: string;
    phone: string;
    address: string;
    experience: string;
    certification: string;
}

export const getApprovedMechanics = async (): Promise<Mechanic[]> => {
    try {
        const response = await api.get<Mechanic[]>('/mechanics');
        return response.data;
    } catch (error) {
        console.error('Error fetching approved mechanics:', error);
        throw error;
    }
};

export const applyAsMechanic = async (applicationData: MechanicApplication): Promise<void> => {
    try {
        await api.post('/mechanics/apply', applicationData);
    } catch (error) {
        console.error('Error applying as mechanic:', error);
        throw error;
    }
}; 