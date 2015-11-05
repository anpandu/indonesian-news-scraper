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

var KapanLagi = function () {}


KapanLagi.prototype.baseURL = "http://www.kapanlagi.com/feed/"

KapanLagi.prototype.getBaseURL = function() {
  return KapanLagi.prototype.baseURL
}

KapanLagi.prototype.scrap = function() {
  return Promise.resolve()
    .then(KapanLagi.prototype.getBaseURL)
    .then(request)
    .then(KapanLagi.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(KapanLagi.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.name)
              return {}
            })
        })
      return Promise.all(promises)
    })
}

KapanLagi.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      $(item).find('title').remove()
      $(item).find('description').remove()
      $(item).find('enclosure').remove()
      $(item).find('category').remove()
      $(item).find('pubdate').remove()
      $(item).find('guid').remove()
      $(item).find('dc\\:creator').remove()
      $(item).find('content\\:encoded').remove()
      var url = $(item).text()
      url = url.replace(/\s/g, '')
      return url
    })
    .get()
  return urls
}

KapanLagi.prototype.getDataFromSinglePage = function(scrap) {
  // console.log(scrap)
  var $ = cheerio.load(scrap)
  var url = KapanLagi.prototype.getURL($)
  var title = KapanLagi.prototype.getTitle($)
  var date = KapanLagi.prototype.getDate($)
  var img = KapanLagi.prototype.getImg($)
  var summary = KapanLagi.prototype.getSummary($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'summary': summary
  } 
  return result
}

KapanLagi.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

KapanLagi.prototype.getTitle = function($) {
  return $('div#newsdetail-right-new h1').text()
}

KapanLagi.prototype.getDate = function($) {
  var date = $('div#newsdetail-right-new span').html()
  date = date.replace('WIB', '').replace(',', '').replace('|', '')
  return date
}

KapanLagi.prototype.getImg = function($) {
  return $('div#newsdetail-right-new div.entertainment-newsdetail-headlineimg img').attr('src')
}

KapanLagi.prototype.getSummary = function($) {
  var summary = $('div#newsdetail-right-new div.entertainment-detail-news').text()
  summary = summary.replace(/(\n|\t)+/g, '')
  summary = summary.replace(/(\ \ +)/g, ' ')
  return summary
}

module.exports = new KapanLagi ()