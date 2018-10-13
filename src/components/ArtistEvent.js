import React from 'react';
import TicketButton from './TicketButton';

class ArtistEvent extends React.Component {
    constructor(props) {
        super(props)
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

    extractDateTime(dateTime, dateOrTime) {
        const dateTimeArr = dateTime.split('T');
        if (dateOrTime == 'date') {
            return dateTimeArr[0];
        } else if (dateOrTime == 'time') {
            return dateTimeArr[1]
        }
    }

    render() {
        return (
            <div>
                {this.extractDateTime(this.props.info.dateTime, 'date')}
                {this.props.info.venue.name} - -
                {this.props.info.venue.city}, {this.props.info.venue.country}
                <TicketButton
                    status = {this.getStatus()}
                    available = {this.getStatus() ==  "Buy Tickets" || this.getStatus() ==  "Buy Presale Tickets" ? true : false}
                    url = {this.props.info.offers.length > 0 && this.props.info.offers[0].url}
                />
            
            </div>
        )
    }
} 
export default ArtistEvent;