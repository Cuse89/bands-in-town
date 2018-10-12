import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ArtistInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <img src={this.props.image}/>
                <div>
                    <h3>{this.props.artistName}</h3>
                    <a href={this.props.fbUrl} target="_blank">Facebook</a>
                    <FontAwesomeIcon
                        icon={this.props.heartIcon}
                        color="red"                    
                    />                    
                </div>        
            </div>
        )
    }
}

export default ArtistInfo;