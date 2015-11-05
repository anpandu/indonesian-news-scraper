/*! news-scrapper v0.0.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')

/**
 * @param {}
 * @return {}
 * @api public
 */

var Detik = function () {}


Detik.prototype.baseURL = "http://detik.feedsportal.com/c/33613/f/656082/index.rss"

Detik.prototype.getBaseURL = function() {
  return Detik.prototype.baseURL
}

Detik.prototype.scrap = function() {
  return Promise.resolve()
    .then(Detik.prototype.getBaseURL)
    .then(request)
    .then(Detik.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Detik.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Detik.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      $(item).find('title').remove()
      $(item).find('description').remove()
      $(item).find('enclosure').remove()
      var url = $(item).text()
      url = url.replace(/\n/g, '')
      return url
    })
    .get()
  return urls
}

Detik.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Detik.prototype.getURL($)
  var title = Detik.prototype.getTitle($)
  var date = Detik.prototype.getDate($)
  var img = Detik.prototype.getImg($)
  var summary = Detik.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  } 
  return result
}

Detik.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

Detik.prototype.getTitle = function($) {
  return $('div.content_detail h1').text()
}

Detik.prototype.getDate = function($) {
  var date = $('div.content_detail div.date').text()
  date = date.replace('WIB', '').replace(',', '').replace('|', '')
  return date
}

Detik.prototype.getImg = function($) {
  return $('div.pic_artikel img').attr('src')
}

Detik.prototype.getSummary = function($) {
  var summary = $('div.text_detail').html()
  summary = summary.replace(/\<[^<>]*\>/g, ' ')
  summary = summary.replace(/\&quot\;/g, '"')
  summary = summary.replace(/(\n|\t)+/g, '')
  summary = summary.replace(/(\ \ +)/g, ' ')
  return summary
}

module.exports = new Detik ()