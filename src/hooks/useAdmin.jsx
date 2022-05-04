import useAuth from "./useAuth";
import useProyectos from "./useProyectos";

const useAdmin = () => {
   const { proyecto } = useProyectos();
   const { auth } = useAuth();

   const admin = proyecto.creador === auth._id;

   return admin;
};

export default useAdmin;
