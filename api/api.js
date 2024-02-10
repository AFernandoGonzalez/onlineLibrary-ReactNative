// api.js (assuming you have an API endpoint to fetch books)
export const getBooks = async () => {
    try {
        const response = await fetch('https://openlibrary.org/trending/daily.json?limit=5');
        const res = await response.json();
        const data = res.works;
        // console.log('Fetched books:', data.works);
        return data;
    } catch (error) {
        throw new Error('Error fetching books:', error);
    }
};
export const getBookDetails = async (id) => {
    try {
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        // console.log(`https://openlibrary.org/works/${id}.json`);
        const res = await response.json();
        // console.log('Fetched book details:', res);
        const data = res;
        // console.log('Fetched books:', data.works);
        return data;
    } catch (error) {
        throw new Error('Error fetching books:', error);
    }
};
