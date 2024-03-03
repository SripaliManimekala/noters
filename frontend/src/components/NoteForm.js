import { useState } from "react";

const NoteForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tags,setTags] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Split comma-separated tags into an array
        const tagsArray = tags.split(',').map(tag => tag.trim());

    
        const note = {title, content, tags: tagsArray}
        
        const response = await fetch('/api/notes', {
          method: 'POST',
          body: JSON.stringify(note),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setTitle('')
          setContent('')
          setTags('')
          console.log('new note added:', json)
        }
    
    }
    

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a Note</h3>
            <label>Title: </label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Content: </label>
            <input 
                type="text" 
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <label>Tags: </label>
            <input 
                type="text" 
                onChange={(e) => setTags(e.target.value)}
                value={tags}
            />

            <button>Add Note</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}
 
export default NoteForm;