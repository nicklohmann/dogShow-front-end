// css
import styles from './Landing.module.css'
import { useState, useEffect } from 'react';

// types
import { User, Dog } from '../../types/models'
import AddDogForm from '../../components/AddDogForm/AddDogForm';
import { dogFormData,PhotoFormData } from '../../types/forms'

// service
import * as dogService from '../../services/dogService'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props
  const [dogs, setDogs] = useState<Dog[]>([])
  useEffect((): void => {
    const fetchDogs = async(): Promise<void> => {
      try {
        const dogData: Dog[] = await dogService.getAllDogs()
        setDogs(dogData)
      } catch (err) {
        console.log(err);  
      }
    }
    user ? fetchDogs() : setDogs([])
  }, [user])

  const handleAddDog = async (formData: dogFormData, photoData: PhotoFormData) => {
    try {
      const addDog = await dogService.create(formData)
      
      if(addDog?.id) {
        const photo = await dogService.addDogPhoto(photoData, addDog.id)
        const dogWithPhoto = {...addDog, photo: photo}
        setDogs([dogWithPhoto, ...dogs])
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.container}>
      {!user ?<h1>Sign In first to add your Dog</h1>
      :
      <div>
        <AddDogForm onSubmit={handleAddDog}/>
      </div>
}
      <div className={styles.page}>
        <img src="https://res.cloudinary.com/dvc0nel3u/image/upload/v1686215027/DogShowLogo_qx57iv.png" alt="" />
      </div>
    </main>
  )
}

export default Landing
