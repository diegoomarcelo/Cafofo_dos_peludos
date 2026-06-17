import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./paginas/Home";
import Login from "./paginas/Login";
import Dashboard from "./paginas/Dashboard";
import Pets from "./paginas/Pets";
import Tutores from "./paginas/Tutores";
import Solicitacoes from "./paginas/Solicitacoes";
import Relatorio from "./paginas/Relatorio";
import FAQ from "./paginas/FAQ";
import ComoAdotar from "./paginas/ComoAdotar";
import Feiras from "./paginas/Feiras";
import PeludosPublicos from "./paginas/PeludosPublicos";

import PrivateRoute from "./componentes/PrivateRoute";
import Layout from "./componentes/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/peludos" element={<PeludosPublicos />} />
      <Route path="/como-adotar" element={<ComoAdotar />} />
      <Route path="/feiras" element={<Feiras />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/pets"
        element={
          <PrivateRoute>
            <Layout>
              <Pets />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/tutores"
        element={
          <PrivateRoute>
            <Layout>
              <Tutores />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/solicitacoes"
        element={
          <PrivateRoute>
            <Layout>
              <Solicitacoes />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/relatorio"
        element={
          <PrivateRoute>
            <Layout>
              <Relatorio />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;