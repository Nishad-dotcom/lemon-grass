import * as SQLite from 'expo-sqlite';

// Open or create the SQLite database
const db = SQLite.openDatabase('little_lemon.db');

// 1. Create the "menu" table if it doesn't exist
export const createMenuTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL
      );
      `,
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.error('Error creating table:', error) // Use console.error for better debugging
    );
  });
};

// 2. Fetch menu items by categories
export const getMenuByCategories = (categories) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const placeholders = categories.map(() => '?').join(', ');
      tx.executeSql(
        `SELECT * FROM menu WHERE category IN (${placeholders});`,
        categories,
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => {
          console.error('Error fetching menu by categories:', error); // Log errors for debugging
          reject(error);
        }
      );
    });
  });
};

// 3. Fetch menu items by search query
export const getMenuBySearch = (query) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM menu WHERE name LIKE ?;`,
        [`%${query}%`],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => {
          console.error('Error fetching menu by search query:', error); // Log errors for debugging
          reject(error);
        }
      );
    });
  });
};

// 4. Insert sample menu items (optional)
export const insertMenuItems = (menuItems) => {
  db.transaction((tx) => {
    menuItems.forEach((item) => {
      tx.executeSql(
        `INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);`,
        [item.name, item.price, item.description, item.image, item.category],
        () => console.log(`Inserted ${item.name} into the menu table`),
        (_, error) => console.error('Error inserting menu item:', error)
      );
    });
  });
};
