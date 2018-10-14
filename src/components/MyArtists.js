import React from 'react';
import MyArtist from './MyArtist';

class MyArtists extends React.Component {
    constructor(props) {
        super(props)

        this.state = ({
            // cache info so MyArtist component isnt being updated according to Main state
            myArtistsInfo : this.props.myArtistsInfo
        });
    }

    render() {
        return (
            <div className = 'my-artists'>
                {
                    this.state.myArtistsInfo.map((artist, i) => {
                        return <MyArtist
                            key = {i}
                            info = {artist}
                            handleSubmit = {this.props.handleSubmit}
                            isArtistFollowed = {this.props.isArtistFollowed}
                            updateMyArtists = {this.props.updateMyArtists}         
                        />
                    })
                }            
            </div>
        )
    }
}

export default MyArtists;