import React, { useState } from 'react'

export const userContext = React.createContext();

export default function AuthContext({children}) {
    const [userDetail, setUserDetail] = useState({});
    
  return (
      <userContext.Provider value={{userDetail, setUserDetail}}>
        {children}
      </userContext.Provider>
  )
}