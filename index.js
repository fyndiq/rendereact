module.exports = {
  APIMiddleware: ({ apps }) => (
    (req, res, next) => {
      const appName = req.body.app
      if (!(appName in apps)) {
        return Promise.resolve(
          res.status(404).json({ error: `Unknown app : ${req.body.app}` })
        )
      }
      return apps[appName](req)
      .then(response => {
        res.json({
          response,
        })
      })
      .catch(err => {
        next(err)
      })
    }
  ),
}
