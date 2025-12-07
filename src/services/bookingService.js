import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Get bookings by user
export const getUserBookings = async (userId) => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const bookings = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    return bookings;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};

// Get bookings by advocate
export const getAdvocateBookings = async (advocateId) => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('advocateId', '==', advocateId),
      orderBy('bookingDate', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const bookings = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    return bookings;
  } catch (error) {
    console.error('Error fetching advocate bookings:', error);
    throw error;
  }
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Booking not found');
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

// Check slot availability
export const checkSlotAvailability = async (advocateId, date, timeSlot) => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('advocateId', '==', advocateId),
      where('bookingDate', '==', date),
      where('timeSlot', '==', timeSlot),
      where('status', 'in', ['pending', 'confirmed'])
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // true if available
  } catch (error) {
    console.error('Error checking slot availability:', error);
    throw error;
  }
};
