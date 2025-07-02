import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../utils/axios'

const useFetchData = (urldata) => {
    const [data,setData]=useState([])
    const [refresh,setRefresh]=useState(true)
    const fetchData=async()=>{
        try {
            const resp=await axiosPrivate({
                ...urldata
            })
           if(resp?.data?.length>0)
           {
            setData(resp?.data)
           }
           else{
            setData([])
           }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
  return [data,refresh.setRefresh];
}

export default useFetchData