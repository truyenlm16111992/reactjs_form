import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentData: [],
    studentEditing: undefined,
};
const btFormSlice = createSlice({
    name: "btForm",
    initialState,
    reducers: {
        addStudent: (state, { payload }) => {
            const { studentData } = state;
            const student = studentData.find(e => e.code === payload.code);
            if (!student) {
                studentData.push(payload);
            }
        },
        editStudent: (state, { payload }) => {
            state.studentEditing = payload;
        },
        updateStudent: (state, { payload }) => {
            state.studentData=state.studentData.map(e=>e.code===payload.code?payload:e);
            state.studentEditing=undefined;
        },
        cancelEditing: (state) => {
            state.studentEditing = undefined;
        },
        deleteStudent: (state, { payload }) => {
            state.studentData=state.studentData.filter(e=>e.code!==payload);
        },
    }
});
export const { reducer: btFormReducer, actions: btFormActions } = btFormSlice;