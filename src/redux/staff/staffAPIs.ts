import { StaffMember } from "./schema";

// A mock function to mimic making an async request for data
export function fetchStaff() {
  return new Promise<{ data: StaffMember[] }>((resolve) =>
    setTimeout(() => resolve({ data: [] }), 500)
  );
}