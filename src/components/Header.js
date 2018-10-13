import React from 'react';
import SearchForm from './SearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => (
    <header>
        <h1 className="pointer" onClick = {props.handleGoHome}>Bands In Town</h1>
        {
            <SearchForm handleSubmit = {props.handleSubmit} />
        }
        <FontAwesomeIcon
            icon={faUser}
            cursor="pointer"
            onClick={props.showFollowed}                    
        />
    </header>
);
export default Header;