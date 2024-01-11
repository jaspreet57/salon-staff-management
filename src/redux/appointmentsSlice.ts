import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Appointment } from "../types/appointments";
import { fetchAppointments } from "../api/appointments";

export interface AppointmentsState {
  value: Appointment[];
  status: "idle" | "loading" | "failed";
}

const initialState: AppointmentsState = {
  value: [],
  status: "idle",
};

export const getAppointments = createAsyncThunk(
  "appointments/fetchAppointment",
  async (memberId?: string) => {
    const response = await fetchAppointments(memberId);
    return response.data;
  }
);

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getAppointments.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// this is for dispatch
export const { addAppointment } = appointmentsSlice.actions;

// Selectors
export const selectAppointments = (state: RootState) =>
  state.appointments.value;

export const selectAppointmentsStatus = (state: RootState) =>
state.appointments.status;

export const selectAppointmentById = (appointmentId?: string) =>
  createSelector([selectAppointments], (appointments) =>
    appointments.find((appointment) => appointment.id === appointmentId)
  );

// this is for configureStore
export default appointmentsSlice.reducer;
