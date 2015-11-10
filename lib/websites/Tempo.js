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


var Tempo = function () {}

Tempo.prototype.source = 'Tempo'
Tempo.prototype.baseURL = "http://tempo.co/"

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Tempo.prototype.getBaseURL = function() {
  return Tempo.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Tempo.prototype.scrap = function() {
  return Promise.resolve()
    .then(Tempo.prototype.getBaseURL)
    .then(request)
    .then(Tempo.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Tempo.prototype.getDataFromSinglePage)
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
Tempo.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Tempo.prototype.getBaseURL)
    .then(request)
    .then(Tempo.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scrapped main page.
 * @param {string} scrap - String scrapped from main page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Tempo.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('ul.list-terkini li div.box-text h3')
    .map(function (index, item) {
      return $(item).find('a').attr('href')
    })
    .get()
  return urls
}

/**
 * Get all data from scrapped single page.
 * @param {string} scrap - String scrapped from single page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Tempo.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Tempo.prototype.getURL($)
  var title = Tempo.prototype.getTitle($)
  var date = Tempo.prototype.getDate($)
  var img = Tempo.prototype.getImg($)
  var content = Tempo.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Tempo.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Tempo.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Tempo.prototype.getTitle = function($) {
  return $('div.artikel h1').text().replace(/(\n|\t)*/g, '')
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Tempo.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('div.artikel div.block-tanggal').text() : date
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.toISOString()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Tempo.prototype.getImg = function($) {
  return $('div.artikel div.single-img img').attr('src')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Tempo.prototype.getContent = function($) {
  var content = undefined
  content = (_.isUndefined(content)) ? $('div.artikel p').text() : content
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Tempo ()