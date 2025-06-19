import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../utils/axios'

const useFetchData = (urldata) => {
    const [data,setData]=useState([])
    const fetchData=async()=>{
        try {
            const resp=await axiosPrivate({
                ...urldata
            })
            console.log(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
  return data;
}

export default useFetchData