import React from 'react';

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
            <form>
                <input
                    type = 'text'
                    value = {this.state.value}
                    onChange = {this.handleChange}
                    placeholder = 'Search Artists...'                                  
                />
                <button onClick = {this.handleSubmit}>
                    Search
                </button>            
            </form>
        )
    }
}

export default SearchForm;