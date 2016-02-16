/*! indonesian-news-scraper v2.4.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var request = require('request-promise')
var cheerio = require('cheerio')
var moment = require('moment')
var Promise = require('bluebird')


var Liputan6 = function () {}

Liputan6.prototype.source = 'Liputan6'
Liputan6.prototype.baseURL = 'http://www.liputan6.com/indeks'

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Liputan6.prototype.getBaseURL = function() {
  return Liputan6.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Liputan6.prototype.scrap = function() {
  return Promise.resolve()
    .then(Liputan6.prototype.getBaseURL)
    .then(request)
    .then(Liputan6.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Liputan6.prototype.getDataFromSinglePage)
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
Liputan6.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Liputan6.prototype.getBaseURL)
    .then(request)
    .then(Liputan6.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Liputan6.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('div article aside header h4 a')
    .map(function (index, item) {
      var url = $(item).attr('href')
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
Liputan6.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Liputan6.prototype.getURL($)
  var title = Liputan6.prototype.getTitle($)
  var date = Liputan6.prototype.getDate($)
  var img = Liputan6.prototype.getImg($)
  var content = Liputan6.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Liputan6.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Liputan6.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Liputan6.prototype.getTitle = function($) {
  return $('meta[property="og:title"]').attr('content')
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Liputan6.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('meta[itemprop=datePublished]').attr('content') : date
  date = (_.isUndefined(date)) ? $('div article header div p time').attr('datetime') : date

  date = date.replace(/Januari/g, 'Januari')
  date = date.replace(/February/g, 'February')
  date = date.replace(/Maret/g, 'March')
  date = date.replace(/Mei/g, 'May')
  date = date.replace(/Juni/g, 'June')
  date = date.replace(/Juli/g, 'July')
  date = date.replace(/Agustus/g, 'Mei')
  date = date.replace(/Oktober/g, 'October')
  date = date.replace(/Desember/g, 'December')
  
  var d = moment(date, 'YYYY-MM-DD HH:mm:ss').add(7, 'h')
  return d.toISOString()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Liputan6.prototype.getImg = function($) {
  return $('meta[property="og:image"]').attr('content')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Liputan6.prototype.getContent = function($) {
  $('div article div div div#multi-page-0').find('b').remove()
  $('div article div div div#multi-page-0').find('div').remove()
  var content = $('div article div div div#multi-page-0').find('p')
    .map(function (index, element) {
      var text = $(this).text()
      return (text === 'Baca Juga') ? '' : text
    })
    .get()
    .join(' ')
  content = Liputan6.prototype.cleanContent(content)
  if (content === '') {
    content = $('div article div figure figcaption')
      .map(function (index, item) { return (item.children.length > 0) ? item.children[0].data : '' })
      .get()
      .join(' ') 
  }
  content = Liputan6.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Liputan6.prototype.cleanContent = function(content) {
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—|--)+/g, '-')
  content = content.replace(/”|“/g, '"')
  while ((content[0]===' ')||(content[0]==='-'))
    content = content.substring(1)
  while (content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  return content
}

module.exports = new Liputan6 ()