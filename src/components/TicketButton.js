import React from 'react';

const TicketButton = (props) => (
    <React.Fragment>
        {
            props.available ?
            <a href = {props.url} target='_blank'>
                <button>            
                    {props.status}            
                </button>
            </a> :
            <p>{props.status}</p>            
        }
    </React.Fragment>
);
export default TicketButton;