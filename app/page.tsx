import Image from 'next/image'
import Styles from './page.module.sass'

export default function Home() {
  return (
    <>
      <form
      className={Styles.Form}
    >
      <input type='search' />
      <input type="button" value='Search' />
    </form>
    </>
    
  )
}
