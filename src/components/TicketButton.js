import React from 'react';

const TicketButton = (props) => (
    <React.Fragment>
        {
            props.available ? 
            <button>
                {props.status}            
            </button> :
            <p>{props.status}</p>            
        }
    </React.Fragment>
);
export default TicketButton;