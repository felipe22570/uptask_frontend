import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
   const navigate = useNavigate();
   const [proyectos, setProyectos] = useState([]);
   const [alerta, setAlerta] = useState({});
   const [proyecto, setProyecto] = useState([]);
   const [loading, setLoading] = useState(false);
   const [modal, setModal] = useState(false);
   const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
   const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
   const [buscador, setBuscador] = useState(false);
   const [tarea, setTarea] = useState({});
   const [colaborador, setColaborador] = useState({});

   const { auth } = useAuth();

   useEffect(() => {
      socket = io(import.meta.env.VITE_BACKEND_URL);
   }, []);

   const submitProyecto = async (proyecto) => {
      if (proyecto.id) {
         await editarProyecto(proyecto);
      } else {
         await nuevoProyecto(proyecto);
      }
   };

   const editarProyecto = async (proyecto) => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);

         const proyectosActualizados = proyectos.map((proyectoState) =>
            proyectoState.id === data.id ? data : proyectoState
         );

         setProyectos(proyectosActualizados);

         setAlerta({
            msg: "Proyecto actualizado correctamente",
            error: false,
         });

         setTimeout(() => {
            setAlerta({});
            navigate("/proyectos");
         }, 3000);
      } catch (error) {
         console.log(error);
      }
   };

   const nuevoProyecto = async (proyecto) => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.post("/proyectos", proyecto, config);

         setProyectos([...proyectos, data]);

         setAlerta({
            msg: "Proyecto creado correctamente",
            error: false,
         });

         setTimeout(() => {
            setAlerta({});
            navigate("/proyectos");
         }, 3000);
      } catch (error) {
         console.log(error);
      }
   };

   const obtenerProyecto = async (id) => {
      setLoading(true);
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const {
            data: { proyecto },
         } = await clientAxios(`/proyectos/${id}`, config);

         setProyecto(proyecto);
      } catch (error) {
         navigate("/proyectos");
         console.log(error);
      }

      setLoading(false);
   };

   const eliminarProyecto = async (id) => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.delete(`/proyectos/${id}`, config);

         const proyectosActualizados = proyectos.filter((p) => p.id !== id);

         setProyectos(proyectosActualizados);

         setAlerta({
            msg: data.msg,
            error: false,
         });

         setTimeout(() => {
            setAlerta({});
            navigate("/proyectos");
         }, 3000);
      } catch (error) {
         console.log(error);
      }
   };

   const crearTarea = async (tarea) => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.post(`/tareas/`, tarea, config);

         //Agrega tareas al state
         // const proyectoActualizado = { ...proyecto };
         // proyectoActualizado.tareas = [...proyecto.tareas, data];

         // setProyecto(proyectoActualizado);
         setModal(false);

         //Socket.io
         socket.emit("nueva tarea", data);
      } catch (error) {
         console.log(error);
      }
   };

   const editarTarea = async (tarea) => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.put(`/tareas/${tarea.idTarea}`, tarea, config);

         //Socket
         socket.emit("actualizar tarea", data);

         setAlerta({});
         setModal(false);
      } catch (error) {
         console.log(error);
      }
   };

   const submitTarea = async (tarea) => {
      if (tarea.idTarea) {
         await editarTarea(tarea);
      } else {
         await crearTarea(tarea);
      }
   };

   const eliminarTarea = async () => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.delete(`/tareas/${tarea._id}`, config);

         //Socket
         socket.emit("eliminar tarea", tarea);

         setAlerta({});
         setModalEliminarTarea(false);
         setTarea({});
      } catch (error) {
         console.log(error);
      }
   };

   const submitColaborador = async (email) => {
      setLoading(true);
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.post(`/proyectos/colaboradores`, { email }, config);
         setColaborador(data);

         setAlerta({});
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         });
      }
      setLoading(false);
   };

   const agregarColaborador = async (email) => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.post(
            `/proyectos/colaboradores/${proyecto._id}`,
            email,
            config
         );
         setColaborador({});

         setAlerta({
            msg: data.msg,
            error: false,
         });

         setTimeout(() => {
            setAlerta({});
         }, 3000);
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true,
         });
      }
   };

   const eliminarColaborador = async () => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.post(
            `/proyectos/eliminar-colaborador/${proyecto._id}`,
            { id: colaborador._id },
            config
         );

         const proyectoActualizado = { ...proyecto };
         proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(
            (c) => c._id !== colaborador._id
         );
         setProyecto(proyectoActualizado);

         setColaborador({});
         setModalEliminarColaborador(false);

         setAlerta({
            msg: data.msg,
            error: false,
         });

         setTimeout(() => {
            setAlerta({});
         }, 3000);
      } catch (error) {}
   };

   const completarTarea = async (tarea) => {
      try {
         const token = localStorage.getItem("token");

         if (!token) {
            return;
         }

         const config = {
            headers: {
               "Content-type": "application/json",
               Authorization: `Bearer ${token}`,
            },
         };

         const { data } = await clientAxios.post(`/tareas/estado/${tarea}`, {}, config);

         socket.emit("cambiar estado", data);

         setTarea({});
         setAlerta({});
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      const obtenerProyectos = async () => {
         try {
            const token = localStorage.getItem("token");

            if (!token) {
               return;
            }

            const config = {
               headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`,
               },
            };

            const { data } = await clientAxios("/proyectos", config);

            setProyectos(data);
         } catch (error) {
            console.log(error);
         }
      };

      obtenerProyectos();
   }, [auth]);

   //Socket.io

   const submitTareasProyectos = (tarea) => {
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];

      setProyecto(proyectoActualizado);
   };

   const eliminarTareaProyecto = (tarea) => {
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter((t) => t._id !== tarea._id);
      setProyecto(proyectoActualizado);
   };

   const actualizarTareaProyecto = (tarea) => {
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map((t) =>
         t._id === tarea._id ? tarea : t
      );
      setProyecto(proyectoActualizado);
   };

   const cambiarEstadoTarea = (tarea) => {
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map((t) =>
         t._id === tarea._id ? tarea : t
      );
      setProyecto(proyectoActualizado);
   };

   const cerrarSesion = () => {
      setProyectos([]);
      setProyecto({});
      setAlerta({});
   };

   return (
      <ProyectosContext.Provider
         value={{
            proyectos,
            setProyectos,
            alerta,
            setAlerta,
            submitProyecto,
            obtenerProyecto,
            proyecto,
            loading,
            eliminarProyecto,
            modal,
            setModal,
            submitTarea,
            tarea,
            setTarea,
            modalEliminarTarea,
            setModalEliminarTarea,
            eliminarTarea,
            submitColaborador,
            colaborador,
            setColaborador,
            agregarColaborador,
            modalEliminarColaborador,
            setModalEliminarColaborador,
            eliminarColaborador,
            completarTarea,
            buscador,
            setBuscador,
            submitTareasProyectos,
            eliminarTareaProyecto,
            actualizarTareaProyecto,
            cambiarEstadoTarea,
            cerrarSesion,
         }}
      >
         {children}
      </ProyectosContext.Provider>
   );
};

export { ProyectosProvider };

export default ProyectosContext;
