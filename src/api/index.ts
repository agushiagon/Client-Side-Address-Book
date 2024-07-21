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

export const addNewContact = async (contact: Contact): Promise<Contact> => {
  try {
    const response = await api.post('/users', contact)
    return response.data
  } catch (error) {
    console.error('Error adding contact:', error)
    throw error
  }
}
