//npm modules
import { useState, useEffect } from 'react'

// components
import DogCard from '../../components/DogCard/DogCard'

// css
import styles from './Dogs.module.css'

// types
import { Dog } from '../../types/models'

interface DogsProps {
  dogs: Dog[];
}
const dogs = (props: DogsProps): JSX.Element => {
  const { dogs } = props

  if (!dogs.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  return (
    <main className="list">
      {dogs.map((dog: Dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
        />
      ))}
    </main>
  )
}
export default dogs
