// screens/BookDetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const BookDetailScreen = ({ route }) => {
    const { book } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Book Detail Screen</Text>
            <Text>Title: {book.title}</Text>
            <Text>Author: {book.author}</Text>
        </View>
    );
};

export default BookDetailScreen;
