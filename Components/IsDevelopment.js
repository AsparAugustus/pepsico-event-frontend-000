import React from 'react'
import { useState } from 'react'

const IsDevelopment = ({children}) => {

    const [isDevelopmentState] = useState(
        process.env.NODE_ENV === "development"
    );
        return( isDevelopmentState ? children : null)
}

export default IsDevelopment