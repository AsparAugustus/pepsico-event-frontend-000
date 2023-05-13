import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/ExitSurvey.module.css';

const ExitSurvey = () => {
  const [rating, setRating] = useState(0);
  const [like, setLike] = useState('');
  const [improvement, setImprovement] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit form data to backend
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Bazaar Survey</title>
      </Head>
      <h2 className={styles.title}>Product Bazaar Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.question}>
          <label htmlFor="rating">Rate your Overall experience of Product Bazaar:</label>
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index + 1 <= rating ? styles.activeStar : ''}
                onClick={() => setRating(index + 1)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div className={styles.question}>
          <label htmlFor="like">What did you like about the initiative?</label>
          <textarea
            id="like"
            className={styles.textarea}
            value={like}
            onChange={(e) => setLike(e.target.value)}
          />
        </div>
        <div className={styles.question}>
          <label htmlFor="improvement">
            What could be the improvement areas which can be included in future?
          </label>
          <textarea
            id="improvement"
            className={styles.textarea}
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
          />
        </div>
        <div className={styles.question}>
          <label htmlFor="feedback">Overall Feedback and Comments (if any)</label>
          <textarea
            id="feedback"
            className={styles.textarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExitSurvey;
