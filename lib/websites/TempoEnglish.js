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

var TempoEnglish = function () {}


TempoEnglish.prototype.baseURL = "http://en.tempo.co/index"

TempoEnglish.prototype.getBaseURL = function() {
  return TempoEnglish.prototype.baseURL
}

TempoEnglish.prototype.scrap = function() {
  return Promise.resolve()
    .then(TempoEnglish.prototype.getBaseURL)
    .then(request)
    .then(TempoEnglish.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(TempoEnglish.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

TempoEnglish.prototype.getURLs = function() {
  return Promise.resolve()
    .then(TempoEnglish.prototype.getBaseURL)
    .then(request)
    .then(TempoEnglish.prototype.getURLsFromMainPage)
}

TempoEnglish.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)             
  var urls = $('ul.indeks-list li')
    .map(function (index, item) {
      return 'http://en.tempo.co' + $(item).find('h2 a').attr('href')
    })
    .get()
  return urls
}

TempoEnglish.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = TempoEnglish.prototype.getURL($)
  var title = TempoEnglish.prototype.getTitle($)
  var date = TempoEnglish.prototype.getDate($)
  var img = TempoEnglish.prototype.getImg($)
  var content = TempoEnglish.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content
  }
  return result
}

TempoEnglish.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

TempoEnglish.prototype.getTitle = function($) {
  return $('div.judul-konten').text()
}

TempoEnglish.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('div.kolom-2-kolom div.tanggal').text(): date
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.toISOString()
}

TempoEnglish.prototype.getImg = function($) {
  return $('div.foto-konten img').attr('src')
}

TempoEnglish.prototype.getContent = function($) {
  var content = $('div.tubuh-berita').text()
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new TempoEnglish ()