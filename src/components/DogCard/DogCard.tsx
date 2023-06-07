//assets
import defaultPic from "../../assets/profile.png"
// types:
import { Dog } from "../../types/models"

interface DogCardProps {
  dog: Dog;
}

const DogCard = (props: DogCardProps): JSX.Element => {
  const { dog } = props
  return (
    <article>
      <img 
        src={dog.photo ? dog.photo : defaultPic } 
        alt={`${dog.name}'s picture`} 
      />
      <h1>{dog.name}</h1>
      
    </article>
  )
}

export default DogCard