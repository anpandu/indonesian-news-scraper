/*! indonesian-news-scraper v2.4.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var moment = require('moment')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')


var Republika = function () {}

Republika.prototype.source = 'Republika'
Republika.prototype.baseURL = 'http://www.republika.co.id/rss'

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Republika.prototype.getBaseURL = function() {
  return Republika.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
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

/**
 * Get all single page URLs from main page.
 * @param {}
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Republika.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Republika.prototype.getBaseURL)
    .then(request)
    .then(Republika.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
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

/**
 * Get all data from scraped single page.
 * @param {string} scrap - String scraped from single page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Republika.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Republika.prototype.getURL($)
  var title = Republika.prototype.getTitle($)
  var date = Republika.prototype.getDate($)
  var img = Republika.prototype.getImg($)
  var content = Republika.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Republika.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Republika.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Republika.prototype.getTitle = function($) {
  return $('div.jdl-detail h2').text()
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Republika.prototype.getDate = function($) {
  $('div.content-detail-center div.rangka div.date').find('a').remove()
  var date = undefined
  date = (_.isUndefined(date)) ? $('div.content-detail-center div.rangka div.date').text() : date
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.toISOString()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Republika.prototype.getImg = function($) {
  return $('meta[property="og:image"]').attr('content')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Republika.prototype.getContent = function($) {
  var content = undefined
  content = (_.isUndefined(content)) ? $('div.detail-berita div.content-detail').text() : content
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Republika ()