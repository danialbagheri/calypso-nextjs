// import React from "react";
import {useEffect, useState} from 'react'
import data from '../../data.json'

export default function TopBar() {
  const [message, setMessage] = useState(null)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    async function getTopBarStatus() {
      const endpoint = data.apiUrl + 'web/configuration/top_bar/'
      const res = await fetch(endpoint)
      const json = await res.json()
      setMessage(json)
    }
    getTopBarStatus()
  }, [])

  if (message && message.active) {
    return (
      <div className="top-bar">
        <p className="text-white text-centre">{message.value}</p>
      </div>
    )
  }
  return null
}
