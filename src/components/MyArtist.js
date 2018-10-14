import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

class MyArtist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followed: this.props.isArtistFollowed(this.props.info.name) ? true : false,
            // cache info, to allow user to unlike and relike, and obtain info again
            cachedInfo: this.props.info
        }
        this.seeArtist = this.seeArtist.bind(this);
        this.handleClickHeart = this.handleClickHeart.bind(this);
    }

    seeArtist() {
        this.props.handleSubmit(this.state.cachedInfo.name);
    }

    handleClickHeart() {
        this.props.updateMyArtists(this.state.cachedInfo.name);
        this.setState({
            followed: !this.state.followed
        });
    }

    render() {
        return (
            <div className = 'my-artist'>
                <img
                    className = 'pointer'
                    src = {this.props.info.thumb}
                    alt={this.props.info.name}
                    onClick = {this.seeArtist}
                />
                <div className = 'my-artist-info'>
                    <div className = 'left'>
                        <p
                            className = "pointer artist-name"
                            onClick = {this.seeArtist}
                        >
                            {this.props.info.name}
                        </p>                    
                        {
                            this.props.info.eventsCount > 0 ?
                            <div onClick = {this.seeArtist}>
                                <p className = 'strong pointer'>See Upcoming Events</p>
                            </div> :
                            <div>
                                <p className = 'red'>No Events Coming Up</p>
                            </div>
                        }
                    </div>
                    <FontAwesomeIcon
                        icon = {this.state.followed ? solidHeart : regHeart}
                        color = 'red'
                        size = '2x'
                        cursor = 'pointer'
                        onClick = {this.handleClickHeart}                    
                    />  
                </div>                              
            </div>
        )
    }
}

export default MyArtist;