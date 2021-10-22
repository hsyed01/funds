import { filter } from 'lodash';

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
    },

    // DELETE FUNDS
    deleteFundSuccess(state, action) {
      state.isLoading = false;
      const deleteFund = filter(state.funds, (fund) => fund.fund_id !== action.payload);
      state.funds = deleteFund;
    }
  }
});

// Reducer
export default slice.reducer;

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

// ----------------------------------------------------------------------

export function deleteFund(id: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`http://129.213.112.144:8080/captain/funds/${id}`);
      if (response.status === 200) {
        dispatch(slice.actions.deleteFundSuccess(id));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
