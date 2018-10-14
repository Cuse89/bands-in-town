import React from 'react';
import SearchForm from './SearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => (
    <header>
        <div className="my-artists-header pointer">
            <FontAwesomeIcon
                className = 'icon'
                color = 'white'
                icon = {faUser}
                cursor = 'pointer'
                size ='2x'
                onClick = {props.myArtistsPage}               
            />
            <h3
                className = 'desktop-only'
                onClick = {props.myArtistsPage}
            >My Artists
            </h3> 
        </div>         
        <h1 className = 'pointer' onClick = {props.handleGoHome}>Bands In Town</h1>
        <SearchForm
            handleSubmit = {props.handleSubmit}
            toggleMobileSearch = {props.toggleMobileSearch}
            mobileSearch = {props.mobileSearch}   
        />
    </header>
);
export default Header;