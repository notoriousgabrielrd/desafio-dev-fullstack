import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SimularPage from './pages/SimularPage';
import ListagemPage from './pages/ListagemPage';
import HomePage from './pages/HomePage';
import UnidadePage from './pages/UnidadePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/simular" element={<SimularPage />} />
        <Route path="/listagem" element={<ListagemPage />} />
        <Route path="/unidade/:leadId/:unidadeId" element={<UnidadePage />} />
      </Routes>
    </Router>
  );
}

export default App;
