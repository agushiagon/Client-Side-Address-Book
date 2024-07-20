import api from '@/plugins/axios'

export const fetchData = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
