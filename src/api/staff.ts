import axios, { AxiosResponse } from "axios";

import { StaffMember } from "../types/staff";
import { API_HOST } from "../configs/backend";

export const fetchStaff = async () => {
  const response: AxiosResponse<StaffMember[]> = await axios.get(`${API_HOST}/staff`);
  return { data: response.data };
};

export const postStaffMember = async (
  staffMember: StaffMember
) => {
    return axios.post(`${API_HOST}/staff`, staffMember);
};

export const putStaffMember = async (
  staffMember: StaffMember
) => {
    return axios.put(`${API_HOST}/staff/${staffMember.id}`, staffMember);
};

export const deleteStaffMember = async (
  staffMemberId: string
) => {
    return axios.delete(`${API_HOST}/staff/${staffMemberId}`);
};