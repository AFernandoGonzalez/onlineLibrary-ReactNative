import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, Image, TextInput } from 'react-native';
import { getBooks } from '../api/api';
import axios from 'axios';

const BookSearch = ({ query, navigation }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            handleSearch(query);
        } else {
            setSearchResults([]);
        }
    }, [query]);


    const handleSearch = async (query) => {
        try {
            setLoading(true);

            const response = await axios.get(`https://openlibrary.org/search.json?title=${query}&limit=2`);
            setSearchResults(response.data.docs);
            // onSearch();
        } catch (error) {
            console.error('Error searching books:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => (
                        // <View style={styles.result}>
                        //     <Text>{item.title}</Text>
                        // </View>
                        // <BookCard book={item} onPress={() => onPress = {() => navigation.navigate('Details', {book: item } />
                        <BookCard
                            book={item}
                            onPress={() => navigation.navigate('Details', { book: item })}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
};


const BookCard = ({ book, onPress }) => {

    // console.log('BOOKCARD book:', book);
    return (
        <View style={styles.card}>
            <Image source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` }} style={styles.image} />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>Author: {book.author_name}</Text>
                <Button title="Details" onPress={onPress} />
            </View>
        </View>
    );
};


const HomeScreen = ({ navigation }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const fetchedBooks = await getBooks();
            setBooks(fetchedBooks);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching books:', error);
            setLoading(false);
        }
    };

    const renderSeparator = () => {
        return <View style={styles.separator} />;
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    );


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Books..."
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
            />

            {searchQuery ? (
                <View>
                    <BookSearch query={searchQuery} navigation={navigation} />
                </View>
            ) : (
                <View >
                    <Text style={styles.title}>Trending Books</Text>

                    <FlatList
                        data={filteredBooks}
                        renderItem={({ item }) => (
                            <BookCard
                                book={item}
                                onPress={() => navigation.navigate('Details', { book: item })}
                            />
                        )}
                        keyExtractor={(item) => item.key.toString()}
                        ItemSeparatorComponent={renderSeparator}
                    />
                </View>
            )}





        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    separator: {
        height: 5,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        elevation: 2, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOpacity: 0.2, // for iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
    },
    image: {
        width: '50%',
        height: 200,
        objectFit: 'fill',
        borderRadius: 10,
        marginBottom: 10,
    },
    textContainer: {
        marginBottom: 10,
        paddingLeft: 10,
        width: '50%',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 16,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
export default HomeScreen;
