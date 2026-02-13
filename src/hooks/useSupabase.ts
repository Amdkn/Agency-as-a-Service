import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../database.types';

export function useSOPs() {
    const [sops, setSops] = useState<Database['public']['Tables']['sops']['Row'][]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSops = async () => {
        const { data } = await supabase.from('sops').select('*').order('title');
        if (data) setSops(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchSops();
    }, []);

    const createSop = async (sop: Database['public']['Tables']['sops']['Insert']) => {
        const { error } = await supabase.from('sops').insert(sop);
        if (!error) await fetchSops();
        return { error };
    };

    const updateSop = async (id: string, updates: Database['public']['Tables']['sops']['Update']) => {
        const { error } = await supabase.from('sops').update(updates).eq('id', id);
        if (!error) await fetchSops();
        return { error };
    };

    const deleteSop = async (id: string) => {
        const { error } = await supabase.from('sops').delete().eq('id', id);
        if (!error) await fetchSops();
        return { error };
    };

    return { sops, loading, refreshSops: fetchSops, createSop, updateSop, deleteSop };
}

export function useClients() {
    const [clients, setClients] = useState<Database['public']['Tables']['clients']['Row'][]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        const { data } = await supabase.from('clients').select('*').order('name');
        if (data) setClients(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const getClient = async (id: string) => {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', id)
            .single();
        return { client: data, error };
    };

    const createClient = async (client: Database['public']['Tables']['clients']['Insert']) => {
        const { data, error } = await supabase.from('clients').insert(client).select().single();
        if (!error) await fetchClients();
        return { data, error };
    };

    const updateClient = async (id: string, updates: Database['public']['Tables']['clients']['Update']) => {
        const { data, error } = await supabase.from('clients').update(updates).eq('id', id).select().single();
        if (!error) await fetchClients();
        return { data, error };
    };

    return { clients, loading, getClient, createClient, updateClient, refreshClients: fetchClients };
}

export function useInvoices() {
    const [invoices, setInvoices] = useState<any[]>([]); // TODO: Join with Clients
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('invoices')
            .select('*, clients(name)')
            .order('issued_at', { ascending: false });
        if (data) setInvoices(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const createInvoice = async (invoice: Database['public']['Tables']['invoices']['Insert']) => {
        const { data, error } = await supabase
            .from('invoices')
            .insert(invoice)
            .select()
            .single();

        if (!error) await fetchInvoices();
        return { data, error };
    };

    const getInvoicesByClient = async (clientId: string) => {
        const { data, error } = await supabase
            .from('invoices')
            .select('*')
            .eq('client_id', clientId)
            .order('issued_at', { ascending: false });
        return { invoices: data, error };
    };

    return {
        invoices,
        loading,
        refreshInvoices: fetchInvoices,
        createInvoice,
        getInvoicesByClient
    };
}

export function useTasks() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        const { data } = await supabase
            .from('tasks')
            .select('*, projects(name), sops(id, title)')
            .order('due_date', { ascending: true });

        if (data) setTasks(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, refreshTasks: fetchTasks };
}

export function useCapacityLogs() {
    const [logs, setLogs] = useState<Database['public']['Tables']['capacity_logs']['Row'][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const { data } = await supabase
                .from('capacity_logs')
                .select('*')
                .order('week_start', { ascending: false })
                .limit(5);
            if (data) setLogs(data);
            setLoading(false);
        }
        fetch();
    }, []);

    return { logs, loading };
}

export function useProfile() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                if (data) setProfile(data);
            }
            setLoading(false);
        }
        fetch();
    }, []);

    return { profile, loading };
}

export function usePeople() {
    const [people, setPeople] = useState<Database['public']['Tables']['profiles']['Row'][]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPeople = async () => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .order('full_name');
        if (data) setPeople(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPeople();
    }, []);

    return { people, loading, refreshPeople: fetchPeople };
}

export function useLeads() {
    const [leads, setLeads] = useState<Database['public']['Tables']['leads']['Row'][]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        const { data } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setLeads(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const createLead = async (lead: Database['public']['Tables']['leads']['Insert']) => {
        // Fetch user tenant_id to satisfy RLS
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('id', user.id).single();
            if (profile) {
                // @ts-ignore - tenant_id might be missing in input but we add it here
                lead.tenant_id = profile.tenant_id;
            }
        }

        const { data, error } = await supabase.from('leads').insert(lead).select().single();
        if (!error) await fetchLeads();
        return { data, error };
    };

    const updateLead = async (id: string, updates: Database['public']['Tables']['leads']['Update']) => {
        const { data, error } = await supabase.from('leads').update(updates).eq('id', id).select().single();
        if (!error) await fetchLeads();
        return { data, error };
    };

    return { leads, loading, refreshLeads: fetchLeads, createLead, updateLead };
}
