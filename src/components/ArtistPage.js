import React from 'react';
import ArtistInfo from './ArtistInfo';
import ArtistEvent from './ArtistEvent';

class ArtistPage extends React.Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div className = 'main-wrapper'>
                {
                    this.props.artistInfo.name && this.props.artistInfoPage &&
                    <ArtistInfo
                        image = {this.props.artistInfo.image.large}
                        artistName = {this.props.artistInfo.name}
                        fbUrl = {this.props.artistInfo.fbUrl}
                        isArtistFollowed = {this.props.isArtistFollowed}
                        updateMyArtists = {this.props.updateMyArtists}
                    />
                }
                <div className = 'events-wrapper'>
                {
                    this.props.artistEvents.length > 0 ?
                    <h1 className = 'message'>Upcoming Events</h1> :
                    <h2 className = 'message'>No Events Coming Up</h2>
                }
                {
                    this.props.artistEvents.length > 0 && 
                        this.props.artistEvents.map((event, i) => {
                        return <ArtistEvent
                            key = {i}
                            info = {event}
                        />
                    })                    
                }
                </div>
            </div> 
        )
    }
}

export default ArtistPage;