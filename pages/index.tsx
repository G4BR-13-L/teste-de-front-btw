import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../sass/Home.module.scss'

const Home: NextPage = () => {
  
  // Definição do tipo post
  type post = {
    userId: number,
    id: number,
    title: string
    body: string
  }

  // Estado que guarda o array de posts da página
  const [posts, setPosts] = useState<post[]>([]);


  /**
   * Esse useEffect deve ser executado em primeiro lugar no 
   * momento de Hydration da página. Ele, até o momento é
   * inteiramente responsável por ler os dados da API 
   */
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      }).catch((err) => { 
        /**
         * Em caso de erro é disparadas essa exceção no terminal
         */
        console.error('Falha ao buscar dados da api')
      });
  }, []);



  return (
    <div className={styles.container}>
      <Head>
        <title>Teste de front-end</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {
          posts.map((item, key) => {
            return(
              <div key={key}>
                <p>UserId: {item.userId}</p>
                <p>Id: {item.id}</p>
                <p>title: {item.title}</p>
                <p>body: {item.body}</p>
                <hr />
              </div>
              );
          })
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home