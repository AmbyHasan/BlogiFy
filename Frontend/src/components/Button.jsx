import React from 'react'

const Button = ({
    
    //default properties of the button  ,if someone sends some other properties the default ones will be overridden
    children ,   //other components 
    type="button" ,
    bgColor="bg-blue-600", 
    textColor="text-white",
    className="",
    ...props //additional properties send by the user

}) => {

  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>
        {children}
    </button>
  )
}

export default Button
