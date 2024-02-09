// components/BookList.js
import React from 'react';
import { View, Text, FlatList } from 'react-native';

const BookList = ({ data }) => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                        {/* Add more details based on your data structure */}
                    </View>
                )}
            />
        </View>
    );
};

export default BookList;
