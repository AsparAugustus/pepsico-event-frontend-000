import axios from "axios";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get("http://127.0.0.1:8000/get_products_data", {
      responseType: "arraybuffer",
    });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=products_data.csv"
    );
    res.send(Buffer.from(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
}
