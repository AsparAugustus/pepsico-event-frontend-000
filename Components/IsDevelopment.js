import React from 'react'
import { useState } from 'react'

const IsDevelopment = ({children}) => {

const isDevelopment = process.env.NODE_ENV === 'development';

  if (isDevelopment) {
    return children;
  } else {
    return null;
  }
};

export default IsDevelopment