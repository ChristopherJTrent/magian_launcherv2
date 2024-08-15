import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type statefulRepo = {installedVersion: string, remote: string}
export type repositoryMapping = statefulRepo[]

const initialState: repositoryMapping = []

export const repositorySlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        receiveRepositories: (state: repositoryMapping, action: PayloadAction<statefulRepo[]>) => {
            action.payload.forEach((v, i) => {state[i] = v})
        } 
    }
})

export const {receiveRepositories} = repositorySlice.actions
export default repositorySlice.reducer