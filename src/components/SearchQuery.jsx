import './SearchQuery.css';

const SearchQuery = props => {
    return (
        <div id='searchQuery'>
            <h1>Podaj link do pliku .igc, a my zrobimy resztę</h1>
            <input type='text' onChange={props.handleInput} onKeyDown={props.handleKeyDown} value={props.inputValue} />
            <button onClick={props.handleButton}>Sprawdź</button>
        </div>
    );
};

export default SearchQuery;