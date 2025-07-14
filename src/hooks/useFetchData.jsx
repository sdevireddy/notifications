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
            setData(resp?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchData()
    },[refresh])
    const refetchData=()=>{
        setRefresh(!refresh)
    }
  return [data,refetchData];
}

export default useFetchData