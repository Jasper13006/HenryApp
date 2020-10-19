import React from 'react'


export default function circle({state}){
    return(
        <>
        {state &&
        <>
        {state==="on"?
        <div style={{
            backgroundColor:"green",
            borderRadius:"50%",
            width:"8px",
            height:"8px"}}></div>
        :state==="off"? <div style={{
            backgroundColor:"red",
            borderRadius:"50%",
            width:"8px",
            height:"8px"}}></div>
        :null}
        </>
        }
        </>
    )
}