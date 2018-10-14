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
        this.openMobileSearch = this.openMobileSearch.bind(this);
    }


    handleChange(e) {
        this.setState({
        value : e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.closeMobileSearch()
        this.props.handleSubmit(this.state.value);
    }

    openMobileSearch() {
        document.body.style.overflow = 'hidden';
        this.props.toggleMobileSearch(true);
           
    }

    closeMobileSearch() {
        document.body.style.overflow = 'scroll';
        this.props.toggleMobileSearch(false);

    }

        
    render() {
        return (
            <form className='search-form'>
                <FontAwesomeIcon   
                    className = 'icon desktop-only'
                    icon = {faSearch}
                    cursor = 'pointer'
                    onClick = {this.handleSubmit}               
                />
                <input
                    className = 'input-desktop desktop-only'
                    type = 'type'
                    value = {this.state.value}
                    onChange = {this.handleChange}
                    placeholder = 'Search Artists...'                              
                />
                <FontAwesomeIcon   
                    className = 'icon mobile-tablet-only'
                    icon = {faSearch}
                    cursor = 'pointer'
                    size = '2x'
                    onClick = {this.openMobileSearch}               
                />
                {
                    this.props.mobileSearch &&
                    <div className = 'mobile-search-wrapper'>
                        <div className = 'mobile-search'>
                            <input
                                className = 'input-mobile'
                                type = 'type'
                                value = {this.state.value}
                                onChange = {this.handleChange}
                                placeholder = 'Search Artists...'
                            />
                            <FontAwesomeIcon   
                                className = 'icon mobile-search-icon mobile-tablet-only '
                                icon = {faSearch}
                                cursor = 'pointer'
                                size = '3x'
                                onClick = {this.handleSubmit}                                        
                            />
                        </div>
                    </div>                    
                }

                {
                    this.state.value.length > 0 &&
                    <input
                        style = {{display: 'none'}}
                        type = 'submit'
                        onClick = {this.handleSubmit}
                    >
                    </input>
                }
                
                
            </form>
        )
    }
}

export default SearchForm;