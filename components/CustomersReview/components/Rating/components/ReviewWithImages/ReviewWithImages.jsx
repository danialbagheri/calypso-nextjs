import * as React from 'react'

import styles from './reviewWithImages.module.css'

function ReviewWithImages() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Reviews with images</span>
      </div>
      <div className={styles.imagesContainer}>
      </div>
    </div>
  )
}

export default ReviewWithImages