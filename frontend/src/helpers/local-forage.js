import localforage from 'localforage';

// Configure localforage to use IndexedDB as the driver
localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'MEntor', //just like a database
    storeName: 'store' //just like a table in a database
});

// Function to insert data
export const insertDataToIndexedDB = async (key, value) => {
    try {
        await localforage.setItem(key, value);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

// Function to retrieve data
export const retrieveDataFromIndexdDB = async (key) => {
    try {
        const value = await localforage.getItem(key);
        return value;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};
