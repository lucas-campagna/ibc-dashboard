import { HashRouter, Routes, Route } from 'react-router';
import Base from './components/Base';
import Home from './components/Home';
import Frequencia from './pages/Frequencia';
import Tesouraria from './pages/Tesouraria';

function App() {
  return (
    <HashRouter>
      <Base>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/frequencia" element={<Frequencia />} />
          <Route path="/tesouraria" element={<Tesouraria />} />
        </Routes>
      </Base>
    </HashRouter>
  );
}

export default App;
