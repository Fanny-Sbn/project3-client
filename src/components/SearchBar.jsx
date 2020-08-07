import React from 'react'

const SearchBar = ({ callback, searchValue}) => {
    return (
        <React.Fragment>
            <input style={{margin:"15px", borderRadius:"10px", padding:"5px", border: "1px solid #E5F4F4"}} id="searchBar" type="text" value={searchValue} onChange={callback} placeholder="Rechercher..." />
        </React.Fragment>
    )
}

export default SearchBar