import SyncLoader from "react-spinners/SyncLoader";


import React from 'react'

const Loader = (show) => {
    return show && (
        <div>
            <SyncLoader color='royalblue'/>
        </div>
    )
}

export default Loader

