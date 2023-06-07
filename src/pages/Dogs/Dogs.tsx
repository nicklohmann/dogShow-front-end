//npm modules
import { useState, useEffect } from 'react'

// components
import DogCard from '../../components/DogCard/DogCard'
import AddDogForm from '../../components/AddDogForm/AddDogForm'

// css
import styles from './Dogs.module.css'

// types
import { Dog, User } from '../../types/models'
import { dogFormData } from '../../types/forms'

// service
import * as dogService from '../../services/dogService'

interface DogsProps {
  user: User | null
}
const Dogs = (props: DogsProps): JSX.Element => {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [addDogForm, setAddDogForm] = useState(false)

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

  const handleNewForm = () => {
    setAddDogForm(!addDogForm)
  }

  const handleAddDog = async (formData: dogFormData) => {
    try {
      const addDog = await dogService.create(formData)
      setDogs([addDog, ...dogs])
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateDog = async (formData: dogFormData) => {
    try {
      const updatedDog = await dogService.update(formData)
      if(updatedDog) {
        const nextDogs = []
        for (const dog of dogs) {
          if (formData.id === dog.id) {
            nextDogs.push(updatedDog)
          } else {
            nextDogs.push(dog)
          }
        }
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
      <h1>Dogs</h1>
      <button></button>
      {dogs.map((dog: Dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
        />
      ))}
    </main>
  )
}
export default Dogs
