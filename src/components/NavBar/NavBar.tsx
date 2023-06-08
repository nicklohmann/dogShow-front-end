// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav>
      <NavLink to="/">
        <img className='logo' src="https://res.cloudinary.com/dvc0nel3u/image/upload/v1686215027/DogShowLogo_qx57iv.png" alt="" />
      </NavLink>
      {user ?
        <ul>
          <li>{user.name}</li>
          <li><NavLink to="/Dogs">Dogs</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>Log Out</NavLink></li>
        </ul>
      :
        <ul>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
