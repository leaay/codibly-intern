import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import {} from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ProductModal from '@/components/ProductModal'
import { useRouter } from 'next/router'

export type product = {
  id: number,
  name: string,
  pantone_value: string,
  year: number,
  color: string,
}



export default function Home() {


    const [currentPage , setCurrentPage] = useState<number>(1)
    const [searchInput , setSearchInput] = useState<string>('')
    const [search, setSearch] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalProduct, setModalProduct] = useState<product>()

    const {query} = useRouter()
    console.log(query)

    const { data:products, isLoading, error , refetch , isFetching} = useQuery([ search , currentPage], async ()=>{
      const res = await fetch(`https://reqres.in/api/products?page=${currentPage}&per_page=5&id=${search}`)
      return res.json()
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: ()=>setSearchInput(''),
    })

    function handlePage(page: number){
      setCurrentPage(currentPage+page)
      refetch()
    }

    function handleSearch(){
      setSearch(searchInput)
      refetch()
      
    }

    function handleModal(product: product){
      setModalProduct(product)
      setIsModalOpen(true)
    }


  useEffect(()=>{

    if(query.page){
      setCurrentPage(Number(query.page))
      refetch()
    }
    if(query.id){
      setSearch(String(query.id))
      refetch()
    }


  },[query])

  
  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Something went wrong, please try agian later.</div>

  return (
    <>
      <Head>
        <title>Recruitment task - Codibly </title>
        <meta name="description" content="Recruitment task" />
      </Head>

      <main className={styles.main}>

        <div className={styles.tableBody}>

            <div className={styles.searchBox}>
              <input disabled={isFetching} onChange={({target})=>{setSearchInput(String(target.value))}}   placeholder='search products' type='number' />
              <button disabled={isFetching} className='btn' onClick={handleSearch} ><SearchIcon/></button>
            </div>

            <div className={styles.productItem} style={{backgroundColor:`gray`, fontWeight:'bolder'}} >
              <p>id</p>
              <p>name</p>
              <p>year</p>
            </div>

             

            
                {

                !products.data ? 
                
                  <p>No results</p>:
                
                  search === '' ?
                
                      products.data.map((product: product)=> <button onClick={()=>handleModal(product)} className={styles.productItem} style={{backgroundColor:`${product.color}7A`}} key={product.id}>
                        <p>{product.id}</p>
                        <p>{product.name}</p>
                        <p>{product.year}</p>
                      </button> ) : 

                      <button onClick={()=>handleModal(products.data)}  className={styles.productItem} style={{backgroundColor:`${products?.data.color}7A`}} >
                        <p>{products?.data.id}</p>
                        <p>{products?.data.name}</p>
                        <p>{products?.data.year}</p>
                      </button>

                }

              
            {isModalOpen && <ProductModal data={modalProduct} close={setIsModalOpen} />}





            
            {products.page ? 
            <div className={styles.pagination}>
              {currentPage !== 1 && <button className='btn' onClick={()=>handlePage(-1)} disabled={isFetching} ><ArrowBackIcon /></button> }
              <p>{currentPage}</p>
              {products.total_pages !== currentPage && <button className='btn' onClick={()=>handlePage(1)} disabled={isFetching} ><ArrowForwardIcon/></button> }
            </div> : 
            null
            }



        </div>

      </main>
    </>
  )
}


// onChange={({target})=>{setSearch(String(target.value)) ; refetch()}}
//onChange={({target})=>setSearch(target.value)}
