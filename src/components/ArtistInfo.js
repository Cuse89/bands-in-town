import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

class ArtistInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followed: this.props.isArtistFollowed(),
        }

        this.handleHeartClick = this.handleHeartClick.bind(this);
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.artistName != this.props.artistName) {
            this.setState({
                followed: this.props.isArtistFollowed
            })
        }
    }

    handleHeartClick() {
        this.props.updateFollowedArtists(this.props.artistName);
        this.setState({
            followed: !this.state.followed
        })
    }  

    render() {
        return (
            <div>
                <img src={this.props.image}/>
                <div>
                    <h3>{this.props.artistName}</h3>
                    <a href={this.props.fbUrl} target="_blank">Facebook</a>
                    <FontAwesomeIcon
                        icon={this.state.followed ? solidHeart : regHeart}
                        color="red"
                        onClick={this.handleHeartClick}                    
                    />                    
                </div>        
            </div>
        )
    }
}

export default ArtistInfo;