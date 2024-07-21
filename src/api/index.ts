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
