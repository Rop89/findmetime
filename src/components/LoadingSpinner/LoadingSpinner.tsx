// components/LoadingSpinner.tsx

import React from 'react';
import styles from './loadingspinner.module.css'; // Import the CSS module

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Hang tight ⏳</p>
      <br></br>
      <p>We&rsquo;re digging through your schedule to find the best time-saving tips...</p>
      <p>This might take a minute, but it&rsquo;ll be worth it!</p>
    </div>
  );
};

export default LoadingSpinner;
