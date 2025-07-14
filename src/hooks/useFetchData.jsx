import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../utils/axios'

const useFetchData = (urldata) => {
    const [data,setData]=useState([])
    const [refresh,setRefresh]=useState(true)
    const [loading,setLoading]=useState(false)
    const fetchData=async()=>{
        try {
            setLoading(true)
            const resp=await axiosPrivate({
                ...urldata
            })
            setData(resp?.data)
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[refresh])
    const refetchData=()=>{
        setRefresh(!refresh)
    }
  return [data,refetchData,loading];
}

export default useFetchData