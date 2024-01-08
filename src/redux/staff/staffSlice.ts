import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';
import { fetchStaff } from './staffAPIs';
import { StaffMember } from './schema';


function createData(
  id: string,
  name: string,
  startTime: number,
  endTime: number
): StaffMember {
  return {
    id,
    name,
    startTime,
    endTime,
  };
}

const rows = [
  createData("1", "Cupcake", 305, 3.7),
  createData("2", "Donut", 452, 25.0),
  createData("3", "Eclair", 262, 16.0),
  createData("4", "Frozen yoghurt", 159, 6.0),
  createData("5", "Gingerbread", 356, 16.0),
  createData("6", "Honeycomb", 408, 3.2),
  createData("7", "Ice cream sandwich", 237, 9.0),
  createData("8", "Jelly Bean", 375, 0.0),
  createData("9", "KitKat", 518, 26.0),
  createData("10", "Lollipop", 392, 0.2),
  createData("11", "Marshmallow", 318, 0),
  createData("12", "Nougat", 360, 19.0),
  createData("13", "Oreo", 437, 18.0),
];

export interface StaffState {
  value: StaffMember[],
  status: 'idle' | 'loading' | 'failed'
}

const initialState: StaffState = {
  value: rows,
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

export const selectStaffList = (state: RootState) => state.staff.value;

// this is for configureStore
export default staffSlice.reducer;



