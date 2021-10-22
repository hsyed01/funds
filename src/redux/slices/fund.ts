import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { Fund, FundManager } from '../../@types/fund';

// ----------------------------------------------------------------------

type FundState = {
  isLoading: boolean;
  error: boolean;
  funds: Fund[];
  fundManagers: FundManager[];
};

const initialState: FundState = {
  isLoading: false,
  error: false,
  funds: [],
  fundManagers: []
};

const slice = createSlice({
  name: 'fund',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET FUNDS
    getFundsSuccess(state, action) {
      state.isLoading = false;
      state.funds = action.payload;
    }

    // // DELETE USERS
    // deleteUser(state, action) {
    //   const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
    //   state.userList = deleteUser;
    // },
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const { deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getFunds() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('http://129.213.112.144:8080/captain/funds');
      dispatch(slice.actions.getFundsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
