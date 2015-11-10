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


var Kompas = function () {}

Kompas.prototype.source = 'Kompas'
Kompas.prototype.baseURL = "http://news.kompas.com/"

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Kompas.prototype.getBaseURL = function() {
  return Kompas.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Kompas.prototype.scrap = function() {
  return Promise.resolve()
    .then(Kompas.prototype.getBaseURL)
    .then(request)
    .then(Kompas.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Kompas.prototype.getDataFromSinglePage)
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
Kompas.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Kompas.prototype.getBaseURL)
    .then(request)
    .then(Kompas.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scrapped main page.
 * @param {string} scrap - String scrapped from main page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Kompas.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)             
  var urls = $('div.kcm-idx-channel ul li')
    .map(function (index, item) {
      return $(item).find('div.list-latest a').attr('href')
    })
    .get()
  return urls
}

/**
 * Get all data from scrapped single page.
 * @param {string} scrap - String scrapped from single page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Kompas.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Kompas.prototype.getURL($)
  var title = Kompas.prototype.getTitle($)
  var date = Kompas.prototype.getDate($)
  var img = Kompas.prototype.getImg($)
  var content = Kompas.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Kompas.prototype.source
  }
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Kompas.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Kompas.prototype.getTitle = function($) {
  return $('div.kcm-read div.kcm-read-top h2').text()
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Kompas.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('div.kcm-read div.msmall.grey.mb2').text() : date
  var d = moment(date, 'D MMMM YYYY | HH:mm')
  return d.toISOString()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Kompas.prototype.getImg = function($) {
  return $('div.kcm-read div.photo img').attr('src')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Kompas.prototype.getContent = function($) {
  var content = $('div.kcm-read-text').text()
  content = content.replace(/(\n|\t)+/g, '')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Kompas ()