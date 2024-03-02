import { createContext, useReducer } from "react";

export const NotesContext = createContext()

export const noteReducer = (state, action) => {
    switch(action.type){
        case 'SET_NOTES':
            return {
                notes: action.payload
            }
        case 'CREATE_NOTE':
            return {
                notes: [action.payload, ...state.notes]//adding new workout to first of this array and other prev workouts
            } 
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter((w)=> w._id!== action.payload._id)
            } 
        default:
            return state
    }
}


export const NoteContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, {
        notes: null
    })

    return ( 
        <WorkoutsContext.Provider value={ {...state, dispatch} }>
            { children }
        </WorkoutsContext.Provider>
     );
}
