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


var KapanLagi = function () {}

KapanLagi.prototype.source = 'KapanLagi'
KapanLagi.prototype.baseURL = "http://www.kapanlagi.com/feed/"

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
KapanLagi.prototype.getBaseURL = function() {
  return KapanLagi.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
KapanLagi.prototype.scrap = function() {
  return Promise.resolve()
    .then(KapanLagi.prototype.getBaseURL)
    .then(request)
    .then(KapanLagi.prototype.getURLsFromMainPage)
    .then(function (urls) {
      var promises = urls
        .map(function (url) {
          return Promise.resolve()
            .then(function () {return url})
            .then(request)
            .then(KapanLagi.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error('['+KapanLagi.prototype.source+'] ['+e.name+' - '+e.message.replace(/(\n|\r)/g,'').slice(0,32)+' ...] '+url)
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
KapanLagi.prototype.getURLs = function() {
  return Promise.resolve()
    .then(KapanLagi.prototype.getBaseURL)
    .then(request)
    .then(KapanLagi.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
KapanLagi.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)
  var urls = $('rss channel item')
    .map(function (index, item) {
      $(item).find('title').remove()
      $(item).find('description').remove()
      $(item).find('enclosure').remove()
      $(item).find('category').remove()
      $(item).find('pubdate').remove()
      $(item).find('guid').remove()
      $(item).find('dc\\:creator').remove()
      $(item).find('content\\:encoded').remove()
      var url = $(item).text()
      url = url.replace(/\s/g, '')
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
KapanLagi.prototype.getDataFromSinglePage = function(scrap) {
  // console.log(scrap)
  var $ = cheerio.load(scrap)
  var url = KapanLagi.prototype.getURL($)
  var title = KapanLagi.prototype.getTitle($)
  var date = KapanLagi.prototype.getDate($)
  var img = KapanLagi.prototype.getImg($)
  var content = KapanLagi.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': KapanLagi.prototype.source
  } 
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
KapanLagi.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
KapanLagi.prototype.getTitle = function($) {
  return $('div#newsdetail-right-new h1').text()
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
KapanLagi.prototype.getDate = function($) {
  var date = undefined
  date = (_.isUndefined(date)) ? $('div#newsdetail-right-new span').html() : date
  var d = moment(date, 'DD MMMM YYYY HH:mm')

  date = date.replace(/Januari/g, 'Januari')
  date = date.replace(/February/g, 'February')
  date = date.replace(/Maret/g, 'March')
  date = date.replace(/Mei/g, 'May')
  date = date.replace(/Juni/g, 'June')
  date = date.replace(/Juli/g, 'July')
  date = date.replace(/Agustus/g, 'Mei')
  date = date.replace(/Oktober/g, 'October')
  date = date.replace(/Desember/g, 'December')

  return d.toISOString()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
KapanLagi.prototype.getImg = function($) {
  return $('div#newsdetail-right-new div.entertainment-newsdetail-headlineimg img').attr('src')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
KapanLagi.prototype.getContent = function($) {
  var content = undefined
  if (!_.isNull($('div.entertainment-detail-news').html())) {
    $('div.entertainment-detail-news').html($('div.entertainment-detail-news').html().replace(/(\<[^<>]*\>)/g, ' $1'))
    $('div.entertainment-detail-news').find('div').remove()
    $('div.entertainment-detail-news').find('style').remove()
    $('div.entertainment-detail-news').find('h2').remove()
    $('div.entertainment-detail-news').find('a[target=_blank]').remove()
    content = (_.isUndefined(content)) ? $('div.entertainment-detail-news').text() : content
    content = content.replace(/Kapanlagi\.com/g, ' ')
  }
  content = KapanLagi.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
KapanLagi.prototype.cleanContent = function(content) {
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

module.exports = new KapanLagi ()