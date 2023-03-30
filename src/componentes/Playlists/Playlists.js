import axios from "axios";
import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";


function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const headers = {
        headers: {
          Authorization: "gabriel-castro-ozemela"
        }
    }
    
    const getAllPlaylists = () =>{
        axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists',
        headers)
        .then((answer)=>{
            
            setPlaylists(answer.data.result.list)
        }).catch((error)=>{
            console.log(error.response)
        })
    }
    useEffect(()=>{
        getAllPlaylists()
    },[])

    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
