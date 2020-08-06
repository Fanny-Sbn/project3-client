import React from 'react'

const SearchBar = ({ callback, searchValue}) => {
    return (
        <React.Fragment>
            <input id="searchBar" type="text" value={searchValue} onChange={callback} placeholder="Search..." />
        </React.Fragment>
    )
}

export default SearchBar