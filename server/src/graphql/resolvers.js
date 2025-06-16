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
  }
}

module.exports = {resolvers};