import { supabase } from "./supabaseClient";

// SIGN UP
export async function signUp(email: string, password: string) {
	return await supabase.auth.signUp({ email, password });
}

// SIGN IN
export async function signIn(email: string, password: string) {
	return await supabase.auth.signInWithPassword({ email, password });
}

// SIGN OUT
export async function signOut() {
	return await supabase.auth.signOut();
}
