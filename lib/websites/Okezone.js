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
              console.error('['+Okezone.prototype.source+'] ['+e.name+' - '+e.message.replace(/(\n|\r)/g,'').slice(0,32)+' ...] '+url)
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
Okezone.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Okezone.prototype.getBaseURL)
    .then(request)
    .then(Okezone.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
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
 * Get all data from scraped single page.
 * @param {string} scrap - String scraped from single page.
 * @return {Array} Array of URLs scraped from Website's main page.
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
  content = Okezone.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Okezone.prototype.cleanContent = function(content) {
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

module.exports = new Okezone ()