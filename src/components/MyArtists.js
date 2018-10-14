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
                    this.state.myArtistsInfo.length > 0 ?
                    <h1 className = 'message'>My Artists</h1> :
                    <h2 className = 'message'>You have no saved artists... Search now and start following!</h2>           
                }
                {
                    this.state.myArtistsInfo.map((artist, i) => {
                        console.log(artist)
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