/*! news-scrapper v2.0.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var moment = require('moment')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')

/**
 * @param {}
 * @return {}
 * @api public
 */

var Tempo = function () {}


Tempo.prototype.baseURL = "http://tempo.co/"

Tempo.prototype.getBaseURL = function() {
  return Tempo.prototype.baseURL
}

Tempo.prototype.scrap = function() {
  return Promise.resolve()
    .then(Tempo.prototype.getBaseURL)
    .then(request)
    .then(Tempo.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Tempo.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Tempo.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Tempo.prototype.getBaseURL)
    .then(request)
    .then(Tempo.prototype.getURLsFromMainPage)
}

Tempo.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('ul.list-terkini li div.box-text h3')
    .map(function (index, item) {
      return $(item).find('a').attr('href')
    })
    .get()
  return urls
}

Tempo.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Tempo.prototype.getURL($)
  var title = Tempo.prototype.getTitle($)
  var date = Tempo.prototype.getDate($)
  var img = Tempo.prototype.getImg($)
  var content = Tempo.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content
  } 
  return result
}

Tempo.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

Tempo.prototype.getTitle = function($) {
  return $('div.artikel h1').text().replace(/(\n|\t)*/g, '')
}

Tempo.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('div.artikel div.block-tanggal').text() : date
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.toISOString()
}

Tempo.prototype.getImg = function($) {
  return $('div.artikel div.single-img img').attr('src')
}

Tempo.prototype.getContent = function($) {
  var content = undefined
  content = (_.isUndefined(content)) ? $('div.artikel p').text() : content
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Tempo ()