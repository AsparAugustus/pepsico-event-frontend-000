import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const flaskRes = await axios.post('http://127.0.0.1:8000/login', {
      username,
      password,
    });

    const data = flaskRes.data;

    console.log("oh hey", typeof(data.success), data)

    if (data.success) {
    // Login successful, redirect to admin dashboard

    console.log("oh hey2", typeof(data.success), data)
    // res.redirect('/AdminDashboard');
  
    return res.status(200).json({ success: true, message: 'Correct' });
    } else {
      // Login failed, display error message
      return res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }
}
