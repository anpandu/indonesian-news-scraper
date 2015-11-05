/*! news-scrapper v1.4.0 - MIT license */

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

var Republika = function () {}


Republika.prototype.baseURL = 'http://www.republika.co.id/rss'

Republika.prototype.getBaseURL = function() {
  return Republika.prototype.baseURL
}

Republika.prototype.scrap = function() {
  return Promise.resolve()
    .then(Republika.prototype.getBaseURL)
    .then(request)
    .then(Republika.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Republika.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Republika.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      $(item).find('title').remove()
      $(item).find('description').remove()
      $(item).find('enclosure').remove()
      $(item).find('pubdate').remove()
      $(item).find('guid').remove()
      $(item).find('comments').remove()
      $(item).find('category').remove()
      $(item).find('dc\\:creator').remove()
      $(item).find('content\\:encoded').remove()
      var url = $(item).text()
      url = url.replace(/\s+/g, '')
      return url
    })
    .get()
  return urls
}

Republika.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Republika.prototype.getURL($)
  var title = Republika.prototype.getTitle($)
  var date = Republika.prototype.getDate($)
  var img = Republika.prototype.getImg($)
  var summary = Republika.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  } 
  return result
}

Republika.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

Republika.prototype.getTitle = function($) {
  return $('div.content-detail-center h1.jdl-detail').text()
}

Republika.prototype.getDate = function($) {
  $('div.content-detail-center div.rangka div.date').find('a').remove()
  var date = $('div.content-detail-center div.rangka div.date').text()
  date = date.replace('WIB', '').replace(',', '').replace('|', '').replace(/(\n|\t)+/g, '')
  return date
}

Republika.prototype.getImg = function($) {
  return $('div.content-detail-center div.img-detailberita img').attr('src')
}

Republika.prototype.getSummary = function($) {
  var summary = $('div.content-detail-center div.txt-detailberita').text()
  summary = summary.replace(/(\n|\t)+/g, ' ')
  summary = summary.replace(/(\ \ +)/g, ' ')
  return summary
}

module.exports = new Republika ()