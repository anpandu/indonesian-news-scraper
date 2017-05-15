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
            .then(function () {
              var options = {
                uri: url,
                headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36' },
                json: true
              }
              return options
            })
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
  var url = undefined
  url = (_.isUndefined(url)) ? $('meta[property="og:url"]').attr('content') : url
  url = url.replace(/\?.+/, '')
  return url
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
KapanLagi.prototype.getTitle = function($) {
  var title = undefined
  title = (_.isEmpty(title)) ? $('div#newsdetail-right-new h1').text() : title
  title = (_.isEmpty(title)) ? $('meta[name="twitter:title"]').attr('content') : title
  title = title.replace(/(\r|\n|\t)*/g, '')
  title = title.trim()
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
KapanLagi.prototype.getDate = function($) {
  var date = undefined
  date = (_.isEmpty(date)) ? $('div#newsdetail-right-new span').html() : date
  date = (!_.isEmpty(date)) ? date : $('div#v7-music-newsdetail-right span')
    .map(function (i, e) {return $(this).text()})
    .get()
    .map(function (e) {return moment(e, 'DD MMMM YYYY HH:mm')})
    .filter(function (e) {return e.isValid()})[0]
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.utc().valueOf()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
KapanLagi.prototype.getImg = function($) {
  var image = undefined
  image = (_.isEmpty(image)) ? $('div#newsdetail-right-new div.entertainment-newsdetail-headlineimg img').attr('src') : image
  image = (_.isEmpty(image)) ? $('div#v7-music-newsdetail-image-headline img').attr('src') : image
  image = (_.isEmpty(image)) ? $('meta[name="twitter:image"]').attr('content') : image
  return image
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
KapanLagi.prototype.getContent = function($) {
  var content = undefined
  if (!_.isNull($('div.entertainment-detail-news').html())) {
    $('div.entertainment-detail-news').html($('div.entertainment-detail-news').html().replace('<br>', '\n'))
    $('div.entertainment-detail-news').html($('div.entertainment-detail-news').html().replace(/(\<[^<>]*\>)/g, ' $1'))
    $('div.entertainment-detail-news').find('div').remove()
    $('div.entertainment-detail-news').find('style').remove()
    $('div.entertainment-detail-news').find('h2').remove()
    $('div.entertainment-detail-news').find('a[target=_blank]').remove()
    content = (_.isUndefined(content)) ? $('div.entertainment-detail-news').text() : content
  } else
  if (!_.isNull($('div.v7-music-detail-news').html())) {
    $('div.v7-music-detail-news').html($('div.v7-music-detail-news').html().replace('<br>', '\n'))
    $('div.v7-music-detail-news').html($('div.v7-music-detail-news').html().replace(/(\<[^<>]*\>)/g, ' $1'))
    $('div.v7-music-detail-news').find('div').remove()
    $('div.v7-music-detail-news').find('style').remove()
    $('div.v7-music-detail-news').find('h2').remove()
    $('div.v7-music-detail-news').find('a[target=_blank]').remove()
    content = (_.isUndefined(content)) ? $('div.v7-music-detail-news').text() : content
  }
  content = content.replace(/Kapanlagi\.com/g, ' ')
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
  content = content.replace(/(\t)+/g, ' ')
  content = content.replace(/(\ ?\n ?|\ ?\r ?)+/g, '\n')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—|--)+/g, '-')
  content = content.replace(/”|“/g, '"')
  content = content.replace(/( ?\n ?| ?\r ?)+/g, '\n')
  content = content.trim()
  while (content.length > 0 && content[0].match(/( |-|,)/))
    content = content.substring(1)
  while (content.length > 0 && content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  content = content.replace(/(\ ?\n ?|\ ?\r ?)+/g, '\n')
  content = content.trim()
  return content
}

module.exports = new KapanLagi ()