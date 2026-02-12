import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'YOUR_SUPABASE_SERVICE_ROLE_KEY' // Service Role Key (Admin)
const supabase = createClient(supabaseUrl, supabaseKey)

async function verify() {
    console.log('Testing connection to Supabase...')
    const { data, error } = await supabase
        .from('tenants')
        .select('*')

    if (error) {
        console.error('❌ Connection Failed:', error.message)
    } else {
        console.log('✅ Connection Successful!')
        console.log('Found Tenants:', data.length)
        if (data.length > 0) {
            console.log('Sample Tenant:', data[0].name)
        } else {
            console.warn('⚠️ Connected but no tenants found (Seed might have failed)')
        }
    }
}

verify()
