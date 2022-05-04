import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
   return (
      <>
         <main className="container mx-auto mt-3 md:mt-10 p-5 md:flex md:justify-center">
            <div className="md:w-2/3 lg:w-3/6 ">
               <Outlet />
            </div>
         </main>
      </>
   );
};

export default AuthLayout;
