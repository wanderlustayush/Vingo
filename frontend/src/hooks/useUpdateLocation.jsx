import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'


function useUpdateLocation() {
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        const updateLocation = async (lat, lon) => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return
                const result = await axios.post(`${serverUrl}/api/user/update-location`, { lat, lon }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log(result.data)
            } catch (error) {
                console.log(error)
            }
        }

        navigator.geolocation.watchPosition((pos) => {
            updateLocation(pos.coords.latitude, pos.coords.longitude)
        })
    }, [userData])
}

export default useUpdateLocation
