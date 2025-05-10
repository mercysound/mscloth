import { createSlice } from "@reduxjs/toolkit";

let counterSlice = createSlice({
    name:"count",
    initialState:{
      alluser:[],
      count:0,
      myName: "Kunle"
    },
    reducers:{
      increament:(state)=>{
        state.count +=1
      },
      decrement:(state)=>{
        state.count ++
      },
      incrementByUser:(state, actions)=>{
        state.count = state.count + actions.payload
      }
    }
})
let teacherSlice = createSlice({
    name:"count",
    initialState:{
      alluser:[],
      count:0,
      myName: "Kunle"
    },
    reducers:{
      increament:(state)=>{
        state.count +=1
      },
      decrement:(state)=>{
        state.count ++
      },
      incrementByUser:(state, actions)=>{
        state.count = state.count + actions.payload
      }
    }
})
export const {increament, incrementByUser} = counterSlice.actions
// export default counterSlice.reducer
let allReducer = {counter:counterSlice.reducer, teacher:teacherSlice.reducer}
export default allReducer