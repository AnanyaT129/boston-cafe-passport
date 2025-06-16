const resolvers = {
  Query: {
    getAllCafes: (_, args) => {
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

      const cafes = []

      // Apply filters to the sets array
      return cafes.filter((cafe) => {
        return true
      });
    },
  }
}

module.exports = {resolvers};