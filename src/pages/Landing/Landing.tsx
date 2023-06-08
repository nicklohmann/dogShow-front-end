// css
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'
import { login } from '../../services/authService';

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  console.log(user);
  
  return (
    <main className={styles.container}>
      <img className='logo' src="https://res.cloudinary.com/dvc0nel3u/image/upload/v1686215027/DogShowLogo_qx57iv.png" alt="" />
    </main>
  )
}

export default Landing
