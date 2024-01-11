import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './store';
import { fetchStaff } from '../api/staff';
import { StaffMember } from '../types/staff';

export interface StaffState {
  value: StaffMember[],
  status: 'idle' | 'loading' | 'failed'
}

const initialState: StaffState = {
  value: [],
  status: 'idle',
}

export const getStaffList = createAsyncThunk(
  'staff/fetchStaff',
  async () => {
    const response = await fetchStaff();
    return response.data;
  }
);


export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<StaffMember>) => {
      const member = {
        id: uuidv4(),
        name: action.payload.name,
        startTime: action.payload.startTime, // in minutes
        endTime: action.payload.endTime, // in minutes
      };

      state.value.push(member);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStaffList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStaffList.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getStaffList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// this is for dispatch
export const { addMember } = staffSlice.actions;


// Selectors
export const selectStaffList = (state: RootState) => state.staff.value;

export const selectMemberById = (memberId?: string) =>
  createSelector(
    [selectStaffList],
    (staff) => staff.find((member) => member.id === memberId)
  );

// this is for configureStore
export default staffSlice.reducer;



