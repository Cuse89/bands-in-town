import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MobileSearch = (props) => (
    <div>
        <input
            className = 'input-mobile'
            type = 'type'
            value = {props.value}
            onChange = {props.handleChange}
            placeholder = 'Search Artists...'                
        />
        <FontAwesomeIcon   
            className = 'icon search-icon mobile-tablet-only '
            icon = {faSearch}
            cursor = 'pointer'
            size = '2x'
            onClick = {props.onClick}
                          
        />
    </div>

);
export default MobileSearch;