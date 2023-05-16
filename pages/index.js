import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import labels_count from '../data/labels_count'
import IsDevelopment from '../Components/IsDevelopment';

export default function Home() {
  return (
   <>

  <IsDevelopment>



    <Link href="/Admin">
      <div className={styles.link}>Admin login page</div>
    </Link>


  </IsDevelopment>
    

  {labels_count.categories.map((category) => (
        <div key={category}>
          <Link href={`/category/${category}`}>
            <div>{category}</div>
          </Link>
        </div>
      ))}



    <Link href="/ExitSurvey">
      <div className={styles.link}>Exit survey</div>
    </Link>




   </>
  )
}
