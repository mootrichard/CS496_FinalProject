const router = require('express').Router();

router.get('/', (req,res,next)=>{
	res.json({
    method: req.method,
    headers: req.headers,
    originalUrl: req.originalUrl,
    params: req.params,
    body: req.body
  });
});

module.exports = router;