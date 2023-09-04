import { createSlice } from "@reduxjs/toolkit";
import {convertStringSearch} from "utils"

const initialState = {
    studentData: [],
    studentEditing: undefined,
    studentList: []
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
            state.studentList = [...studentData];
        },
        editStudent: (state, { payload }) => {
            state.studentEditing = payload;
        },
        updateStudent: (state, { payload }) => {
            state.studentData = state.studentData.map(e => e.code === payload.code ? payload : e);
            state.studentEditing = undefined;
            state.studentList = [...state.studentData];
        },
        cancelEditing: (state) => {
            state.studentEditing = undefined;
        },
        deleteStudent: (state, { payload }) => {
            state.studentData = state.studentData.filter(e => e.code !== payload);
            state.studentList = [...state.studentData];
        },
        searchStudent: (state, { payload }) => {
            state.studentList = [...payload ? state.studentData.filter(e => {
                const strObj = convertStringSearch(Object.values(e).join(''));
                return strObj.indexOf(convertStringSearch(payload)) !== -1
            }) : state.studentData];
        }
    }
});
export const { reducer: btFormReducer, actions: btFormActions } = btFormSlice;