import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import { useQuery } from 'react-query'
import { useState } from 'react'


export type product = {
  id: number,
  name: string,
  pantone_value: string,
  year: number,
  color: string,
}



export default function Home() {


    const [currentPage , setCurrentPage] = useState<number>(1)


    const { data:products, isLoading, error , refetch , isFetching} = useQuery('posts', async ()=>{
      const res = await fetch(`https://reqres.in/api/products${'?page=' + currentPage}&per_page=5`)
      return res.json()
    },
    {
      refetchOnWindowFocus: false,
      
    })

    function handlePage(page: number){
      setCurrentPage(currentPage+page)
      refetch()
    }

  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong, please try agian later.</div>
  console.log(products.data)
  return (
    <>
      <Head>
        <title>Recruitment task - Codibly </title>
        <meta name="description" content="Recruitment task" />
      </Head>

      <main className={styles.main}>

        <div className={styles.tableBody}>

            <input type='number' />

            <div className={styles.productItem} style={{backgroundColor:`gray`, fontWeight:'bolder'}} >
              <p>id</p>
              <p>name</p>
              <p>year</p>
            </div>

            {products.data.map((product: product) => <div className={styles.productItem} style={{backgroundColor:`${product.color}7A`}} key={product.id}>
              <p>{product.id}</p>
              <p>{product.name}</p>
              <p>{product.year}</p>
            </div>  )}

            <div className={styles.pagination}>
              <button onClick={()=>handlePage(-1)} disabled={isFetching} >Previous</button>
              <p>{currentPage}</p>
              <button onClick={()=>handlePage(1)  } disabled={isFetching} >NExt</button>
            </div>

        </div>

      </main>
    </>
  )
}


