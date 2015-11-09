/*! news-scrapper v2.1.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var moment = require('moment')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')


var TempoEnglish = function () {}

TempoEnglish.prototype.baseURL = "http://en.tempo.co/index"

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
TempoEnglish.prototype.getBaseURL = function() {
  return TempoEnglish.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
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

/**
 * Get all single page URLs from main page.
 * @param {}
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
TempoEnglish.prototype.getURLs = function() {
  return Promise.resolve()
    .then(TempoEnglish.prototype.getBaseURL)
    .then(request)
    .then(TempoEnglish.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scrapped main page.
 * @param {string} scrap - String scrapped from main page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
TempoEnglish.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)             
  var urls = $('ul.indeks-list li')
    .map(function (index, item) {
      return 'http://en.tempo.co' + $(item).find('h2 a').attr('href')
    })
    .get()
  return urls
}

/**
 * Get all data from scrapped single page.
 * @param {string} scrap - String scrapped from single page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
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

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
TempoEnglish.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
TempoEnglish.prototype.getTitle = function($) {
  return $('div.judul-konten').text()
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
TempoEnglish.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('div.kolom-2-kolom div.tanggal').text(): date
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.toISOString()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
TempoEnglish.prototype.getImg = function($) {
  return $('div.foto-konten img').attr('src')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
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