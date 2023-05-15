'use client'

import clsx from "clsx";
import { FC, ReactNode } from "react"

interface ButtonProps{
    type?:'button' |'submit' |'rest' |undefined,
    fullWidth?:boolean;
    children?:ReactNode;
    onClick?:()=>void
    secondary?:boolean;
    danger?:boolean;
    disabled?:boolean
}

const Button:FC<ButtonProps> = ({ type,
fullWidth,
children,
onClick,
secondary,
danger,
disabled}) => {
  return (
    <button onClick={onClick}
    type={type}
    disabled={disabled}
    className={clsx(``)}
    >
      
    </button>
  )
}

export default Button
