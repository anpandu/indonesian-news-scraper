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

var Viva = function () {}


Viva.prototype.baseURL = 'http://www.republika.co.id/rss'

Viva.prototype.getBaseURL = function() {
  return Viva.prototype.baseURL
}

Viva.prototype.scrap = function() {
  return Promise.resolve()
    .then(Viva.prototype.getBaseURL)
    .then(request)
    .then(Viva.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Viva.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

Viva.prototype.getURLsFromMainPage = function(scrap) {
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

Viva.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Viva.prototype.getURL($)
  var title = Viva.prototype.getTitle($)
  var date = Viva.prototype.getDate($)
  var img = Viva.prototype.getImg($)
  var summary = Viva.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  } 
  return result
}

Viva.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

Viva.prototype.getTitle = function($) {
  return $('div.content-detail-center h1.jdl-detail').text()
}

Viva.prototype.getDate = function($) {
  $('div.content-detail-center div.rangka div.date').find('a').remove()
  var date = $('div.content-detail-center div.rangka div.date').text()
  date = date.replace('WIB', '').replace(',', '').replace('|', '').replace(/(\n|\t)+/g, '')
  return date
}

Viva.prototype.getImg = function($) {
  return $('div.content-detail-center div.img-detailberita img').attr('src')
}

Viva.prototype.getSummary = function($) {
  var summary = $('div.content-detail-center div.txt-detailberita').text()
  summary = summary.replace(/(\n|\t)+/g, ' ')
  summary = summary.replace(/(\ \ +)/g, ' ')
  return summary
}

module.exports = new Viva ()