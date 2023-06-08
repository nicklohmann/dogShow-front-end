//services
import * as tokenService from './tokenService'

//types
import { Dog } from '../types/models'
import { dogFormData } from '../types/forms'
import { PhotoFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/dogs`

async function getAllDogs(): Promise<Dog[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Dog[]
}

async function create(formData: dogFormData): Promise<Dog> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  return await res.json() as Dog
}

async function update(formData: dogFormData): Promise<Dog> {
  const res = await fetch(`${BASE_URL}/${formData.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  return await res.json()
}

async function deleteDog(dogId: number): Promise<void> {
  await fetch(`${BASE_URL}/${dogId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
    }
  })
}

async function addDogPhoto(photoData: PhotoFormData): Promise<string> {
  if (!photoData.photo) throw new Error("No photo found.")
  
  const photoFormData = new FormData()
  photoFormData.append('photo', photoData.photo)

  const user = tokenService.getUserFromToken()
  if (!user) throw new Error("No user.")
  
  const dogId = user.profile.id
  const res = await fetch(`${BASE_URL}/${dogId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoFormData
  })
  return await res.json() as string
}


export { getAllDogs, create, update, deleteDog, addDogPhoto }