import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NavigateProfile(userId) {

    let navigate = useNavigate();
    useEffect(() => {
        navigate(`/Profile?id=${userId.userId}`)
    }, [])
    return (
        <div className='NavigateProfile'>

        </div>
    )
}

export default NavigateProfile