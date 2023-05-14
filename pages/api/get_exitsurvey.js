import axios from "axios";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get("http://http://127.0.0.1:8000/exit_survey", {
      responseType: "arraybuffer",
    });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=exit_survey.csv"
    );
    res.send(Buffer.from(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}
