import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import ArtistInfo from './ArtistInfo';
import ArtistEvent from './ArtistEvent';

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            artistInfo: {},
            artistEvents: [],
            followArtistsOpen: false,
            followedArtists: this.getFollowedArtists()
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.isArtistFollowed = this.isArtistFollowed.bind(this);
        this.updateFollowedArtists = this.updateFollowedArtists.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.followedArtists != prevState.followedArtists) {
            this.updateStorage();
        }
    }

    handleSubmit(artist) {
        this.getData('artist', `https://rest.bandsintown.com/artists/${artist}?app_id=c19ad5df9483acf93813b4275bb6d69b`);
        this.getData('event', `https://rest.bandsintown.com/artists/${artist}/events?app_id=c19ad5df9483acf93813b4275bb6d69b&date=upcoming`);
    }

    getData(infoType, url) {
        const self = this;
        const Http = new XMLHttpRequest();
        Http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                self.handleResponses(infoType, Http.responseText);                
            }            
        };
        Http.open('GET', url);
        Http.send();
    }

    handleResponses(infoType, response) {
        const info = JSON.parse(response);
        switch(infoType) {
            case 'artist':
                this.sortArtistInfo(info);
                break;
            case 'event':
                this.sortEventInfo(info);
                break;
            default:
                return null
        }        
    }

    sortArtistInfo(info) {
        this.setState({
            artistInfo: {
                name: info.name,
                image: {
                    large: info.image_url,
                    thumb: info.thumb_url
                },
                fbUrl: info.facebook_page_url
            }
        })
    }

    sortEventInfo(infos) {
        let events = [];
        infos.map((event) => {
            events.push({
                onSaleDateTime: event.on_sale_datetime,
                dateTime: event.datetime,
                description: event.description,
                venue: event.venue,
                offers: event.offers
            })            
        })
        this.setState({
            artistEvents: events
        })
    }

    isArtistFollowed() {
        return this.state.followedArtists.includes(this.state.artistInfo.name);         
    }

    updateFollowedArtists(artist) {
        if (!this.state.followedArtists.includes(artist)) {
            // add artist to array
            this.setState({
                followedArtists: [...this.state.followedArtists, artist]
            })
        } else {
            // remove artist from array
            const otherArtists = this.state.followedArtists.filter((artistEl) => {
                return artistEl != artist;
            });
            this.setState({
                followedArtists: otherArtists
            })
        }
    }

    getFollowedArtists() {
        const artists = window.localStorage.getItem('followedArtists');
        return artists.split('|');
    }

    updateStorage() {
        window.localStorage.setItem('followedArtists', this.state.followedArtists.join('|'));    
    }

    render() {
        return (
            <div>
                <Header/>
                <SearchForm
                    handleSubmit = {this.handleSubmit}
                />
                {
                    this.state.artistInfo.name && 
                    <ArtistInfo
                        image = {this.state.artistInfo.image.thumb}
                        artistName = {this.state.artistInfo.name}
                        fbUrl = {this.state.artistInfo.fbUrl}
                        isArtistFollowed = {this.isArtistFollowed}
                        updateFollowedArtists = {this.updateFollowedArtists}
                    />
                }
                {
                    this.state.artistEvents.length > 0 &&
                        this.state.artistEvents.map((event, i) => {
                        return <ArtistEvent
                            key = {i}
                            info = {event}
                        />
                    })                    
                }
            </div>
        )
    }
}

export default Main;