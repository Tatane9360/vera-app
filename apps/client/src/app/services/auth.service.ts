import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@compet-website/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  // Initialize with undefined to indicate "loading" state
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  public currentUser$: Observable<User | null | undefined> = this.currentUserSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.loadUser();
  }

  private async loadUser() {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      this.currentUserSubject.next(user);
    } catch (error) {
      this.currentUserSubject.next(null);
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUserSubject.next(session?.user ?? null);
    });
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    this.currentUserSubject.next(null);
    return { error };
  }

  // Envoyer un email de réinitialisation de mot de passe
  async resetPasswordForEmail(email: string) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  }

  // Mettre à jour le mot de passe
  async updatePassword(newPassword: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value ?? null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}