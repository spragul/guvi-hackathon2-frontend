import axios from "axios";
import { useEffect, useState } from "react"
import { mainurl } from "../App";
import Sidebar from "../sidebar/sidebar";


export function UserList() {
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('myRole');

    const getuser = async () => {
        try {
            let response = await axios.get(`${mainurl}/user`, { headers: { "Authorization": `Bearer ${token}` } });
            setUser(response.data.user);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
    useEffect(() => {
        getuser();
    },[])
    return (

            <div className="order-container" style={{ height: "100vh" }}>
                <div className="list-orders">
                    <h2>User list</h2>
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Role</th>
                                <th>createdAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {role === 'admin' ?<>{ user.map((x) => (
                                    <tr key={x._id}>
                                        <td>{x._id}</td>
                                        <td>{x.name}</td>
                                        <td>{x.email}</td>
                                        <td>{x.mobile}</td>
                                        <td>{x.role}</td>
                                        <td>{x.createdAt}</td>
                                    </tr>
                                ))
                            }</> : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

    )
}