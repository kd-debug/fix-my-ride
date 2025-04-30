/// <reference types="vite/client" />

declare module '@/services/mechanicService' {
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

    export const getApprovedMechanics: () => Promise<Mechanic[]>;
    export const applyAsMechanic: (applicationData: MechanicApplication) => Promise<void>;
}
