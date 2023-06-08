//npm modules
import React, { useState, useRef } from "react"

//types
import { PhotoFormData } from '../../types/forms'
import { Dog } from "../../types/models"
import { dogFormData } from "../../types/forms"
import { Navigate, useNavigate } from "react-router-dom";

interface AddDogFormProps {
  dog?: Dog;
  onSubmit: (formData: Dog) => void
}

const defaultFormData = {
  name: "",
  breed:"",
  photo:""

}

const AddDogForm = (props: AddDogFormProps) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<dogFormData>(props.dog || defaultFormData)
  const imgInputRef = useRef<HTMLInputElement | null>(null)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt: React.FormEvent<HTMLElement>) => {
    evt.preventDefault()
    props.onSubmit(formData)
    setFormData(defaultFormData)
    navigate('/dogs')
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h1>{message}</h1>
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
            id="photo"
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label>

      <button type="submit">SUBMIT</button>
    </form>
  )
}

export default AddDogForm