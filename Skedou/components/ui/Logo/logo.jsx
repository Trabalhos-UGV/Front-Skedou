import React, { Children } from "react"
import logo from "../../../assets/images/logo.png"
import '../Logo/logo.css'

export function Profile() {
  return <img src={logo} alt="imagem da logo" className="logo"/>
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  )
}
