module.exports = {
  APIMiddleware: ({ apps }) => (
    (req, res, next) => {
      const appName = req.body.app
      if (!(appName in apps)) {
        res.status(404).json({ error: `Unknown app : ${req.body.app}` })
      } else {
        apps[appName](req)
        .then(response => {
          res.json({
            response,
          })
        })
        .catch(err => {
          next(err)
        })
      }
    }
  ),
}
