import React from 'react';
import SearchForm from './SearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => (
    <header>
        <div className="my-artists pointer">
            <FontAwesomeIcon
                className = 'icon'
                color = 'white'
                icon = {faUser}
                cursor = 'pointer'
                size ='2x'
                onClick = {props.showFollowed}               
            />
            <h3
                className = 'desktop-only'
                onClick = {props.showFollowed}
            >My Artists
            </h3> 
        </div>         
        <h1 className = 'pointer' onClick = {props.handleGoHome}>Bands In Town</h1>
        <SearchForm handleSubmit = {props.handleSubmit} />
    </header>
);
export default Header;