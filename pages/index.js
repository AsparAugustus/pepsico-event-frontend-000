import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import labels_count from '../data/labels_count'

export default function Home() {
  return (
   <>
     <ul>
      {labels_count.categories.map((category) => (
        <li key={category}>
          <Link href={`/category/${category}`}>
            <div>{category}</div>
          </Link>
        </li>
      ))}
    </ul>

        <Link href="/Admin">
      <div className={styles.link}>Admin login page</div>
    </Link>
    <Link href="/ExitSurvey">
      <div className={styles.link}>Exit survey</div>
    </Link>
    <Link href="/Admin">
      <div className={styles.link}>Admin login</div>
    </Link>



   </>
  )
}
