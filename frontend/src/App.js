import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
  
// pages / components
import Deadlines from './components/Deadlines';
import Plan from './components/Plan';
import Calendar from './components/Calendar';
import Base from './layouts/Base';
import Home from './layouts/Home';
import Do from './layouts/Do';
import NotFound from './layouts/NotFound';
import Login from './layouts/Login';
import Signup from './layouts/Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Base/>}>
      <Route index element={<Home/>}></Route>
      <Route path='signup' element={<Signup/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='do' element={<Do/>}>
        <Route path='calendar' element={<Calendar/>}></Route>
        <Route path='plans' element={<Plan/>}></Route>
        <Route path='deadlines' element={<Deadlines/>}></Route>
        <Route path='goals' element={<Deadlines/>}></Route>
      </Route>

      <Route path='*' element={<NotFound/>}/>
    </Route>
  )
)

function App() {

  return (
    <div className="App">
      <RouterProvider
        router={router}
      />
    </div>
  );
}

export default App;
