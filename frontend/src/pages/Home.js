import { useEffect, useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext"; 

//components
import NoteDetails from "../components/NoteDetails";
import NoteForm from "../components/NoteForm";


const Home = () => {
    // const [notes, setNotes] = useState(null)
    const {notes, dispatch} = useNotesContext()

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('/api/notes')
            const json = await response.json()

            if(response.ok){
                // setNotes(json) no longer need to update local state using this bcz of useworkoutcontext hook
                dispatch({type:'SET_NOTES', payload: json})//we can dispatch an action with type we need
            }
        }

        fetchNotes()
    }, [dispatch])

    return ( 
        <div className="home">
            <div className="notes">
                {notes && notes.map((note) => (
                    <NoteDetails key={ note._id} note={note} />
                ))}
            </div>
            <NoteForm />
        </div>
     );
}
 
export default Home;