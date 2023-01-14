
import React from 'react'
import type { product } from '../pages/index'
import styles from '../styles/modal.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import FocusTrap from 'focus-trap-react';

interface prop{
  data: product | undefined,
  close: (e:boolean) => void
}




const ProductModal = ({data , close}:prop) => {


  // function handleClose(e:React.MouseEvent<HTMLElement>){

  //   e.stopPropagation()
  //   close(false)

  // }


  return (
    <FocusTrap>
    <div className={styles.modalBody} >
        <div onClick={()=>close(false)} className={styles.closeArea}></div>
        <div style={{backgroundColor:`${data?.color}`}} className={styles.modalBox}>
          <div>
            <button onClick={()=>close(false)} className={`${styles.closeBtn} btn`}><CloseIcon /></button>
            <h3>Full product descripction:</h3>
            <p><span>color</span> - {data?.color}</p>
            <p><span>id</span> - {data?.id}</p>
            <p><span>name</span> - {data?.name}</p>
            <p><span>year</span> - {data?.year}</p>
            <p><span>pantone value</span> - {data?.pantone_value}</p>
          </div>
        </div>
    </div>
    </FocusTrap>

  )
}



export default ProductModal