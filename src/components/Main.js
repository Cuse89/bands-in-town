import React from 'react';
import { faHeart as regHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
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
            followedArtists: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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
console.log(events)
        this.setState({
            artistEvents: events
        })
    }

    getHeartIcon(artistName) {
        if (this.state.followedArtists.includes(artistName)) {
            return solidHeart
        } else {
            return regHeart
        }
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
                        heartIcon = {this.getHeartIcon(this.state.artistInfo.name)}
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