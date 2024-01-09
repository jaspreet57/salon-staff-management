import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "./store";
import { Appointment } from "../types/appointments";
import { fetchAppointments } from "../api/appointments";

export interface AppointmentsState {
  value: Appointment[];
  status: "idle" | "loading" | "failed";
}

const initialState: AppointmentsState = {
  value: [
    {
      id: "1",
      memberId: "sdljf",
      title: "Event 1",
      clientName: "clinet one",
      comment: "",
      startTime: "2024/1/9 09:30",
      endTime: "2024/1/9 10:30",
    },
    {
      id: "2",
      memberId: "sdflkj",
      title: "Event 2",
      clientName: "clinet two",
      comment: "",
      startTime: "2024/1/9 11:00",
      endTime: "2024/1/9 12:00",
    },
  ],
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
      const appointment: Appointment = {
        id: uuidv4(),
        memberId: uuidv4(),
        title: "appointment one",
        clientName: "client one",
        comment: "...",
        startTime: action.payload.startTime, // in minutes
        endTime: action.payload.endTime, // in minutes
      };

      state.value.push(appointment);
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

export const selectAppointmentById = (appointmentId?: string) =>
  createSelector([selectAppointments], (appointments) =>
    appointments.find((appointment) => appointment.id === appointmentId)
  );

// this is for configureStore
export default appointmentsSlice.reducer;
