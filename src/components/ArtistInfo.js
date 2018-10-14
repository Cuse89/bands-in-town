import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

class ArtistInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followed: this.props.isArtistFollowed() ? true : false,
        }
        this.handleClickHeart = this.handleClickHeart.bind(this);
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.artistName != this.props.artistName) {
            this.setState({
                followed: this.props.isArtistFollowed() ? true : false
            });
        }
    }

    handleClickHeart() {
        this.props.updateMyArtists(this.props.artistName);
        this.setState({
            followed: !this.state.followed
        });
    }

    render() {
        return (
            <div className = 'artist-wrapper'>
                <div className = 'artist-image'>
                    <img src={this.props.image} alt={this.props.artistName}/>
                </div>
                <div className = 'artist-info-wrapper'>
                    <div className = 'artist-info'>
                        <p className = 'artist-name'>{this.props.artistName}</p>
                        <div className = 'icons'>
                            <a href={this.props.fbUrl} target='_blank'>
                                <FontAwesomeIcon
                                    className = 'icon facebook'
                                    icon = {faFacebook}
                                    color = '#364051'
                                    size = '3x'        
                                />                            
                            </a>
                            <FontAwesomeIcon
                                className = 'icon heart'
                                icon = {this.state.followed ? solidHeart : regHeart}
                                color = 'red'
                                size = '3x'
                                cursor = 'pointer'
                                onClick = {this.handleClickHeart}                    
                                />
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}

export default ArtistInfo;