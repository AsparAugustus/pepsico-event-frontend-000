import axios from "axios"


export default async (req, res) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/post_selection_get')
      const data = response.data
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  