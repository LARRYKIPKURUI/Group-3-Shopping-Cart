import React, { createContext } from "react";
import { useContext, useState } from "react";
import { useFetch } from "./ContextFetch";
import swal from "sweetalert";

// Data Post
export const PostContext = createContext();

export const PostData = ({children}) => {

    const [postload, setpostload] = useState(false)
    const { fetchData } = useFetch();
    // post userdata

    const pData = async(newUser) => {
        try{
            setpostload(true)
            const res = await fetch("https://json-server-1-c3fk.onrender.com/users",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser),
            })
        
            if (!res.ok) throw new Error("Failed to post user")

            swal("Success", "User added successfully", "success");
        }
        catch(error){
            swal("Error posting data", error.message)
        }
        finally{
            setpostload(false)
        }
    }

    // post newproduct

    const pProduct = async(newProduct) => {
        try{
            setpostload(true)
            const res = await fetch("https://json-server-1-c3fk.onrender.com/products",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct),
            })
        
            if (!res.ok) throw new Error("Failed to post user")

            swal("Success", "Product added successfully", "success");
            fetchData();
        }
        catch(error){
            swal("Error posting data", error.message)
        }
        finally{
            setpostload(false)
        }
    }


    // Enable global context

  return(
    <PostContext.Provider value = {{pData, pProduct, postload}}>
    {children}
    </PostContext.Provider>
  )

}



// Global postdata

export const usePost = () => useContext(PostContext)