import {useEffect, useState } from 'react'

//component
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'

const Home = () => {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
      const fetchNotes = async () => {
        const response = await fetch('/api/notes')
        const json = await response.json()

        if (response.ok) {
          setNotes(json)
        }
      }

      fetchNotes()

    }, [])

    return (
      <div className="home">
        <div className="notes">
          {notes && notes.map((note)=>(
            <NoteDetails key={note._id} note={note}/>
          ))}
        </div>
        <NoteForm />
      </div>
    )
  }
  
  export default Home