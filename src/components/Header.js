import React from 'react';
import SearchForm from './SearchForm';

const Header = (props) => (
    <header>
        <h1 onClick = {props.handleGoHome}>Bands In Town</h1>
        {
            <SearchForm handleSubmit = {props.handleSubmit} />
        }
        <div onClick={props.showFollowed}>My Artists</div>
    </header>
);
export default Header;