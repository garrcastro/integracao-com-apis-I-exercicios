import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios'



export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [artist, setArtist] = useState('')
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    const headers = {
        headers: {
          Authorization: "gabriel-castro-ozemela"
        }
    }
    console.log(props)
    const getPlaylistTracks = () =>{
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, headers)
        .then((response)=>{
            console.log(response)
            setMusicas(response.data.result.tracks)
        })
        .catch((error)=>{
            console.log(error.response)
        })
    }

    useEffect(()=>{
        getPlaylistTracks()
    },[])

    const addTrackToPlaylist = (name, artist, url) =>{
        const body = {
            name,
            artist,
            url
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,body, headers)
        .then(()=>{
            
            getPlaylistTracks()
            setArtist('')
            setName('')
            setUrl('')
            alert('Música cadastrada!')
        }).catch((error)=>{
            console.log(error.response)
        })
    }

    const removeTrackFromPlaylist = (musica) =>{
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${musica.id}`, headers)
        .then((answer)=>{
            alert('Música removida')
            getPlaylistTracks()
            console.log(answer)
        }).catch((error)=>{
            console.log(error.response)
        })
    }
    
    
    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeTrackFromPlaylist(musica)}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artist} onChange={(e)=>{setArtist(e.target.value)}}/>
                <InputMusica placeholder="musica" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <InputMusica placeholder="url" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
                <Botao onClick={()=>{addTrackToPlaylist(name, artist, url)}}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

