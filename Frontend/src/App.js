import './App.css';
import { Routes , Route } from 'react-router-dom';
import SignUp from './Components/Authenticate/signup';
import SignIn from './Components/Authenticate/signin';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
