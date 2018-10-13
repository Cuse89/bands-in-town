import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

class FollowedArtist extends React.Component {
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
        this.props.updateFollowedArtists(this.state.cachedInfo.name);
        this.setState({
            followed: !this.state.followed
        });
    }

    render() {
        return (
            <div>
                <img src={this.props.info.thumb} alt={this.props.info.name}/>
                <div onClick={this.seeArtist}>{this.props.info.name}</div>
                {
                    this.props.info.eventsCount > 0 ?
                    <div onClick={this.seeEvents}>See Upcoming Events</div> :
                    <div>
                    <p className="is-active">No Events Coming Up</p>
                    </div>
                }
                <FontAwesomeIcon
                    icon={this.state.followed ? solidHeart : regHeart}
                    color='red'
                    onClick={this.handleClickHeart}                    
                />                
            </div>
        )
    }
}

export default FollowedArtist;