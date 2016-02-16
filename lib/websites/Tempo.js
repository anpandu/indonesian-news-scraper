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
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Tempo.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Tempo.prototype.getBaseURL)
    .then(request)
    .then(Tempo.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
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
 * Get all data from scraped single page.
 * @param {string} scrap - String scraped from single page.
 * @return {Array} Array of URLs scraped from Website's main page.
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

  date = date.replace(/Januari/g, 'Januari')
  date = date.replace(/February/g, 'February')
  date = date.replace(/Maret/g, 'March')
  date = date.replace(/Mei/g, 'May')
  date = date.replace(/Juni/g, 'June')
  date = date.replace(/Juli/g, 'July')
  date = date.replace(/Agustus/g, 'Mei')
  date = date.replace(/Oktober/g, 'October')
  date = date.replace(/Desember/g, 'December')
  
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
  content = Tempo.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Tempo.prototype.cleanContent = function(content) {
  content = content.replace(/(\n|\t)+/g, ' ')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—)+/g, '-')
  content = content.replace(/”|“/g, '"')
  while ((content[0]===' ')||(content[0]==='-'))
    content = content.substring(1)
  while (content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  return content
}

module.exports = new Tempo ()