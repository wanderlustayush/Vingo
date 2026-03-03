import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity, setUserData } from '../redux/userSlice'

function useGetShopByCity() {
    const dispatch = useDispatch()
    const { currentCity } = useSelector(state => state.user)
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return
                const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                dispatch(setShopsInMyCity(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchShops()
    }, [currentCity])
}

export default useGetShopByCity
