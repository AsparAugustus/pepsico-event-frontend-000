import React, { useState } from 'react';
import styles from '../styles/Admin.module.css';
import { useRouter } from 'next/router';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('Please enter both username and password.');
    } else {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        console.log("data", data)
        if (data.success) {
        console.log(data, data.success)
          router.push('/AdminDashboard'); // Redirect to the admin dashboard page
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
    <h3 className={styles.title}>Admin Login</h3>
    <div className={styles.container}>

        <button onClick={() => console.log(username, password)}>check state</button>
   
      <form className={styles.form} onSubmit={handleLogin}>
        <label className={styles.label}>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.inputText} />
        </label>
        <label className={styles.label}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputPassword} />
        </label>
        <button type="submit" className={styles.buttonSubmit}>Login</button>
      </form>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
    </>
  );
};

export default Admin;
