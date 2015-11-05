/*! news-scrapper v1.3.0 - MIT license */

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

var Okezone = function () {}


Okezone.prototype.baseURL = 'http://www.okezone.com/'

Okezone.prototype.getBaseURL = function() {
  return Okezone.prototype.baseURL
}

Okezone.prototype.scrap = function() {
  return Promise.resolve()
    .then(Okezone.prototype.getBaseURL)
    .then(request)
    .then(Okezone.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Okezone.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Okezone.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('div#area ul li div div h3')
    .map(function (index, item) {
      var url = $(item).find('a').attr('href')
      return url
    })
    .get()
  return urls
}

Okezone.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Okezone.prototype.getURL($)
  var title = Okezone.prototype.getTitle($)
  var date = Okezone.prototype.getDate($)
  var img = Okezone.prototype.getImg($)
  var summary = Okezone.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  } 
  return result
}

Okezone.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

Okezone.prototype.getTitle = function($) {
  return $('div.news-home div.titles').text()
}

Okezone.prototype.getDate = function($) {
  var date = $('div.news-home time.tgl').text()
  date = date.replace('wib', '').replace(',', '').replace('|', '').replace(/(\n|\t)+/g, '')
  return date
}

Okezone.prototype.getImg = function($) {
  return $('div.news-home img#imgCheck').attr('src')
}

Okezone.prototype.getSummary = function($) {
  var summary = $('div.news-home div#contentx').text()
  summary = summary.replace(/(\n|\t)+/g, ' ')
  summary = summary.replace(/(\ \ +)/g, ' ')
  return summary
}

module.exports = new Okezone ()