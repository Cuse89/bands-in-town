import React from 'react'
import Header from './Header'
import SearchForm from './SearchForm'

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
    
        }

        this.submitForm = this.submitForm.bind(this)

    }

    submitForm(value) {
        console.log('submit form - ', value)

    }

    render() {
        return (
            <div>
                <Header/>
                <SearchForm
                    submitForm = {this.submitForm}
                />
                Main
            </div>
        )
    }
}

export default Main