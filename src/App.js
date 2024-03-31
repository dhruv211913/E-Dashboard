import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LowFoot from './Components/LowFoot';
import Signin from './Components/Signin';
import Privatecmp from './Components/Privatcmp';
import AddProduct  from './Components/AddProduct';
import UserLogin from './Components/UserLogin';
import ProductsList from './Components/ProductsList';
import UpdateProduct from './Components/UpdateProduct';
import Edashboard from './Components/Edashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<Privatecmp/>}>
          <Route path='/' element={<Edashboard/>} />
          <Route path='/products' element={<ProductsList/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/profile' element={<h1>Profile Component</h1>} />
          <Route path='/logout' element={<h1>logout  Component</h1>} />

          </Route>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/login' element={<UserLogin/>} />

        





        </Routes>

      </BrowserRouter>
      <LowFoot/>
    
    </div>
  );
}

export default App;
