import { createContext, useReducer } from 'react'

export const NotesContext = createContext()

export const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return { 
        notes: action.payload,
        searching: false 
      }
    case 'CREATE_NOTE':
      return { 
        notes: [action.payload, ...state.notes] 
      }
    case 'SET_SEARCH_RESULT':
      return {
        ...state,
        searchResult: action.payload,
        searching: true
      }
    default:
      return state
  }
}

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, { 
    notes: null,
    searchResult: null,
    searching: false
  })
  
  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </NotesContext.Provider>
  )
}
