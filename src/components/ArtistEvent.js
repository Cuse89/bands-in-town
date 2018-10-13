import React from 'react';

class ArtistEvent extends React.Component {
    constructor(props) {
        super(props)
    }  

    getStatus() {
        let status = "Sold Out";        
        this.props.info.offers.forEach((offer) => {            
            switch(offer.type) {
                case 'Presale':
                    status = "Buy Presale Tickets"                    
                    break;
                case 'Tickets':
                    status = "Buy Tickets" 
                    break;
                default:
                    status = "Sold Out"
            } 
        })
        return status;
    }

    extractDate(dateTime, dateOrTime) {
        const dateTimeArr = dateTime.split('T');
        if (dateOrTime == 'date') {
            return dateTimeArr[0];
        } else if (dateOrTime == 'time') {
            return dateTimeArr[1]
        }
    }

    render() {
        return (
            <div className = 'event'>
                <div className = 'date event-item'>
                    {this.extractDate(this.props.info.dateTime, 'date')}
                </div>
                <div className = 'location event-item'>
                    {`${this.props.info.venue.name}, ${this.props.info.venue.city}, ${this.props.info.venue.country}` }
                </div>
                
                <div className = 'ticket-button event-item'>
                    {
                        this.getStatus() ==  "Buy Tickets" || this.getStatus() ==  "Buy Presale Tickets" ?
                        <a
                            className = 'ticket-url'                        
                            href = {this.props.info.offers.length > 0 && this.props.info.offers[0].url} target='_blank'
                        >                                       
                            {this.getStatus()}            
                        </a> :
                        <p>
                            {this.getStatus()}
                        </p>            
                    }
                </div>
            
            </div>
        )
    }
} 
export default ArtistEvent;