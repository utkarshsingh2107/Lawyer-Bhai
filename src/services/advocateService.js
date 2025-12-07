import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  addDoc,
  updateDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Get advocates by city
export const getAdvocatesByCity = async (city, filters = {}) => {
  try {
    let q = query(
      collection(db, 'advocates'),
      where('city', '==', city)
    );

    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.court) {
      q = query(q, where('court', '==', filters.court));
    }
    if (filters.minRating) {
      q = query(q, where('rating', '>=', filters.minRating));
    }

    const querySnapshot = await getDocs(q);
    const advocates = [];
    
    querySnapshot.forEach((doc) => {
      advocates.push({ id: doc.id, ...doc.data() });
    });

    return advocates;
  } catch (error) {
    console.error('Error fetching advocates:', error);
    throw error;
  }
};

// Get advocate by ID
export const getAdvocateById = async (advocateId) => {
  try {
    const docRef = doc(db, 'advocates', advocateId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Advocate not found');
    }
  } catch (error) {
    console.error('Error fetching advocate:', error);
    throw error;
  }
};

// Get advocates by category and city
export const getAdvocatesByCategory = async (category, city, limitCount = 3) => {
  try {
    const q = query(
      collection(db, 'advocates'),
      where('city', '==', city),
      where('category', '==', category),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const advocates = [];
    
    querySnapshot.forEach((doc) => {
      advocates.push({ id: doc.id, ...doc.data() });
    });

    return advocates;
  } catch (error) {
    console.error('Error fetching advocates by category:', error);
    throw error;
  }
};

// Add new advocate (admin function)
export const addAdvocate = async (advocateData) => {
  try {
    const docRef = await addDoc(collection(db, 'advocates'), {
      ...advocateData,
      createdAt: new Date().toISOString(),
      verified: false
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding advocate:', error);
    throw error;
  }
};

// Update advocate
export const updateAdvocate = async (advocateId, updates) => {
  try {
    const docRef = doc(db, 'advocates', advocateId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating advocate:', error);
    throw error;
  }
};

// Get all cities with advocates
export const getAvailableCities = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'advocates'));
    const cities = new Set();
    
    querySnapshot.forEach((doc) => {
      cities.add(doc.data().city);
    });

    return Array.from(cities).sort();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
