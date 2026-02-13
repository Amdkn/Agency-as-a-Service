-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, tenant_id, role, full_name, avatar_url)
  VALUES (
    new.id,
    (SELECT id FROM public.tenants LIMIT 1),
    'owner',
    new.raw_user_meta_data->>'full_name',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || (new.raw_user_meta_data->>'full_name')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
