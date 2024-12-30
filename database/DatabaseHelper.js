import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

// Create menu table if it doesn't exist
export const createMenuTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT, category TEXT);',
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.log('Error creating table:', error)
    );
  });
};

// Fetch menu items by category
export const getMenuByCategories = (categories) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM menu WHERE category IN (${categories.map(() => '?').join(', ')})`,
        categories,
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// Fetch menu items by search text
export const getMenuBySearch = (query) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM menu WHERE name LIKE ?`,
        [`%${query}%`],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
