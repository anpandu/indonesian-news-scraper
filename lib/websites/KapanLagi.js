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
  var content = KapanLagi.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content
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
  var date = undefined
  date = (_.isUndefined(date)) ? $('div#newsdetail-right-new span').html() : date
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.toISOString()
}

KapanLagi.prototype.getImg = function($) {
  return $('div#newsdetail-right-new div.entertainment-newsdetail-headlineimg img').attr('src')
}

KapanLagi.prototype.getContent = function($) {
  var content = undefined
  if (!_.isNull($('div.entertainment-detail-news').html())) {
    $('div.entertainment-detail-news').html($('div.entertainment-detail-news').html().replace(/(\<[^<>]*\>)/g, ' $1'))
    content = (_.isUndefined(content)) ? $('div.entertainment-detail-news').text() : content
  }
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t)+/g, '')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new KapanLagi ()