import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getBooks } from '../api/api';

const HomeScreen = ({ navigation }) => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trending Books</Text>
            <FlatList
                data={books}
                renderItem={({ item }) => (
                    <Button
                        title={item.title}
                        onPress={() => navigation.navigate('Details', { book: item })}
                    />
                )}
                keyExtractor={(item) => item.key.toString()}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    separator: {
        height: 5, 
    },
});

export default HomeScreen;
