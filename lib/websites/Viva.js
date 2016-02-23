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


var Viva = function () {}

Viva.prototype.source = 'Viva'
Viva.prototype.baseURL = 'http://www.viva.co.id/indeks'

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Viva.prototype.getBaseURL = function() {
  return Viva.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Viva.prototype.scrap = function() {
  return Promise.resolve()
    .then(Viva.prototype.getBaseURL)
    .then(request)
    .then(Viva.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {
              var options = {
                uri: url,
                headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36' },
                json: true
              }
              return options
            })
            .then(request)
            .then(Viva.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error('['+Viva.prototype.source+'] ['+e.name+' - '+e.message.replace(/(\n|\r)/g,'').slice(0,32)+' ...] '+url)
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
Viva.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Viva.prototype.getBaseURL)
    .then(request)
    .then(Viva.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Viva.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('ul.indexlist li a')
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
Viva.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Viva.prototype.getURL($)
  var title = Viva.prototype.getTitle($)
  var date = Viva.prototype.getDate($)
  var img = Viva.prototype.getImg($)
  var content = Viva.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Viva.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Viva.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Viva.prototype.getTitle = function($) {
  return $('meta[property="og:title"]').attr('content')
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Viva.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('meta[name=pubdate]').attr('content') : date
  date = (_.isUndefined(date)) ? $('meta[itemprop=datePublished]').attr('content') : date
  date = (_.isUndefined(date)) ? $('meta[property="article:published_time"]').attr('content') : date
  return date
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Viva.prototype.getImg = function($) {
  return $('meta[property="og:image"]').attr('content')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Viva.prototype.getContent = function($) {
  $('div div article div span').find('script').remove()
  $('div div article div span').find('strong').remove()
  $('div div article div span').find('iframe').remove()
  $('div div article div span').find('blockquote').remove()
  var content = $('div div article div span').text()
  content = Viva.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Viva.prototype.cleanContent = function(content) {
  content = (_.isUndefined(content)) ? '' : content
  content = content.replace(/(\n|\t|\r)+/g, ' ')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—|--)+/g, '-')
  content = content.replace(/”|“/g, '"')
  while (content.length > 0 && content[0].match(/( |-|,)/))
    content = content.substring(1)
  while (content.length > 0 && content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  return content
}

module.exports = new Viva ()