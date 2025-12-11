import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User, SortConfig, SortField, SortDirection } from '@/domain';
import { getAllUsers } from './useCases';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  sortConfig: SortConfig;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  searchTerm: '',
  sortConfig: {
    field: 'name',
    direction: 'asc',
  },
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await getAllUsers();
      return users;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch users';
      return rejectWithValue(message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      const field = action.payload;
      if (state.sortConfig.field === field) {
        // Toggle direction if same field
        state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortConfig.field = field;
        state.sortConfig.direction = 'asc';
      }
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortConfig.direction = action.payload;
    },
    toggleSortDirection: (state) => {
      state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchTerm,
  setSortField,
  setSortDirection,
  toggleSortDirection,
  clearError,
} = usersSlice.actions;

export default usersSlice.reducer;
