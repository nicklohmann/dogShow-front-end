// npm modules
import { useState, useRef} from "react"
import { useNavigate } from "react-router-dom";

// services
import * as dogService from '../../services/dogService'

// css

// components

// types
import { Dog, Profile, User } from "../../types/models"
import { dogFormData, PhotoFormData } from "../../types/forms"

/* interface AddDogProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
} */
const defaultFormData = {
  name: "",
  breed:"",
  photo:""

}
const Newdog = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<dogFormData>(defaultFormData)

  const imgInputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState('')
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    handleAddDog(formData)
  }

  const handleAddDog = async (formData: dogFormData) => {
    await dogService.create(formData)
    navigate('/dogs')
  }
  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (photoFormat && !validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }
    
    setMessage(errMsg)
    
    if (isFileInvalid && imgInputRef.current) {
      imgInputRef.current.value = ""
      return
    }
    setPhotoData({ photo: evt.target.files[0] })
  }

  return (
    <main>
      <h1>HELLO</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name-input">Name</label>
      <input
        required
        type="text"
        name="name"
        id="name-input"
        placeholder="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="Breed-input">Breed</label>
      <input
        required
        type="text"
        name="breed"
        value={formData.breed}
        id="Breed-input"
        placeholder="Breed"
        onChange={handleChange}
      />
      <label>
          Upload Photo
          <input 
            type="file" 
            name="photo" 
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label>

      <button type="submit">SUBMIT</button>
    </form>
    </main>
  )
}

export default Newdog