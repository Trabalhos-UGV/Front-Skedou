import React, { Children } from "react"
import logo from "../../../assets/images/logo.png"

export function Profile() {
  return <img src={logo} alt="imagem da logo" />
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
