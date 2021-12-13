import React from 'react'
import TopNav from '../../components/auth/TopNav'

export default function Forbidden() {
    return (
        <>
        <TopNav />
        <div className='centerForbidden'><h2 style={{textAlign:"center"}}>Forbidden page!!</h2></div> 
            
        </>
    )
}
 