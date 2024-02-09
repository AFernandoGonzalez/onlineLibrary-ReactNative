// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { getBooks } from '../api/api'; 

const HomeScreen = ({ navigation }) => {
    // const [books, setBooks] = useState([
    //     { id: 1, title: 'Book 1', author: 'Author 1' },
    //     { id: 2, title: 'Book 2', author: 'Author 2' },
    //     { id: 3, title: 'Book 3', author: 'Author 3' },
    // ]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // if (loading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <FlatList
                data={books}
                renderItem={({ item }) => (
                    <Button
                        title={item.title}
                        onPress={() => navigation.navigate('Details', { book: item })}
                    />
                )}
                keyExtractor={(item) => item.key.toString()}
            />
        </View>
    );
};

export default HomeScreen;
