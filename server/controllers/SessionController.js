var Session = require('../models/SessionModel.js');
var moment = require('moment');

module.exports = {
  createSession: function(req, res) {
    console.log('here', req.body)
    // Dummy data for now in: title, description, subject, and duration
    console.log(req.data, 'REQ DATA')
    console.log(req.body, 'REQ BODY')
    var sessionObj = {
      userId: req.user.id,
      // title: req.body.title,
      // description: req.body.description,
      // subject: req.body.subject,
      practice_id: req.body.practiceId,
      date: moment().format('MMMM Do YYYY, h:mm a'),
      duration: 'Temporary Duration'
    }

    return new Session(sessionObj).save()
      .then(function(newSession) {
        res.status(201).send(newSession);
      })
      .catch(function(err) {
       console.log(err);
      });
  },

  getSessions: function(req, res) {
    console.log('get sessions', req.body); 
    var queryObj = {
      practice_id: req.params.practiceId
    }


    Session.where(queryObj).fetchAll()
      .then(function(sessions) {
        console.log("length of sessions: ", sessions.length);
        res.status(200).send(sessions);
      })
      .catch(function(err) {
        console.error(err);
      })
  },

  updateSession: function(req, res) {
    return Session.forge({id: req.body.sessionId})
      .fetch()
      .then(function(session) {
        return session.save({
          duration: req.body.difference
        });
      })
      .then(function(updatedSession) {
        res.status(201).send(updatedSession)
      })
      .catch(function(err) {
        console.log('Error in updating session', err);
        res.status(500).send('Error in updating session', err);
      })
  }

}