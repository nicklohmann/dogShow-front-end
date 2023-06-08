//assets
import defaultPic from "../../assets/profile.png"
// types:
import { Dog, User } from "../../types/models"
import { dogFormData } from "../../types/forms";

//components
import AddDogForm from "../AddDogForm/AddDogForm";
import { useState } from "react";

interface DogCardProps {
  dog: Dog;
  user: User | null
  onSubmit: (formData: dogFormData) => void
  onDelete: (dogId: number) => Promise<void>
}

const DogCard = (props: DogCardProps): JSX.Element => {
  const { dog, user, onSubmit, onDelete } = props
  const [editNow, setEditNow] = useState<boolean>(false)

  const isCurrentUser = () => {
    return user?.profile.id === dog.profileId
  }

  const handleShowEdit = () => {
    setEditNow(!editNow)
  }

  const handleSubmit = (formData: dogFormData) => {
    onSubmit({ id: dog.id, ...formData})
    handleShowEdit()
  }

  const handleRemoveDog = () => {
    if (dog.id) {
      onDelete(dog.id)
    }
    
  }

  return (
    <article>
      <img 
        src={dog.photo ? dog.photo : defaultPic } 
        alt={`${dog.name}'s picture`} 
      />
      <h1>{dog.name}</h1>
      <h2>{dog.breed}</h2>
    {isCurrentUser() ? (
      <div>
        <button onClick={handleShowEdit}>
          {editNow ? "close" : "EDIT"}
        </button>
      </div>
    ) : (
      ""
    )}
    {editNow ? (
      <div>
        <AddDogForm dog={dog} onSubmit={handleSubmit} />
        <div>
          <button onClick={handleRemoveDog}>Remove</button>
        </div>
      </div>
    ) 
    : (
      <div>Owner: {dog.profileId}</div>
    )}
    </article>
  )
}

export default DogCard