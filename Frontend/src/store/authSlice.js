import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:false , //user is not logged in
    userData:null, //will hold information of the user when he will login
    loading: true //a flag for async operations(Api calls)
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
           login:(state ,action)=>{
                state.status=true;
                state.userData=action.payload.userData; //payload is the data passed when dispatching the action
                state.loading = false;
           } ,
           logout:(state , _ )=>{
                state.status=false;
                state.userData=null;
                state.loading = false;
           },
           setLoading: (state, action) => {
               state.loading = action.payload;
           }
    }
});


export const {login ,logout, setLoading} = authSlice.actions;
export default authSlice.reducer;