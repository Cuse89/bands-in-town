import React from 'react';

const TicketButton = (props) => (
    <React.Fragment>
        {
            props.status == "No Tickets" ? 
            <p>No Tickets</p> : 
            <button>
                {props.status}            
            </button>
        }
    </React.Fragment>
);
export default TicketButton;