import React from 'react';
import TicketButton from './TicketButton';

class FollowedArtist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    seeEvents() {
        console.log('see upcoming events')
    }

    render() {
        return (
            <div>
                <img src={this.props.info.thumb} alt={this.props.info.name}/>
                {this.props.info.name} 
                {
                    <TicketButton
                        available = {this.props.info.eventsCount > 0 ? true : false}
                        status = {this.props.info.eventsCount > 0 ? 'See Upcoming Events' : 'No Events Coming Up'}                    
                    />
                }        
            </div>
        )
    }
}

export default FollowedArtist;