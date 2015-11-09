/*! news-scrapper v2.0.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')


var Antara = function () {}

Antara.prototype.baseURL = 'http://www.antaranews.com/rss/news.xml'

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Antara.prototype.getBaseURL = function() {
  return Antara.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Antara.prototype.scrap = function() {
  return Promise.resolve()
    .then(Antara.prototype.getBaseURL)
    .then(request)
    .then(Antara.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Antara.prototype.getDataFromSinglePage)
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
Antara.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Antara.prototype.getBaseURL)
    .then(request)
    .then(Antara.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scrapped main page.
 * @param {string} scrap - String scrapped from main page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Antara.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      $(item).find('title').remove()
      $(item).find('description').remove()
      $(item).find('enclosure').remove()
      $(item).find('pubdate').remove()
      $(item).find('guid').remove()
      var url = $(item).text()
      url = url.replace(/(\n|\ )+/g, '')
      return url
    })
    .get()
  return urls
}

/**
 * Get all data from scrapped single page.
 * @param {string} scrap - String scrapped from single page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Antara.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Antara.prototype.getURL($)
  var title = Antara.prototype.getTitle($)
  var date = Antara.prototype.getDate($)
  var img = Antara.prototype.getImg($)
  var content = Antara.prototype.getContent($)
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
Antara.prototype.getURL = function($) {
  return $('div.bjbrt a[itemprop=url]').attr('href')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Antara.prototype.getTitle = function($) {
  return $('div.bjbrt h1[itemprop=headline]').text()
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Antara.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('meta[itemprop=datePublished]').attr('content') : date
  date = (_.isUndefined(date)) ? $('div.bjbrt div.date.mt10').text() : date
  return date
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Antara.prototype.getImg = function($) {
  return $('div#image_news img').attr('src')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Antara.prototype.getContent = function($) {
  $('div#content_news').find('p').remove()
  $('div#content_news').find('script').remove()
  $('div#content_news').find('div').remove()
  var content = $('div#content_news').text()
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Antara ()