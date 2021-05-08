module.exports = {
  // TODO: try rewrite
  async redirects() {
    return [
      {
        source: '/:id(\\d{1,})', // TODO: More strict check
        destination: '/tag/:id', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}
