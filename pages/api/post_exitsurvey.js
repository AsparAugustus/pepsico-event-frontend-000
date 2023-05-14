import axios from "axios";

import config from "../../config";

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
        stars,
        initiative,
        further_improvement,
        feedback
    } = req.body;
    const response = await axios.post(`${config.apiUrl}/exit_survey`, {
        stars,
        initiative,
        further_improvement,
        feedback
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update feedback." });
  }
}
