import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Users } from './pages/Users'
import { EditUser } from './pages/EditUser'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/user/:id' element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
