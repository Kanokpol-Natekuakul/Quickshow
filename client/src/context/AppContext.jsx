import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from 'axios'
import { dummyShowsData } from '../assets/assets'
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const AppContext = createContext()


export const AppProvider=({children})=>{

    const [isAdmin,setIsAdmin]=useState(false)
    const [shows,setShows]=useState([])
    const [favoriteMovies,setFavoriteMovies]=useState([])

    const image_base_url=import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/original'

    const {user}=useUser()
    const{getToken}=useAuth()
    const location=useLocation()
    const navigate=useNavigate()

    const fetchIsAdmin=async()=>{
        try {
            const token = await getToken()
            const {data}=await axios.get('/api/admin/is-admin',{headers:{Authorization: token?`Bearer ${token}`:''}})
            setIsAdmin(data.isAdmin)

            if(!data.isAdmin && location.pathname.startsWith('/admin')){
                navigate('/')
                toast.error('Not authorized')
            }
        } catch (error) {
            console.error(error)
        }
    }


    const fetchShows=async()=>{
        try {
            setShows(dummyShowsData)
        } catch (error) {
            console.error(error)
        }
    }


    const fetchFavoriteMoives=async()=>{
        try {
            const ids = JSON.parse(localStorage.getItem('favorites')||'[]')
            const movies = dummyShowsData.filter(m=>ids.includes(m._id))
            setFavoriteMovies(movies)
        } catch (error) {
            console.error(error)
        }
    }

    const toggleFavorite = async (movieId)=>{
        const ids = JSON.parse(localStorage.getItem('favorites')||'[]')
        const next = ids.includes(movieId)? ids.filter(id=>id!==movieId) : [...ids,movieId]
        localStorage.setItem('favorites',JSON.stringify(next))
        await fetchFavoriteMoives()
        toast.success('Favorite movie updated')
    }

    useEffect(()=>{
        fetchShows()
    },[])

    useEffect(()=>{
        fetchFavoriteMoives()
        if(user){
            fetchIsAdmin()
        }
    },[user])

    const value={axios,fetchIsAdmin,user,getToken,navigate,isAdmin,shows,favoriteMovies,fetchFavoriteMoives,toggleFavorite,image_base_url}

    
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>useContext(AppContext)