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
            .then(function () {
              var options = {
                uri: url,
                headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36' },
                json: true
              }
              return options
            })
            .then(request)
            .then(Tempo.prototype.getDataFromSinglePage)
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
Tempo.prototype.getTitle = function($) {
  var title = undefined
  title = (_.isEmpty(title)) ? $('div.artikel h1').text() : title
  title = (_.isEmpty(title)) ? $('h1.judul-artikel').text() : title
  title = (_.isEmpty(title)) ? $('div.news-detail h2 a').text() : title
  title = (_.isEmpty(title)) ? $('meta[property="og:title"]').attr('content') : title
  title = title.replace(/(\r|\n|\t)*/g, '')
  title = title.trim()
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Tempo.prototype.getDate = function($) {
  var date = undefined
  date = (_.isEmpty(date)) ? $('div.artikel div.block-tanggal').text() : date
  date = (_.isEmpty(date)) ? $('h5.tanggal').text() : date
  date = (_.isEmpty(date)) ? $('span.date-news-detail').text() : date

  date = date.replace(/Januari/g, 'Januari')
  date = date.replace(/Februari/g, 'February')
  date = date.replace(/Maret/g, 'March')
  date = date.replace(/Mei/g, 'May')
  date = date.replace(/Juni/g, 'June')
  date = date.replace(/Juli/g, 'July')
  date = date.replace(/Agustus/g, 'Mei')
  date = date.replace(/Oktober/g, 'October')
  date = date.replace(/Desember/g, 'December')
  
  var d = moment(date, 'DD MMMM YYYY HH:mm')
  return d.utc().valueOf()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Tempo.prototype.getImg = function($) {
  var img = undefined
  img = (_.isEmpty(img)) ? $('link[rel="image_src"]').attr('href') : img
  img = (_.isEmpty(img)) ? $('meta[name="twitter:image:src"]').attr('content') : img
  img = (_.isEmpty(img)) ? $('div.artikel div.single-img img').attr('src') : img
  return img
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Tempo.prototype.getContent = function($) {
  var arr = [
    'div.artikel p',
    'div.p-artikel p',
    'div.news-detail article pp'
  ]
  arr.forEach(function (e) {
    var innerHTML = $(e).html()
    if (!_.isEmpty(innerHTML))
      $(e).html(innerHTML.replace('<br>', '\n'))
  })
  var content = undefined
  $('div.news-detail article p').find('a').remove()
  content = (_.isEmpty(content)) ? $('div.artikel p').text() : content
  content = (_.isEmpty(content)) ? $('div.p-artikel p').text() : content
  content = (_.isEmpty(content)) ? $('div.news-detail article p').text() : content
  content = Tempo.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Tempo.prototype.cleanContent = function(content) {
  content = (_.isEmpty(content)) ? '' : content
  content = content.replace(/(\t)+/g, ' ')
  content = content.replace(/(\ ?\n ?|\ ?\r ?)+/g, '\n')
  content = content.replace(/(\ |\ |\ |\ )+/g, ' ')
  content = content.replace(/(–|—|--)+/g, '-')
  content = content.replace(/”|“/g, '"')
  while (content.length > 0 && content[0].match(/( |-|,)/))
    content = content.substring(1)
  while (content.length > 0 && content[content.length-1]===' ')
    content = content.substring(0, content.length-1)
  content = content.replace(/(\ ?\n ?|\ ?\r ?)+/g, '\n')
  content = content.trim()
  return content
}

module.exports = new Tempo ()