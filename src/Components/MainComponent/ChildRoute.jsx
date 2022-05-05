import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthRoute } from '../../App'
import { BusList } from './BusList/BusList'

export const ChildRoute = ({path}) => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={`${path}/search`} element={<AuthRoute><BusList/></AuthRoute>} />
    </Routes>
  </BrowserRouter>
  )
}
