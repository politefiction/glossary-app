const Entry = require('../models/entry-model')

createEntry = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an entry.'
    })
  }

  const entry = new Entry(body)

  if (!entry) {
    return res.status(400).json({ success: false, error: err })
  }

  entry
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: entry._id,
        message: 'Entry created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Entry not created!'
      })
    })
}

updateEntry = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update.'
    })
  }

  Entry.findOne({ _id: req.params.id }, (err, entry) => {
    if (err) {
      return res.status(400).json({
        err,
        message: 'Entry not found!'
      })
    }
    entry.term = body.term
    entry.definition = body.definition
    entry
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: entry._id,
          message: 'Entry updated!'
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Entry not updated!'
        })
      })
  })
}

deleteEntry = async (req, res) => {
  await Entry.findOneAndDelete({ _id: req.params.id }, (err, entry) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!entry) {
      return res.status(404).json({ success: false, error: 'Entry not found' })
    }

    return res.status(200).json({ success: true, data: entry })
  }).catch(err => console.log(err))
}

getEntryById = async (req, res) => {
  await Entry.findOne({ _id: req.params.id }, (err, entry) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!entry) {
      return res.status(404).json({ success: false, error: 'Entry not found' })
    }

    return res.status(200).json({ success: true, data: entry })
  }).catch(err => console.log(err))
}

getEntries = async (req, res) => {
  await Entry.find({}, (err, entries) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!entries.length) {
      return res
        .status(404)
        .json({ success: false, error: 'Entries not found' })
    }

    return res.status(200).json({ success: true, data: entries })
  }).catch(err => console.log(err))
}

searchEntries = async (req, res) => {
  let regex = new RegExp(`${req.params.query}`, 'i')
  await Entry.find(
    { $or: [{ term: regex }, { definition: regex }] },
    (err, entries) => {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }

      if (!entries.length) {
        return res
          .status(404)
          .json({ success: false, error: 'Entries not found' })
      }

      return res.status(200).json({ success: true, data: entries })
    }
  ).catch(err => console.log(err))
}

module.exports = {
  createEntry,
  updateEntry,
  deleteEntry,
  getEntries,
  getEntryById,
  searchEntries
}
