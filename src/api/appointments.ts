import axios, { AxiosResponse } from "axios";

import { Appointment } from "../types/appointments";
import { API_HOST } from "../configs/backend";
import { StaffMember } from "../types/staff";

export const fetchAppointments = async (memberId?: string) => {
  const response: AxiosResponse<Appointment[]> = await axios.get(
    `${API_HOST}/appointments${memberId ? `?memberId=${memberId}` : ""}`
  );
  return { data: response.data };
};

export const postAppointment = async (
  appointment: Appointment,
  member?: StaffMember,
  isUpdate?: boolean
) => {
  // validations logic here..
  if (!member) {
    throw new Error("Not a valid staff member");
  }

  const appointmentStartTime = new Date(appointment.startTime);
  const appointmentEndTime = new Date(appointment.endTime);
  const memberStartHour = new Date(appointmentStartTime);
  memberStartHour.setHours(member.startTime);
  memberStartHour.setMinutes(0);

  const memberEndHour = new Date(appointmentEndTime);
  memberEndHour.setHours(member.endTime);
  memberEndHour.setMinutes(0);

  if (appointmentStartTime >= appointmentEndTime) {
    throw new Error(
      "Appointment start time should not be greater than appointment end time"
    );
  }

  if (
    appointmentStartTime < memberStartHour ||
    appointmentEndTime > memberEndHour
  ) {
    throw new Error(
      `Appointment start and end time should be within Staff working hours : ${memberStartHour.toLocaleTimeString()} - ${memberEndHour.toLocaleTimeString()}`
    );
  }

  let { data: latestAppointments } = await fetchAppointments(member.id);

  if (isUpdate) {
    latestAppointments = latestAppointments.filter(
      (item) => appointment.id !== item.id
    );
  }

  if (latestAppointments.length > 0) {
    for (const scheduledAppointment of latestAppointments) {
      const scheduledAppointmentStartTime = new Date(
        scheduledAppointment.startTime
      );
      const scheduledAppointmentEndTime = new Date(
        scheduledAppointment.endTime
      );

      console.log("Appointment times", {
        scheduledAppointmentStartTime,
        scheduledAppointmentEndTime,
      });

      if (
        (appointmentStartTime < scheduledAppointmentStartTime &&
          appointmentEndTime > scheduledAppointmentEndTime) ||
        (appointmentStartTime >= scheduledAppointmentStartTime &&
          appointmentStartTime < scheduledAppointmentEndTime) ||
        (appointmentEndTime > scheduledAppointmentStartTime &&
          appointmentEndTime <= scheduledAppointmentEndTime)
      ) {
        throw new Error(
          "Appointment start and end time should not be conflicting with other appointments"
        );
      }
    }
  }

  if (isUpdate) {
    return axios.put(`${API_HOST}/appointments/${appointment.id}`, appointment);
  }

  return axios.post(`${API_HOST}/appointments`, appointment);
};

export const deleteAppointment = async (appointmentId: string) => {
  await axios.delete(`${API_HOST}/appointments/${appointmentId}`);
};
