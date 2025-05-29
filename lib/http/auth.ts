import { supabase } from "../supabase";

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export async function signUp(user: SignUpProps) {
  const { email, password, phone } = user;
  try {
    const newUser = await supabase.auth.signUp({
      email,
      password,
      phone,
    });
  } catch (error) {
    console.log(error);
  }
}
