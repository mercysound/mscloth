import React, { createContext, useContext, useRef } from "react";
const scrollContext = createContext()

const ScrollContexProvider = ({children})=>{
    const targetRef = useRef(null)
    const scrollToTarget = ()=>{
        targetRef.current.scrollIntoView({behaviour:"smooth"})
    }
    return(
        <scrollContext.Provider>
            {children}
        </scrollContext.Provider>
    )
}
const useScroll = ()=>{
    return useContext(scrollContext)
}