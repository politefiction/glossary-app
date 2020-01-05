const express = require('express')
const EntryCtrl = require('../controllers/entry-ctrl')
const router = express.Router()
const passport = require('passport')
require('../validation/passport')(passport)

router.post(
  '/entry',
  passport.authenticate('jwt', { session: false }),
  EntryCtrl.createEntry
)
router.put(
  '/entry/:id',
  passport.authenticate('jwt', { session: false }),
  EntryCtrl.updateEntry
)
router.delete(
  '/entry/:id',
  passport.authenticate('jwt', { session: false }),
  EntryCtrl.deleteEntry
)
router.get('/entry/:id', EntryCtrl.getEntryById)
router.get('/entries', EntryCtrl.getEntries)
router.get('/entries/:query', EntryCtrl.searchEntries)

module.exports = router

/*

*/
