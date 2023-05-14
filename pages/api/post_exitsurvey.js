import axios from "axios";

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
    const response = await axios.post("http://127.0.0.1:8000/exit_survey", {
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
