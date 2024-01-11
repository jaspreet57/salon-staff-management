import axios, { AxiosResponse } from "axios";

import { StaffMember } from "../types/staff";
import { API_HOST } from "../configs/backend";

export const fetchStaff = async () => {
  const response: AxiosResponse<StaffMember[]> = await axios.get(`${API_HOST}/staff`);
  return { data: response.data };
};
