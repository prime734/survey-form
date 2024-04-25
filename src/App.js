import Form from './components/form/Sform'
import Results from './components/results/Sresults'
import Nav from './components/nav/Nav'
import Typ from './components/typ/Typ'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/results' element={<Results />} />
        <Route path='/typ' element={<Typ />} />
      </Routes>
    </div>
  );
}

export default App;
