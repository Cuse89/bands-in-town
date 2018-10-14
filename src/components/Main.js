import React from 'react';
import Header from './Header';
import ArtistInfo from './ArtistInfo';
import ArtistEvent from './ArtistEvent';
import MyArtists from './MyArtists';

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            artistInfo: {},
            artistEvents: [],
            myArtistsInfo: [],
            myArtists: this.getMyArtists(),
            homePage: true,
            myArtistsPage: false,
            artistInfoPage: false
        }  

        this.startSearch = this.startSearch.bind(this);
        this.isArtistFollowed = this.isArtistFollowed.bind(this);
        this.updateMyArtists = this.updateMyArtists.bind(this);
        this.myArtistsPage = this.myArtistsPage.bind(this);
        this.goHome = this.goHome.bind(this);
        this.artistInfoPage = this.artistInfoPage.bind(this);
        this.toggleMobileSearch = this.toggleMobileSearch.bind(this);
        this.handleShowArtistInfo = this.handleShowArtistInfo.bind(this);
    }

    componentDidMount() {
        this.state.myArtists.forEach((artist) => {
            this.startSearch(artist, true)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.myArtists != prevState.myArtists) {
            this.updateStorage();
        }
    }
    
    startSearch(artist, getFollowed) {
        const artistUrl = `https://rest.bandsintown.com/artists/${artist}?app_id=c19ad5df9483acf93813b4275bb6d69b`;
        const eventUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=c19ad5df9483acf93813b4275bb6d69b&date=upcoming`;
        if (getFollowed) {
            this.getData('myArtist', artistUrl);
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
            case 'myArtist':
                this.sortMyArtistsInfo(info)
                break;
            default:
                return null
        }        
    }

    sortMyArtistsInfo(info) {
        this.setState({
            myArtistsInfo: [...this.state.myArtistsInfo, {
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
            myArtistsPage: false
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
        return this.state.myArtists.includes(artist ? artist : this.state.artistInfo.name);         
    }

    updateMyArtists(artist) {
        if (!this.state.myArtists.includes(artist)) {
            // add artist to array
            this.setState({
                myArtists: [...this.state.myArtists, artist]
            });
            // add artist info to array
            this.startSearch(artist, true);

        } else {
            // remove artist from myArtists array
            let otherArtists = this.state.myArtists.filter((artistEl) => {
                return artistEl != artist;
            });
            // remove artist from myArtistsInfo array
            let otherArtistsinfo = this.state.myArtistsInfo.filter((artistObj) => {
                return artistObj.name != artist
            })
     
            this.setState({
                myArtists: otherArtists,
                myArtistsInfo: otherArtistsinfo
            });
        }
    }

    getMyArtists() {
        const artists = window.localStorage.getItem('myArtists');
        return artists ? artists.split('|') : [];
    }

    updateStorage() {
        window.localStorage.setItem('myArtists', this.state.myArtists.join('|'));    
    }

    myArtistsPage() {
        this.setState({
            myArtistsPage: true,
            homePage: false,
            artistInfoPage: false
        });
    }

    goHome() {
        this.setState({
            homePage: true,
            myArtistsPage: false,
            artistInfoPage: false
        });
    }

    artistInfoPage() {
        this.setState({
            artistInfoPage: true,
            homePage: false,
            myArtistsPage: false
        });
    }

    toggleMobileSearch(bool) {
        this.setState({
            mobileSearch: bool
        });
    }

    handleShowArtistInfo(artist) {
        this.artistInfoPage();
        this.startSearch(artist);
    }
        
        
    

    render() {
        return (
            <div className = 'main-container'>
                <Header
                    handleSubmit = {this.handleShowArtistInfo}
                    handleGoHome = {this.goHome}
                    myArtistsPage = {this.myArtistsPage}
                    toggleMobileSearch = {this.toggleMobileSearch}
                    mobileSearch = {this.state.mobileSearch}
                />
                {
                    !this.state.myArtistsPage &&
                   <div className = 'main-wrapper'>
                        {
                            this.state.artistInfo.name && this.state.artistInfoPage &&
                            <ArtistInfo
                                image = {this.state.artistInfo.image.large}
                                artistName = {this.state.artistInfo.name}
                                fbUrl = {this.state.artistInfo.fbUrl}
                                isArtistFollowed = {this.isArtistFollowed}
                                updateMyArtists = {this.updateMyArtists}
                            />
                        }
                        <div className = 'events-wrapper'>
                        {
                            this.state.artistEvents.length > 0 && this.state.artistInfoPage &&
                                this.state.artistEvents.map((event, i) => {
                                return <ArtistEvent
                                    key = {i}
                                    info = {event}
                                />
                            })                    
                        }
                        </div>
                    </div> 
                }
                
                {
                    this.state.myArtistsPage && this.state.myArtistsInfo.length > 0 &&
                    <MyArtists
                        myArtistsInfo = {this.state.myArtistsInfo}
                        handleSubmit = {this.handleShowArtistInfo}
                        isArtistFollowed = {this.isArtistFollowed}
                        updateMyArtists = {this.updateMyArtists}                   
                    />
                }
            </div>
        )
    }
}

export default Main;