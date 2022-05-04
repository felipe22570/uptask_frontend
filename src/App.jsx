import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import EditarProyecto from "./pages/EditarProyecto";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import NuevoColaborador from "./pages/NuevoColaborador";
import NuevoProyecto from "./pages/NuevoProyecto";
import Proyecto from "./pages/Proyecto";
import Proyectos from "./pages/Proyectos";
import Register from "./pages/Register";

const App = () => {
   return (
      <BrowserRouter>
         <AuthProvider>
            <ProyectosProvider>
               <Routes>
                  <Route path="/" element={<AuthLayout />}>
                     <Route index element={<Login />} />
                     <Route path="registrar" element={<Register />} />
                     <Route path="forgot-password" element={<ForgotPassword />} />
                     <Route path="forgot-password/:token" element={<NewPassword />} />
                     <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                  </Route>

                  <Route path="/proyectos" element={<RutaProtegida />}>
                     <Route index element={<Proyectos />} />
                     <Route path="crear-proyecto" element={<NuevoProyecto />} />
                     <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
                     <Route path=":id" element={<Proyecto />} />
                     <Route path="editar/:id" element={<EditarProyecto />} />
                  </Route>
               </Routes>
            </ProyectosProvider>
         </AuthProvider>
      </BrowserRouter>
   );
};

export default App;
