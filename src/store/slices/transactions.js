import { createSlice } from "@reduxjs/toolkit";
import { apiBegin } from "../api";
import store from "../store";

const slice = createSlice({
    name:'transactions',
    initialState:{
        address:'',
        list:[],
    },
    reducers:{
        transactionReceived:(transactions,action) => {
            transactions.list = action.payload
        },
        addressChanged:(transactions,action) => {
            transactions.address = action.payload.address
        }
    }
})

const {transactionReceived,addressChanged} = slice.actions

export default slice.reducer;

export const changeAddress = (address) => {
    store.dispatch(addressChanged({address}))
}

export const loadTransactions = () => {
    store.dispatch(apiBegin({
        url:`accounts/${store.getState().transactions.address}/transactions`,
        onSuccess:transactionReceived.type
    }))
    
}