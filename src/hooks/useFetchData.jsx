import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../utils/axios'

const useFetchData = (urldata,page,limit) => {
    const [data,setData]=useState([])
    const [refresh,setRefresh]=useState(true)
    const [loading,setLoading]=useState(false)
    const fetchData=async()=>{
        try {
            setLoading(true)
            let {url,method}=urldata
            url=`${url}?page=${page}&size=${limit}`
            const resp=await axiosPrivate({
                url,method
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
    },[refresh,page,limit])
    const refetchData=()=>{
        setRefresh(!refresh)
    }
  return [data,refetchData,loading];
}

export default useFetchData