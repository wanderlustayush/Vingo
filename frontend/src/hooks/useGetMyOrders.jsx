import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders, setUserData } from '../redux/userSlice'
import { setMyShopData } from '../redux/ownerSlice'

function useGetMyOrders() {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return
                const result = await axios.get(`${serverUrl}/api/order/my-orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                dispatch(setMyOrders(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrders()
    }, [userData])
}

export default useGetMyOrders
