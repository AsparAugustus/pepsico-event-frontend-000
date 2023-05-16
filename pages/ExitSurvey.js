import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/ExitSurvey.module.css';
import IsDevelopment from '../Components/IsDevelopment';

const ExitSurvey = () => {
  const [rating, setRating] = useState(0);
  const [like, setLike] = useState('');
  const [improvement, setImprovement] = useState('');
  const [feedback, setFeedback] = useState('');



  const resetForm = () => {
    setRating(0);
    setLike('');
    setImprovement('');
    setFeedback('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit form data to backend

    async function submitFeedback(data) {
      try {
        const response = await fetch("/api/post_exitsurvey", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        window.alert(`Feedback submitted successfully, thank you.`);

        resetForm()

        window.location.href = "/ThankYouPage";

        return result;
      } catch (error) {
        console.error(error);
        window.alert(`Submission failed, please try again or contact adminstrator. Error: ${error.message}`);
        return { error: "Failed to update feedback." };
      }
    }
    const stars = rating
    const initiative = like
    const further_improvement = improvement
    submitFeedback({ stars, initiative, further_improvement, feedback });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Product Bazaar Survey</title>
      </Head>
      <h2 className={styles.title}>Product Bazaar Survey</h2>

      <IsDevelopment>
      <button onClick={() => {console.log(rating,  like, improvement, feedback)}}>Test</button>
      </IsDevelopment>

      
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
