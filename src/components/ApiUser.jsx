
import React, { useEffect, useState } from 'react'
import baseUrl from '../api/instance';
import { GET } from '../constants/httpMethod';

export default function ApiUser() {
    const[users,setUsers]=useState([]);
    const[idEdit,setIdEdit]=useState(null);
    const[user,setUser]=useState({
        name: "",
    avatar: "",
    status: true,
    id: ""
    })

    const fetchUsers=async()=>{
        try {
            const response=await baseUrl[GET]("users");
            setUsers(response.data)
            console.log(response.data);
        } catch (error) {
            
        }
        // fetch("https://674fada1bb559617b26fcc1c.mockapi.io/api/v1/users/users",{
            
        //     method:"GET",
        // }
        // )
        // .then((reponse)=> reponse.json())
        // .then((data)=>setUsers(data))
        // .catch((error)=>console.log(error))
        // .finally(()=>console.log("Hoan thanh"))
    }

    useEffect(
        ()=>{
            fetchUsers();
        },[]
    );
    const handleGetInfo=async(id)=>{
        try {
           const response=await baseUrl.get(`users/${id}`)
            console.log(response.data)
        } catch (error) {
            
        }
        
    }
    const handleDelete= async(id)=>{
       try {
        const response=await baseUrl.delete(`users/${id}`)
        if(response.status===200){
            fetchUsers();
        }
       } catch (error) {
        
       }
        
    }
    const handleChange=(e)=>{

        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value,
        });
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(idEdit){
            try {
              const response=  await baseUrl.put(`users/${idEdit}`,user)
              if(response.status===200){
                fetchUsers();
              }
            } catch (error) {
                
            }
        }else{
            try {
                const response=  await baseUrl.post(`users`,user)
                if(response.status===201){
                    fetchUsers();
                }
              } catch (error) {
                  
              }
           
        }
    }

    const handleEdit=(user)=>{
        setIdEdit(user.id);
        setUser(user);
    }
  return (
    <div>
        <h3>List user</h3>
        <table border={1}>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>Status</th> 
                    <th>Option</th> 
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>(
                    <tr>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.avatar }</td>
                        <td>{user.status?"active":"inactive"}</td>
                        <td>
                            <button onClick={()=>handleGetInfo(user.id)}>Views detail</button>
                            <button onClick={()=>handleEdit(user)}>Edit</button>
                            <button onClick={()=>handleDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                 ))}
            </tbody>
        </table>

        <form action="" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" name="name" id="" onChange={handleChange} value={user.name}/>
            </div>
            <div>
                <label htmlFor="">Avatar</label>
                <input type="text" name="avatar" id="" onChange={handleChange} value={user.avatar}/>
            </div>
            <button type='submit'>
                {idEdit?"Luu":"Them"}
                </button>
        </form>
    </div>
  )
}
