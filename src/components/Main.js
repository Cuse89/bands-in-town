import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import BandInfo from './BandInfo';

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            artistInfo: {},
            eventInfo: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.sortArtistInfo = this.sortArtistInfo.bind(this);
        this.sortEventInfo = this.sortEventInfo.bind(this);
        this.handleResponses = this.handleResponses.bind(this);

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
            eventInfo: events
        })
        
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
                    <BandInfo
                        image = {this.state.artistInfo.image.thumb}
                        artistName = {this.state.artistInfo.name}
                        fbUrl = {this.state.artistInfo.fbUrl}
                    />
                }
            </div>
        )
    }
}

export default Main;