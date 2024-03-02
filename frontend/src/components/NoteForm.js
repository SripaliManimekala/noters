import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext"; 

const NoteForm = () => {
    const {dispatch} = useNotesContext()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()  // prevent page refresh on submit

        const note ={title, content, tags}

        //fetch req to post the new data
        const response = await fetch('/api/notes',{
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        })//whre post req going to=> /api/workout
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')//reset all the values again after adding one
            setContent('')
            setTags('')
            setError(null)
            setEmptyFields([])
            console.log('new note added:', json)
            dispatch({type: 'CREATE_NOTE', payload: json})
        }
    }

    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Note</h3>

            <label>Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : '' }
            />

            <label>Content:</label>
            <input 
                type="text"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('content') ? 'error' : '' }
            />

            <label>Tags:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('tags') ? 'error' : '' }
            />

            <button>Add Workout</button>
            {/* output error if there is an error while adding to the form */}
            { error && <div className="error">{error}</div> }
        </form>
     );
}
 
export default NoteForm;