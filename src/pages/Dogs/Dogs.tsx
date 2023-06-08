//npm modules
import { useState, useEffect } from 'react'

// components
import DogCard from '../../components/DogCard/DogCard'

// css
import styles from './Dogs.module.css'

// types
import { Dog, User } from '../../types/models'
import { dogFormData, PhotoFormData } from '../../types/forms'

// service
import * as dogService from '../../services/dogService'

interface DogsProps {
  user: User | null
}
const Dogs = (props: DogsProps): JSX.Element => {
  const [dogs, setDogs] = useState<Dog[]>([])

  const { user } = props

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

  const handleUpdateDog = async (formData: dogFormData, photoData: PhotoFormData) => {
    try {
      //console.log(photoData);
      const updatedDog = await dogService.update(formData)
      if(updatedDog?.id) {
        const photo = await dogService.addDogPhoto(photoData, updatedDog.id)
        console.log(photo);
        console.log(photoData);
        //console.log(updatedDog);
        const dogWithPhoto = {...updatedDog, photo: photo}
        
        const nextDogs = dogs.map((dog) =>
          dog.id === formData.id ? dogWithPhoto : dog
        );
        setDogs(nextDogs)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteDog = async (dogId: number): Promise<void> => {
    try {
      await dogService.deleteDog(dogId)
      const nextDogs = dogs.filter((dog) => dog.id !== dogId)
      setDogs(nextDogs)
    } catch (err) {
      console.log(err)
      
    }
  }

  if (!dogs.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  return (
    <main className="list">
      {dogs.map((dog: Dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          user={user}
          onDelete={handleDeleteDog}
          onSubmit={handleUpdateDog}
        />
      ))}
    </main>
  )
}
export default Dogs
