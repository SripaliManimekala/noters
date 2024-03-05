import {useEffect, useState } from 'react'
import { useNotesContext } from "../hooks/useNotesContext"

//component
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () => {
    const {notes, searchResult, searching, dispatch } = useNotesContext()
    // const [searching, setSearching] =  useState(false)

    useEffect(() => {
      const fetchNotes = async () => {
        const response = await fetch('/api/notes')
        const json = await response.json()

        if (response.ok) {
          dispatch({type:'SET_NOTES', payload:json})
        }
      }

      fetchNotes()

    }, [])

    const displayNotes = searching ? searchResult : notes;

    return (
      <div className="home">
        <div className="notes">
          {displayNotes && displayNotes.map((note)=>(
            <NoteDetails key={note._id} note={note}/>
          ))}
        </div>
        <NoteForm />
      </div>
    )
  }
  
  export default Home