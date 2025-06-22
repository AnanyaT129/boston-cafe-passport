const { db } = require('../../firebase');

const resolvers = {
  Query: {
    getAllCafes: async (_, args, context) => {
      if (!context.uid) {
        throw new Error('Not authenticated');
      }

      // Destructure filtering parameters from args
      const {
        name,
        distance,
        rating,
        price,
        hasInternet,
        hasOutlets,
        timeLimit,
        rules,
        time,
        tags,
      } = args;

      const cafesRef = db.collection('cafes');
      const snapshot = await cafesRef.get();

      const cafes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Apply filters to the cafes array
      return cafes
    },

    getUser: async (_, args, context) => {
      if (!context.uid) {
        throw new Error('Not authenticated')
      }

      const {email} = args;
      const safeEmailId = encodeURIComponent(email);

      const usersRef = db.collection('users').doc(safeEmailId);
      const user = await usersRef.get();

      if (!user.exists) {
        throw new Error('User not found')
      }

      return user.data()
    }
  },
  Mutation: {
    setNewUser: async (_, args, context) => {
      if (!context.uid) {
        throw new Error('Not authenticated')
      }

      const { name, email } = args;

      const safeEmailId = encodeURIComponent(email);
      const userRef = db.collection('users').doc(safeEmailId);
      const existingUser = await userRef.get();

      if (existingUser.exists) {
        throw new Error('User already exists');
      }

      const newUser = {
        name: name,
        email: safeEmailId,
        createdAt: new Date().toISOString()
      };

      await userRef.set(newUser);

      return newUser;
    }
  }
}

module.exports = {resolvers};