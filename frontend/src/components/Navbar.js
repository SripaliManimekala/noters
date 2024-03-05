import { Link } from 'react-router-dom'
import SeachBar from './SearchBar'


const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Noter</h1>
        </Link>
        <SeachBar />
        <div className="navbar-right">
        <h4>Sign up / Log in</h4>
        <h4>My notes</h4>
        </div>
      </div>
    </header>
  )
}

export default Navbar