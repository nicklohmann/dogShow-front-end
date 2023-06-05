// css
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>Dog Show</h1>
      <img src="https://loremflickr.com/400/400/dog" alt="" />
    </main>
  )
}

export default Landing
