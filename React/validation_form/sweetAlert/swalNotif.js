import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

export const SwalNotification = ( {...props}) => {
   return MySwal.fire(props)
}

export const showLoading =()=>{
    MySwal.showLoading();
} 
