import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getSupabaseClient } from "@/utils/supabase/client"; // Updated import
import { RootState } from '@/store'; // Import RootState for type definitions

const supabase = getSupabaseClient(); // Use getSupabaseClient instead of createClient

// Define the shape of the auth state
interface AuthState {
  isPasscodeSent: boolean;
  authMessage: string;
  authError: string | null;
}

// Initial state
const initialState: AuthState = {
  isPasscodeSent: false,
  authMessage: '',
  authError: null,
};

// Async thunk for sending the passcode
export const sendPasscode = createAsyncThunk<
  string, // Return type of the thunk on success
  { method: string; contact: string }, // Argument type for the thunk
  { rejectValue: string } // Type of the value passed to rejectWithValue
>(
  'auth/sendPasscode',
  async ({ method, contact }, { rejectWithValue }) => {
    const payload = method === 'phone' ? { phone: contact } : { email: contact };
    console.log('Sending passcode with payload:', payload);
    const { error } = await supabase.auth.signInWithOtp(payload);
    if (error) {
      console.error('Error in sendPasscode:', error);
      return rejectWithValue(error.message);
    }
    console.log('Passcode sent successfully to', contact);
    return `Check your ${method} for the passcode!`;
  }
);

// Async thunk for verifying the passcode
export const verifyPasscode = createAsyncThunk<
  string, // Return type of the thunk on success
  { method: string; contact: string; passcode: string }, // Argument type for the thunk
  { rejectValue: string } // Type of the value passed to rejectWithValue
>(
  'auth/verifyPasscode',
  async ({ method, contact, passcode }, { rejectWithValue }) => {
    // Define the payload based on the method type
    let verificationPayload: { phone: string; token: string; type: 'sms' } | { email: string; token: string; type: 'email' };

    if (method === 'phone') {
      verificationPayload = { phone: contact, token: passcode, type: 'sms' };
    } else {
      verificationPayload = { email: contact, token: passcode, type: 'email' };
    }

    console.log('Verifying passcode with payload:', verificationPayload);

    const { error } = await supabase.auth.verifyOtp(verificationPayload);
    if (error) {
      console.error('Error in verifyPasscode:', error);
      return rejectWithValue(error.message);
    }
    console.log('Passcode verified successfully for', contact);
    return 'Passcode verified successfully!';
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPasscode.fulfilled, (state, action: PayloadAction<string>) => {
        state.isPasscodeSent = true;
        state.authMessage = action.payload;
        state.authError = null;
      })
      .addCase(sendPasscode.rejected, (state, action) => {
        state.authError = action.payload || 'Failed to send passcode';
      })
      .addCase(verifyPasscode.fulfilled, (state, action: PayloadAction<string>) => {
        state.authMessage = action.payload;
        state.authError = null;
      })
      .addCase(verifyPasscode.rejected, (state, action) => {
        state.authError = action.payload || 'Failed to verify passcode';
      });
  },
});

// Selector functions
export const selectAuthStatus = (state: RootState) => state.auth.isPasscodeSent;
export const selectAuthMessage = (state: RootState) => state.auth.authMessage;
export const selectAuthError = (state: RootState) => state.auth.authError;

export default authSlice.reducer;
