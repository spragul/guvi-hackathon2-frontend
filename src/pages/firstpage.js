import { Button } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


export function Firstpage() {
    const history =useHistory();
    useEffect(()=>{
      sessionStorage.clear();
    },[])
    return (
        <div>
            <h1 style={{color:"green"}}>WELCOME TO RENTAL APP</h1>
            <h3>Furnish your dreams with our rentals</h3>
            <img style={{ width: "70%", height: "70vh" }} src="https://play-lh.googleusercontent.com/ETHilNH_Inz0DfCyeO5ALPwrbt1LLHSdg9Sm6cmNJPeuadzO26HaFHtO0VULkSP7cy8" alt="RENTAL APP"></img>
           <div style={{padding:"10px"}}>
           <Button onClick={()=>history.push("/login")} style={{backgroundColor:"yellow",color:"red",borderRadius:"10px",width:"400px",height:"100px",fontSize:"30px"}} className="firstpage-button">Log In</Button>
           </div>
        
        </div>
    )
}