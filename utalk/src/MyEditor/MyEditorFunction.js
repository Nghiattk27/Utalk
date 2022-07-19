import React from 'react'
import MyEditor from './MyEditor';
import { useLocation, useNavigate } from 'react-router-dom';

function MyEditorFunction() {

    let location = useLocation();
    let query = new URLSearchParams(location.search);
    let navigate = useNavigate();

    const navigation = () => {
        // navigate(`/Profile?id=${query.get('id')}`)
        alert("ngu")
    }
    return (
        <div className='MyEditorFunction'>
            <MyEditor userId={query.get('id')} navigate={navigation} />
        </div>
    )
}

export default MyEditorFunction