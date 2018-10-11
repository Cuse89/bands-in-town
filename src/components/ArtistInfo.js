import React from 'react';

const ArtistInfo = (props) => (
    <div>
        <img src={props.image}/>
        <h3>{props.artistName}</h3>
        <a href={props.fbUrl} target="_blank">Facebook</a>
    </div>
);
export default ArtistInfo;