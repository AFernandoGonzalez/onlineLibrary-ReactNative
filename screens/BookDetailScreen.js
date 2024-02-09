import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getBookDetails } from '../api/api';

const BookDetailScreen = ({ route }) => {
    const { book } = route.params;
    const [bookDetails, setBookDetails] = useState({});

    useEffect(() => {
        fetchBookDetails();
    }, []);

    const fetchBookDetails = async () => {
        try {
            const fetchedBookDetails = await getBookDetails(book.key.split('/')[2]);
            setBookDetails(fetchedBookDetails);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Title: {book.title}</Text>
            <Text style={styles.text}>Author: {book.author_name}</Text>
            <Text style={styles.text}>Description: {JSON.stringify(bookDetails.description)}</Text>
            <Image
                source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` }}
                style={styles.image}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginTop: 10,
    },
});

export default BookDetailScreen;
