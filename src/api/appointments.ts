import { Appointment } from "../types/appointments";

// A mock function to mimic making an async request for data
export function fetchAppointments(memberId?: string) {
  return new Promise<{ data: Appointment[] }>((resolve) =>
    setTimeout(() => resolve({ data: [] }), 500)
  );
}
