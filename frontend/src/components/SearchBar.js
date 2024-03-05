import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";


const SeachBar = () => {
    const { dispatch } = useNotesContext()
    const [query,setQuery] = useState('')
    const [error, setError] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/notes/search?query=${query}`)
        const json = await response.json()
        
        if (!response.ok) {
            setError(json.error)
        }

        if(response.ok){
            setError(null)
            dispatch({type:'SET_SEARCH_RESULT',payload:json})
        }

    }

    return ( 
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="search"
                onChange={(e)=>setQuery(e.target.value)}
            />
            <button onClick={ handleSearch }>Search</button>
        </div>
    );
}
 
export default SeachBar;