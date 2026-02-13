export interface Transaction {
    id: string;
    client: string;
    amount: number;
    date: string;
    status: 'Received' | 'Pending';
}

export interface DemoState {
    finance: {
        monthlyRevenue: number;
        revenueTrend: number; // percentage
        monthlyBurn: number;
        runwayMonths: number;
        cashflowStatus: 'Healthy' | 'Caution' | 'Danger';
        recentTransactions: Transaction[];
    };
    growth: {
        totalPipelineValue: number;
        leadsCount: number;
        inDiscussionCount: number;
        wonCount: number;
        recentLeads: string[];
    };
    team: {
        founderHoursPerWeek: number;
        founderLoadStatus: 'Optimal' | 'High' | 'Overload';
        agents: {
            name: string;
            role: string;
            status: string;
            avatar?: string;
        }[];
        humans: {
            role: string;
            count: number;
        }[];
    };
    sop: {
        recentProcedures: string[];
    };
}

export const DEMO_STATE: DemoState = {
    finance: {
        monthlyRevenue: 15400,
        revenueTrend: 12,
        monthlyBurn: 2100,
        runwayMonths: 18,
        cashflowStatus: 'Healthy',
        recentTransactions: [
            { id: 'tx_1', client: 'Solaris Agency', amount: 4500, date: '2026-02-04', status: 'Received' },
            { id: 'tx_2', client: 'Orbital Law', amount: 3200, date: '2026-02-02', status: 'Received' },
            { id: 'tx_3', client: 'Nexus Health', amount: 7800, date: '2026-01-29', status: 'Received' },
        ],
    },
    growth: {
        totalPipelineValue: 45000,
        leadsCount: 3,
        inDiscussionCount: 2,
        wonCount: 1,
        recentLeads: ['Projet Migration Tech', 'Audit Sécurité IA', 'Design System Solaire'],
    },
    team: {
        founderHoursPerWeek: 15,
        founderLoadStatus: 'Optimal',
        agents: [
            { name: 'Jerry', role: 'Orchestrator', status: 'Synthesizing Data' },
            { name: 'Wonder Woman', role: 'Finance Manager', status: 'Auditing Invoices' },
            { name: 'Batman', role: 'Ops Manager', status: 'System Watch' },
        ],
        humans: [
            { role: 'Architect', count: 1 },
            { role: 'Virtual Assistant', count: 1 },
        ],
    },
    sop: {
        recentProcedures: [
            'Client Onboarding Protocol',
            'Monthly Finance Review',
            'Emergency Server Restart',
        ],
    },
};
