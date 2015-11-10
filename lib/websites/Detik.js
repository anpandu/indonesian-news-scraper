/*! news-scrapper v2.1.0 - MIT license */

'use strict'

/**
 * Module dependencies
 */
var _ = require('lodash')
var request = require('request-promise')
var cheerio = require('cheerio')
var Promise = require('bluebird')


var Detik = function () {}

Detik.prototype.source = 'Detik'
Detik.prototype.baseURL = "http://detik.feedsportal.com/c/33613/f/656082/index.rss"

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Detik.prototype.getBaseURL = function() {
  return Detik.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Detik.prototype.scrap = function() {
  return Promise.resolve()
    .then(Detik.prototype.getBaseURL)
    .then(request)
    .then(Detik.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(Detik.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error(e.message)
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
Detik.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Detik.prototype.getBaseURL)
    .then(request)
    .then(Detik.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scrapped main page.
 * @param {string} scrap - String scrapped from main page.
 * @return {Array} Array of URLs scrapped from Website's main page.
 */
Detik.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      $(item).find('title').remove()
      $(item).find('description').remove()
      $(item).find('enclosure').remove()
      var url = $(item).text()
      url = url.replace(/\n/g, '')
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
Detik.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Detik.prototype.getURL($)
  var title = Detik.prototype.getTitle($)
  var date = Detik.prototype.getDate($)
  var img = Detik.prototype.getImg($)
  var content = Detik.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Detik.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Detik.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Detik.prototype.getTitle = function($) {
  var title = undefined
  title = (_.isUndefined(title)) ? $('meta[property="og:title"]').attr('content') : title
  title = (_.isUndefined(title)) ? $('div.content_detail h1').text() : title
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Detik.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('div.content_detail div.date').text() : date
  return date
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Detik.prototype.getImg = function($) {
  var img = undefined
  img = (_.isUndefined(img)) ? $('meta[property="og:image"]').attr('content') : img
  img = (_.isUndefined(img)) ? $('div.content_detail img').attr('src') : img
  img = (_.isUndefined(img)) ? $('div.pic_artikel img').attr('src') : img
  img = (_.isUndefined(img)) ? $('div.detail_text img').attr('src') : img
  return img
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Detik.prototype.getContent = function($) {
  var content = undefined
  if (!_.isNull($('div.text_detail').html())) {
    $('div.text_detail').filter(function() { return this.type === 'comment'; }).remove();
    $('div.text_detail').html($('div.text_detail').html().replace(/(\<[^<>]*\>)/g, ' $1'))
    content = (_.isUndefined(content)) ? $('div.text_detail').text() : content
  }
  if (!_.isNull($('div.detail_text').html())) {
    $('div.detail_text').filter(function() { return this.type === 'comment'; }).remove();
    $('div.detail_text').html($('div.detail_text').html().replace(/(\<[^<>]*\>)/g, ' $1'))
    content = (_.isUndefined(content)) ? $('div.detail_text').text() : content
  }
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t)+/g, ' ')
  content = content.replace(/(\ \ +)/g, ' ')
  content = content.replace(/”/g, '"')
  content = (content[0] != ' ') ? content : content.substring(1)
  content = (content[content.length-1] != ' ') ? content : content.substring(0, content.length-1)
  return content
}

module.exports = new Detik ()