import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrash } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

import React from 'react'

export default function AlbumsListItem({album}) {

    const[removeAlbum , results] = useRemoveAlbumMutation();
    const handleRemoveAlbum=()=>{
        removeAlbum(album);
    }

    const header = (
    <>
        <Button loading={results.isLoading} className='mr-2' onClick={handleRemoveAlbum}><GoTrash/></Button>
        {album.title}
        </>
    );


  return (
  
    <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album}/>
    </ExpandablePanel> 
     
    
  )
}
