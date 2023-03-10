import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages / components
import Deadlines from './components/Deadlines';
import Plan from './components/Plan';
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Music from "./components/Music";
import Goals from './components/Goals';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="base h-screen bg-blue-200 font-nunito flex flex-col">
            <Navbar/>
            <div className='grid grid-cols-7 flex-grow'>
              <Routes>
                <Route
                  path='/plans'
                  exact
                  element={<Plan/>}
                />
                <Route
                  path='/deadlines'
                  exact
                  element={<Deadlines/>}
                />
                <Route
                  path='/goals'
                  exact
                  element={<Goals/>}
                />
                <Route
                  path='/calendar'
                  exact
                  element={<Calendar/>}
                />
              </Routes>
              <Menu/>
              <Music/>
            </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
