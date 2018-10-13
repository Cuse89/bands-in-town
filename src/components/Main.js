import React from 'react';
import Header from './Header';
import ArtistInfo from './ArtistInfo';
import ArtistEvent from './ArtistEvent';
import FollowedArtist from './FollowedArtist';

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.getInitialState();   

        this.startSearch = this.startSearch.bind(this);
        this.isArtistFollowed = this.isArtistFollowed.bind(this);
        this.updateFollowedArtists = this.updateFollowedArtists.bind(this);
        this.showFollowed = this.showFollowed.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.followedArtists != prevState.followedArtists) {
            this.updateStorage();
        }
    }

    getInitialState() {
        return {
            artistInfo: {},
            artistEvents: [],
            followedArtistsInfo: [],
            followArtistsOpen: false,
            followedArtists: this.getFollowedArtists(),
            showFollowed: false
        }
    }

    startSearch(artist, getFollowed) {
        const artistUrl = `https://rest.bandsintown.com/artists/${artist}?app_id=c19ad5df9483acf93813b4275bb6d69b`;
        const eventUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=c19ad5df9483acf93813b4275bb6d69b&date=upcoming`;
        if (getFollowed) {
            this.getData('followedArtist', artistUrl);
        } else {
            this.getData('artist', artistUrl);
            this.getData('event', eventUrl);
        }
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
                this.sortArtistInfo(info, 'artistInfo');
                break;
            case 'event':
                this.sortEventInfo(info, 'artistEvents');
                break;
            case 'followedArtist':
                this.sortFollowedArtistsInfo(info)
                break;
            default:
                return null
        }        
    }

    sortFollowedArtistsInfo(info) {
        this.setState({
            followedArtistsInfo: [...this.state.followedArtistsInfo, {
                name: info.name,
                thumb: info.thumb_url,
                eventsCount: info.upcoming_event_count
            }]
        });
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
            },
            showFollowed: false
        });
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
        });
    }

    isArtistFollowed(artist) {
        return this.state.followedArtists.includes(artist ? artist : this.state.artistInfo.name);         
    }

    updateFollowedArtists(artist) {
        if (!this.state.followedArtists.includes(artist)) {
            // add artist to array
            this.setState({
                followedArtists: [...this.state.followedArtists, artist]
            });
        } else {
            // remove artist from array
            let otherArtists = this.state.followedArtists.filter((artistEl) => {
                return artistEl != artist;
            });           
            this.setState({
                followedArtists: otherArtists
            });
        }
    }

    getFollowedArtists() {
        const artists = window.localStorage.getItem('followedArtists');
        return artists ? artists.split('|') : [];
    }

    updateStorage() {
        window.localStorage.setItem('followedArtists', this.state.followedArtists.join('|'));    
    }

    showFollowed() {
        console.log('show followed start - ',this.state.followedArtists.length )
        this.setState({
            showFollowed: true,
            followedArtistsInfo : []
        });
        this.state.followedArtists.forEach((artist) => {
            
            this.startSearch(artist, true);
        });
    }

    resetState() {
        this.setState(this.getInitialState())
    }

    render() {
        return (
            <div>
                <Header
                    handleSubmit = {this.startSearch}
                    handleGoHome = {this.resetState}
                    showFollowed = {this.showFollowed}   
                />
                {
                    this.state.artistInfo.name && !this.state.showFollowed &&
                    <ArtistInfo
                        image = {this.state.artistInfo.image.thumb}
                        artistName = {this.state.artistInfo.name}
                        fbUrl = {this.state.artistInfo.fbUrl}
                        isArtistFollowed = {this.isArtistFollowed}
                        updateFollowedArtists = {this.updateFollowedArtists}
                    />
                }
                {
                    this.state.artistEvents.length > 0 && !this.state.showFollowed &&
                        this.state.artistEvents.map((event, i) => {
                        return <ArtistEvent
                            key = {i}
                            info = {event}
                        />
                    })                    
                }
                {
                    this.state.showFollowed && this.state.followedArtistsInfo.length > 0 &&
                    this.state.followedArtistsInfo.map((artist, i) => {
                        return <FollowedArtist
                            key = {i}
                            info = {artist}
                            handleSubmit = {this.startSearch}
                            isArtistFollowed = {this.isArtistFollowed}
                            updateFollowedArtists = {this.updateFollowedArtists}         
                        />
                    })
                }
            </div>
        )
    }
}

export default Main;