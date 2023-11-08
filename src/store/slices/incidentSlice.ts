import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../http';

type Incident = {
  id: string;
  createdAt: Date;
  importance: string;
  equipment: string;
  message: string;
  responsible: string;
  isRead: boolean;
};

type IncidentsState = {
  data: Incident[];
  searchTerm: string;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState = {
  data: [],
  loading: 'idle',
  searchTerm: '',
} as IncidentsState;

export const fetchIncidents = createAsyncThunk(
  'incidents/fetchPosts',
  async () => {
    const response = await axios.get('/');
    return response.data;
  },
);

export const toggleReadStatus = createAsyncThunk(
  'incidents/toggleReadStatus',
  async (incidentId: string) => {
    const response = await axios.post('/toggle', { id: incidentId });
    return response.data.incident;
  },
);

const incidentSlice = createSlice({
  name: 'incident',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIncidents.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(toggleReadStatus.fulfilled, (state, action) => {
      const { payload } = action;
      state.data = state.data.map((incident) =>
        incident.id === payload.id ? payload : incident,
      );
    });
  },
});

export const { setSearchTerm } = incidentSlice.actions;
export default incidentSlice.reducer;
