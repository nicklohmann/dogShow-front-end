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
      <img className='logo' src="https://res.cloudinary.com/dvc0nel3u/image/upload/v1686215027/DogShowLogo_qx57iv.png" alt="" />
      <br />
      <div className='landingPhotosBox'>
        <div>
          <img src="https://loremflickr.com/400/399/dog?random=3" alt="" />
          <img src="https://loremflickr.com/400/400/dog?random=3" alt="" />
          <img src="https://loremflickr.com/399/400/dog?random=3" alt="" />
        </div>
        <div>
          <img src="https://loremflickr.com/400/398/dog?random=3" alt="" />
          <img src="https://loremflickr.com/400/401/dog?random=3" alt="" />
          <img src="https://loremflickr.com/398/400/dog?random=3" alt="" />
        </div>
      </div>
      
    </main>
  )
}

export default Landing
