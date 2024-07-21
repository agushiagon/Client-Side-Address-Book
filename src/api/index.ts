import api from '@/plugins/axios'
import { Contact } from '@/types/index'

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const addNewContact = async (contact: Contact): Promise<void> => {
  try {
    await api.post('/users', contact)
  } catch (error) {
    console.error('Error adding contact:', error)
    throw error
  }
}

export const getContactById = async (id: string): Promise<Contact> => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching contact with ID ${id}:`, error)
    throw error
  }
}

export const updateContact = async (
  id: string,
  contact: Contact
): Promise<void> => {
  try {
    await api.put(`/users/${id}`, contact)
  } catch (error) {
    console.error(`Error updating contact with ID ${id}:`, error)
    throw error
  }
}

export const deleteContactById = async (id: string): Promise<void> => {
  try {
    await api.delete(`/users/${id}`)
  } catch (error) {
    console.error(`Error deleting contact with ID ${id}:`, error)
    throw error
  }
}
