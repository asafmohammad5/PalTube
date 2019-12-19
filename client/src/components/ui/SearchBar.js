import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import searchSuggestions from '../../json_files/search_suggestions';

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : searchSuggestions.filter(item =>
    item.name.toLocaleLowerCase().includes(inputValue)
  );
};
const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class SearchBar extends Component {
  constructor() {
    super();
    this.state = { value: '', suggestions: [], referrer: null }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (event) => {
    if (event.target.getAttribute("aria-controls") === "react-autowhatever-txtSearchVideos") {
      if (event.key === 'Enter' || event.keyCode === 13) {
        window.location.href = `#/search/${this.state.value}`
      }
    }
  }

  handleSearchClick = (event) => {
    if (event.target.id === "searchBtn") {
        window.location.href = `#/search/${this.state.value}`
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({ value: newValue })
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'search...',
      value,
      onChange: this.onChange,
    };

    return (
      <div id="div" style={{ display: 'flex' }}>
        <Autosuggest
          id="txtSearchVideos"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
        <button className="clickable search-icon" onClick={this.handleSearchClick}>
          <i className="fas fa-search" id="searchBtn"></i>
        </button>
      </div>
    );
  }
}

export default SearchBar;