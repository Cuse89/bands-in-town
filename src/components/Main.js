import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
            
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.getData = this.getData.bind(this)

    }

    handleSubmit(artist) {
        this.getData('artist', `https://rest.bandsintown.com/artists/${artist}?app_id=c19ad5df9483acf93813b4275bb6d69b`)
        this.getData('event', `https://rest.bandsintown.com/artists/${artist}/events?app_id=c19ad5df9483acf93813b4275bb6d69b&date=upcoming`)
    }

    getData(infoType, url) {
        const Http = new XMLHttpRequest();
        Http.open("GET", url);
        Http.send();
        Http.onreadystatechange = () => {
            this.sortResponse(infoType, Http.responseText)
            console.log(Http.responseText)
        }
    }

    sortResponse(response) {
        
    }

    render() {
        return (
            <div>
                <Header/>
                <SearchForm
                    handleSubmit = {this.handleSubmit}
                />
            </div>
        )
    }
}

export default Main