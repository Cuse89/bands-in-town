import React from 'react';
import TicketButton from './TicketButton';

class ArtistEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ticketStatus : this.getStatus()
        }
    }  

    getStatus() {
        let status = "No Tickets";        
        this.props.info.offers.forEach((offer) => {            
            switch(offer.type) {
                case 'Presale':
                    status = "Buy Presale Tickets"                    
                    break;
                case 'Tickets':
                    status = "Buy Tickets" 
                    break;
                default:
                    status = "No Tickets"
            } 
        })
        return status;
    }

    render() {
        return (
            <div>
                {this.props.info.venue.name} - -
                {this.props.info.venue.city}, {this.props.info.venue.country}
                <TicketButton
                    status = {this.state.ticketStatus}
                />
            
            </div>
        )
    }
} 
export default ArtistEvent;