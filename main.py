#!/usr/bin/env python

import wsgiref.handlers
from datetime import datetime, timedelta

import webapp2
import hashlib
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.api import urlfetch, mail, memcache, users, taskqueue
from google.appengine.ext import db

class Location(db.Model):
    username = db.StringProperty()
    discuss = db.StringProperty()
    x = db.StringProperty()
    y = db.StringProperty()
    created = db.DateTimeProperty(auto_now_add=True)
    until = db.DateTimeProperty()

    def icon(self):
        return "http://www.gravatar.com/avatar/" + hashlib.md5(self.username.lower()+"@hackerdojo.com").hexdigest()          


class MainHandler(webapp2.RequestHandler):
  def get(self):
    scale = "0.75"
    if self.request.get('scale'):
        scale = self.request.get('scale')
    self.response.out.write(template.render('main.html', locals()))

class ReadonlyHandler(webapp2.RequestHandler):
  def get(self):
    scale = "1.00"
    if self.request.get('scale'):
        scale = self.request.get('scale')
    readonly = True
    now = datetime.now()
    locations = Location.all().filter('until >', now).fetch(500)
    self.response.out.write(template.render('map.html', locals()))


class MapHandler(webapp2.RequestHandler):
  def get(self):
    user = users.get_current_user()
    if not user:
      self.redirect(users.create_login_url('/map'))
    else:
      name = user.nickname()
      myicon = "http://www.gravatar.com/avatar/" + hashlib.md5(name.lower()+"@hackerdojo.com").hexdigest() 
      now = datetime.now()
      locations = Location.all().filter('until >', now).fetch(500)
      self.response.out.write(template.render('map.html', locals()))

  def post(self):
    user = users.get_current_user()
    if not user:
        self.redirect(users.create_login_url('/map'))
    else:
        username = user.nickname()
        discuss = self.request.get('discuss')[:100].replace('\n', ' ')
        x = self.request.get('x')
        y = self.request.get('y')
        strhours = self.request.get('hours')        
        now = datetime.now()
        until = now

        try:
          h = int(strhours)
          if h > 12:
              h = 12
          delta = timedelta(hours=h)
          until = now + delta
        except:
          self.response.out.write("Please enter a whole number in the 'hours' field.")
          return

        location = Location.all().filter('username =', username).get()
        if location:
            location.x = x
            location.y = y
            location.discuss = discuss
            location.until = until
        else:
            location = Location(x=x,y=y,username=username,discuss=discuss,until=until)
        location.put()
        self.response.out.write("Okay, you are on the map!  Have a good day. <a href='/map'>Back</a>")


app = webapp2.WSGIApplication([
  ('/', MainHandler),
  ('/map', MapHandler),
  ('/readonly', ReadonlyHandler),
],debug=True)





