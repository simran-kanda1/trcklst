import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config';
import { DB_COLLECTIONS, USER_ROLES } from '../databaseStructure';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await loadUserProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Load user profile from Firestore
  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, DB_COLLECTIONS.USERS, uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError(err.message);
    }
  };

  // Create user profile in Firestore
  const createUserProfile = async (uid, data) => {
    try {
      const userProfile = {
        email: data.email,
        displayName: data.displayName || '',
        photoURL: data.photoURL || '',
        createdAt: new Date(),
        lastLogin: new Date(),
        role: USER_ROLES.USER,
        preferences: {
          favoriteGenres: [],
          notifications: true
        },
        profile: {
          bio: '',
          location: '',
          website: '',
          social: {}
        },
        stats: {
          totalOrders: 0,
          totalSpent: 0,
          wishlistCount: 0
        }
      };

      await setDoc(doc(db, DB_COLLECTIONS.USERS, uid), userProfile);
      setUserProfile(userProfile);
      return userProfile;
    } catch (err) {
      console.error('Error creating user profile:', err);
      setError(err.message);
      throw err;
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, displayName) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase Auth profile
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }

      // Create user profile in Firestore
      await createUserProfile(result.user.uid, {
        email,
        displayName: displayName || '',
        photoURL: ''
      });

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login
      await updateDoc(doc(db, DB_COLLECTIONS.USERS, result.user.uid), {
        lastLogin: new Date()
      });

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user profile exists, create if not
      const userDoc = await getDoc(doc(db, DB_COLLECTIONS.USERS, result.user.uid));
      if (!userDoc.exists()) {
        await createUserProfile(result.user.uid, {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        });
      } else {
        // Update last login
        await updateDoc(doc(db, DB_COLLECTIONS.USERS, result.user.uid), {
          lastLogin: new Date()
        });
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      setError(null);
      if (!user) throw new Error('No authenticated user');

      await updateDoc(doc(db, DB_COLLECTIONS.USERS, user.uid), {
        ...updates,
        updatedAt: new Date()
      });

      // Reload profile
      await loadUserProfile(user.uid);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile,
    isAuthenticated: !!user,
    isAdmin: userProfile?.role === USER_ROLES.ADMIN,
    isArtist: userProfile?.role === USER_ROLES.ARTIST
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};