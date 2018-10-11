import React from 'react';

const BandInfo = (props) => (
    <div>
        <img src={props.image}/>
        <h3>{props.artistName}</h3>
        <a href={props.fbUrl} target="_blank">Facebook</a>
    </div>
);
export default BandInfo;