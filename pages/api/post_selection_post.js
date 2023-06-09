import axios from "axios";
import config from "../../config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      name,
      product_category,
      product_name,
      what_do_you_like_best,
      unique,
    } = req.body;
    const response = await axios.post(`${config.apiUrl}/post_selection_post`, {
      name,
      product_category,
      product_name,
      what_do_you_like_best,
      unique,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update feedback." });
  }
}
