/*! news-scrapper v2.2.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var moment = require('moment')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')


var Okezone = function () {}

Okezone.prototype.source = 'Okezone'
Okezone.prototype.baseURL = 'http://www.okezone.com/'

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Okezone.prototype.getBaseURL = function() {
  return Okezone.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Okezone.prototype.scrap = function() {
  return Promise.resolve()
    .then(Okezone.prototype.getBaseURL)
    .then(request)
    .then(Okezone.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Okezone.prototype.getDataFromSinglePage)
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
Okezone.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Okezone.prototype.getBaseURL)
    .then(request)
    .then(Okezone.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scrapped main page.
 * @param {string} scrap - String scrapped from main page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Okezone.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('div#area ul li div div h3')
    .map(function (index, item) {
      var url = $(item).find('a').attr('href')
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
Okezone.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Okezone.prototype.getURL($)
  var title = Okezone.prototype.getTitle($)
  var date = Okezone.prototype.getDate($)
  var img = Okezone.prototype.getImg($)
  var content = Okezone.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Okezone.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Okezone.prototype.getURL = function($) {
  var url = undefined
  url = (_.isUndefined(url)) ? $('meta[property="og:url"]').attr('content') : url;
  url = (_.isUndefined(url)) ? $('link[rel=canonical]').attr('href') : url;
  return url
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Okezone.prototype.getTitle = function($) {
  var title = undefined
  title = (_.isUndefined(title)) ? $('div.titles h1').text() : title
  title = (_.isUndefined(title)) ? $('div.news-home div.titles').text() : title
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Okezone.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('time.tgl').text() : date
  date = (_.isUndefined(date)) ? $('div.news-home time.tgl').text() : date
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.toISOString()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Okezone.prototype.getImg = function($) {
  var img = undefined
  img = (_.isUndefined(img)) ? $('div.news-home img#imgCheck').attr('src') : img
  img = (_.isUndefined(img)) ? $('link[rel=image_src]').attr('href') : img;
  return img
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Okezone.prototype.getContent = function($) {
  var content = undefined
  $('div.news-home div#contentx').find('script').remove()
  content = (_.isUndefined(content)) ? $('div#contentx').text() : content
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Okezone ()