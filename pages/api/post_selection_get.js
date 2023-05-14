import axios from "axios"
import config from "../../config";

export default async (req, res) => {
    try {
      const response = await axios.get(`${config.apiUrl}/post_selection_get`)
      const data = response.data
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  