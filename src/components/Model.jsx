import React, { Children, useEffect } from 'react'

const Model = ({children}) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
    
        // Re-enable scroll on unmount
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);
  return children
}

export default Model