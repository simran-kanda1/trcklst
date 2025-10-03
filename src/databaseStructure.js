/*
FIREBASE FIRESTORE DATABASE STRUCTURE FOR TRCKLST

Collections and Document Structure:

1. USERS COLLECTION
   - Document ID: userUID
   - Fields:
     * email: string
     * displayName: string
     * photoURL: string
     * createdAt: timestamp
     * lastLogin: timestamp
     * role: string ('user', 'artist', 'admin')
     * preferences: object
       - favoriteGenres: array
       - notifications: boolean
     * profile: object
       - bio: string
       - location: string
       - website: string
       - social: object (instagram, twitter, etc.)
     * stats: object
       - totalOrders: number
       - totalSpent: number
       - wishlistCount: number

2. ARTISTS COLLECTION
   - Document ID: artistUID or auto-generated ID
   - Fields:
     * name: string
     * email: string
     * displayName: string
     * avatar: string (URL)
     * coverImage: string (URL)
     * bio: string
     * genres: array
     * verified: boolean
     * createdAt: timestamp
     * updatedAt: timestamp
     * social: object
       - instagram: string
       - twitter: string
       - youtube: string
       - spotify: string
       - soundcloud: string
     * stats: object
       - followers: number
       - totalSales: number
       - totalProducts: number
       - rating: number
     * featured: boolean
     * active: boolean

3. PRODUCTS COLLECTION
   - Document ID: auto-generated ID
   - Fields:
     * title: string
     * description: string
     * artistId: string (reference to artists collection)
     * artistName: string (denormalized for performance)
     * artistAvatar: string (denormalized)
     * price: number
     * originalPrice: number (optional, for sales)
     * type: string ('digital', 'poster', 'bundle')
     * genre: string
     * tags: array
     * images: array of strings (URLs)
     * mainImage: string (URL)
     * files: object (for digital products)
       - preview: string (URL)
       - fullRes: string (URL)
       - formats: array (['jpg', 'png', 'pdf'])
     * physical: object (for posters)
       - dimensions: string
       - materials: array
       - weight: number
       - printQuality: string
     * createdAt: timestamp
     * updatedAt: timestamp
     * featured: boolean
     * active: boolean
     * stock: number (null for unlimited digital)
     * limited: boolean
     * limitedCount: number
     * stats: object
       - views: number
       - likes: number
       - purchases: number
       - rating: number
       - reviewCount: number

4. ORDERS COLLECTION
   - Document ID: auto-generated ID
   - Fields:
     * userId: string
     * userEmail: string
     * orderNumber: string (generated)
     * items: array of objects
       - productId: string
       - productTitle: string
       - artistName: string
       - price: number
       - quantity: number
       - type: string
       - downloadLinks: array (for digital products)
     * subtotal: number
     * tax: number
     * shipping: number
     * total: number
     * currency: string
     * status: string ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')
     * paymentMethod: string
     * stripePaymentIntentId: string
     * createdAt: timestamp
     * updatedAt: timestamp
     * shippingAddress: object (for physical products)
       - name: string
       - line1: string
       - line2: string
       - city: string
       - state: string
       - postalCode: string
       - country: string
     * digitalDelivered: boolean
     * trackingNumber: string (for shipped items)

5. REVIEWS COLLECTION
   - Document ID: auto-generated ID
   - Fields:
     * userId: string
     * userName: string
     * userAvatar: string
     * productId: string
     * orderId: string
     * rating: number (1-5)
     * title: string
     * comment: string
     * verified: boolean (bought the product)
     * helpful: number (helpful votes)
     * createdAt: timestamp
     * updatedAt: timestamp

6. WISHLISTS COLLECTION
   - Document ID: userUID
   - Fields:
     * items: array of objects
       - productId: string
       - addedAt: timestamp
     * updatedAt: timestamp

7. GENRES COLLECTION
   - Document ID: genre slug (e.g., 'synthwave')
   - Fields:
     * name: string
     * description: string
     * image: string (URL)
     * color: string (hex color)
     * featured: boolean
     * productCount: number
     * createdAt: timestamp

8. CATEGORIES COLLECTION
   - Document ID: category slug
   - Fields:
     * name: string
     * description: string
     * image: string
     * featured: boolean
     * productCount: number

9. FEATURED_COLLECTIONS COLLECTION
   - Document ID: collection slug
   - Fields:
     * title: string
     * description: string
     * image: string
     * productIds: array
     * active: boolean
     * featured: boolean
     * createdAt: timestamp
     * endDate: timestamp (optional)

10. COUPONS COLLECTION
    - Document ID: coupon code
    - Fields:
      * code: string
      * type: string ('percentage', 'fixed')
      * value: number
      * minAmount: number
      * maxDiscount: number
      * uses: number
      * maxUses: number
      * active: boolean
      * expiresAt: timestamp
      * createdAt: timestamp

11. ANALYTICS COLLECTION
    - Document ID: date string (YYYY-MM-DD)
    - Fields:
      * date: timestamp
      * pageViews: number
      * uniqueVisitors: number
      * orders: number
      * revenue: number
      * topProducts: array
      * topGenres: array
      * userSignups: number

12. NOTIFICATIONS COLLECTION
    - Document ID: auto-generated
    - Fields:
      * userId: string
      * type: string ('order', 'product', 'artist', 'system')
      * title: string
      * message: string
      * data: object (additional data)
      * read: boolean
      * createdAt: timestamp

SECURITY RULES CONSIDERATIONS:
- Users can only read/write their own user document
- Artists can only manage their own products and see their order data
- Admin users have broader access
- Products and artists are publicly readable
- Orders are only readable by the user who created them and admins
- Implement proper validation rules for all writes

INDEXES NEEDED:
- Products: genre, artistId, featured, active, createdAt
- Orders: userId, status, createdAt
- Reviews: productId, rating, verified
- Analytics: date
*/

// Helper functions for database operations
export const DB_COLLECTIONS = {
    USERS: 'users',
    ARTISTS: 'artists',
    PRODUCTS: 'products',
    ORDERS: 'orders',
    REVIEWS: 'reviews',
    WISHLISTS: 'wishlists',
    GENRES: 'genres',
    CATEGORIES: 'categories',
    FEATURED_COLLECTIONS: 'featuredCollections',
    COUPONS: 'coupons',
    ANALYTICS: 'analytics',
    NOTIFICATIONS: 'notifications'
  };
  
  export const ORDER_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
  };
  
  export const PRODUCT_TYPES = {
    DIGITAL: 'digital',
    POSTER: 'poster',
    BUNDLE: 'bundle'
  };
  
  export const USER_ROLES = {
    USER: 'user',
    ARTIST: 'artist',
    ADMIN: 'admin'
  };