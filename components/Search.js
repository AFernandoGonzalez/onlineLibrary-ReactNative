// components/SearchComponent.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import BookList from './BookList';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://your-backend-url/api/search?query=${searchQuery}`);
            setResults(response.data.results);
        } catch (error) {
            console.error('Search failed', error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Search Books"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />
            <Button title="Search" onPress={handleSearch} />

            <BookList data={results} />
        </View>
    );
};

export default Search;
