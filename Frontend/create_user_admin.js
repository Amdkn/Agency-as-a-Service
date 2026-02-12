import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://supabasekong-mcs4scscs8ss884s0so4okg8.148.230.92.235.sslip.io'
const supabaseServiceKey = 'YOUR_SUPABASE_SERVICE_ROLE_KEY'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createUser() {
    console.log('Attempting to create user...')

    // Check if user exists first to avoid duplicate errors, although createUser handles it gracefully usually
    // But let's just try to create.

    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
        email: 'Antigravity@gmail.com',
        password: 'Password123!',
        email_confirm: true,
        user_metadata: { full_name: 'Antigravity User' }
    })

    if (userError) {
        console.error('Error creating user:', userError.message)
    } else {
        console.log('User created successfully:', userData.user.email)
    }
}

createUser()
