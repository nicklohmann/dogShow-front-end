//npm modules
import React, { useState } from "react"

//types
import { Dog } from "../../types/models"
import { dogFormData } from "../../types/forms"

interface AddDogFormProps {
  dog: Dog;
  onSubmit: (formData: Dog) => Promise<void>
}

const defaultFormData = {
  name: "",
  breed:"",
  photo:""

}

const AddDogForm = (props: AddDogFormProps) => {
  const [formData, setFormData] = useState<dogFormData>(props.dog || defaultFormData)

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt: React.FormEvent<HTMLElement>) => {
    props.onSubmit(formData).then(() => setFormData(defaultFormData))
  }
}

