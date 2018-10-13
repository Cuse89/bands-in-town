import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value : ""    
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        this.setState({
        value : e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit(this.state.value);
    }
        
    render() {
        return (
            <form className='search-form'>
                <FontAwesomeIcon   
                    className = {'icon'}
                    icon = {faSearch}
                    cursor = 'pointer'
                    onClick = {this.handleSubmit}               
                /> 
                <input
                    type = 'type'
                    value = {this.state.value}
                    onChange = {this.handleChange}
                    placeholder = 'Search Artists...'                                  
                />
                <input
                    style = {{display: 'none'}}
                    type = 'submit'
                    onClick = {this.handleSubmit}
                >
                </input>
            </form>
        )
    }
}

export default SearchForm;