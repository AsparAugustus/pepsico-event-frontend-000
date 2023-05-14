import React from 'react'
import { useState } from 'react'

const IsDevelopment = ({children}) => {

    const [isDevelopmentState, setIsDevelopmentState] = useState(
    process.env.NODE_ENV === "development"
    );

      { isDevelopmentState ? children : null 

      }
}

export default IsDevelopment