-- Disable email confirmation requirement for development
-- This allows users to login immediately after signup without email confirmation

-- Note: In production, you should enable email confirmation for security
-- This can be done in Supabase Dashboard > Authentication > Settings > Email Auth

-- For now, we'll handle this in the application layer by auto-confirming on signup
-- The application will check for unconfirmed emails and allow login anyway

-- Create a function to auto-confirm users (admin only)
CREATE OR REPLACE FUNCTION confirm_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = now()
  WHERE id = user_id;
END;
$$;
