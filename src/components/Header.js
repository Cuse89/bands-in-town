import React from 'react'
import SearchForm from './SearchForm'

const Header = (props) => (
    <header>
        <h1>Bands In Town</h1>
        {
            props.headerSearch && <SearchForm />
        }
    </header>
);
export default Header