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


var Kompas = function () {}

Kompas.prototype.source = 'Kompas'
Kompas.prototype.baseURL = "http://indeks.kompas.com/"

/**
 * Get website's base URL.
 * @param {}
 * @return {string} Website's base URL, can be HTML/RSS/XML.
 */
Kompas.prototype.getBaseURL = function() {
  return Kompas.prototype.baseURL
}

/**
 * Scrap all news from all URL in website's main page.
 * @param {}
 * @return {Array} Array of scrap result. Consist of url, title, date, img, and content.
 */
Kompas.prototype.scrap = function() {
  return Promise.resolve()
    .then(Kompas.prototype.getBaseURL)
    .then(request)
    .then(Kompas.prototype.getURLsFromMainPage)
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
            .then(Kompas.prototype.getDataFromSinglePage)
            .catch(function (e) {
              console.error('['+Kompas.prototype.source+'] ['+e.name+' - '+e.message.replace(/(\n|\r)/g,'').slice(0,32)+' ...] '+url)
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
Kompas.prototype.getURLs = function() {
  return Promise.resolve()
    .then(Kompas.prototype.getBaseURL)
    .then(request)
    .then(Kompas.prototype.getURLsFromMainPage)
}

/**
 * Get all single page URLs from scraped main page.
 * @param {string} scrap - String scraped from main page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Kompas.prototype.getURLsFromMainPage = function(scrap) {
  var $ = cheerio.load(scrap)             
  var urls = $('div.kcm-main-list ul li')
    .map(function (index, item) {
      return $(item).find('div h3 a').attr('href')
    })
    .get()
  return urls
}

/**
 * Get all data from scraped single page.
 * @param {string} scrap - String scraped from single page.
 * @return {Array} Array of URLs scraped from Website's main page.
 */
Kompas.prototype.getDataFromSinglePage = function(scrap) {
  var $ = cheerio.load(scrap)
  var url = Kompas.prototype.getURL($)
  var title = Kompas.prototype.getTitle($)
  var date = Kompas.prototype.getDate($)
  var img = Kompas.prototype.getImg($)
  var content = Kompas.prototype.getContent($)
  var result = {
    'url': url,
    'title': title,
    'date': date,
    'img': img,
    'content': content,
    'source': Kompas.prototype.source
  }
  return result
}

/**
 * Get URL from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} URL
 */
Kompas.prototype.getURL = function($) {
  return $('meta[property="og:url"]').attr('content')
}

/**
 * Get title from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} title
 */
Kompas.prototype.getTitle = function($) {
  var title = undefined
  title = (_.isEmpty(title)) ? $('div.kcm-read div.kcm-read-top h2').text() : title
  title = (_.isEmpty(title)) ? $('div.kcm-read-content-top h2').text() : title
  title = (_.isEmpty(title)) ? $('div.baca-content h1').text() : title
  title = title.replace(/(\r|\n|\t)*/g, '')
  return title
}

/**
 * Get date from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} date
 */
Kompas.prototype.getDate = function($) {
  var date = undefined
  date = (_.isEmpty(date)) ? $('div.kcm-read div.msmall.grey.mb2').text() : date
  date = (_.isEmpty(date)) ? $('div.kcm-date.msmall.grey').text() : date

  date = date.replace(/Januari/g, 'Januari')
  date = date.replace(/February/g, 'February')
  date = date.replace(/Maret/g, 'March')
  date = date.replace(/Mei/g, 'May')
  date = date.replace(/Juni/g, 'June')
  date = date.replace(/Juli/g, 'July')
  date = date.replace(/Agustus/g, 'Mei')
  date = date.replace(/Oktober/g, 'October')
  date = date.replace(/Desember/g, 'December')

  var d = moment(date, 'D MMMM YYYY | HH:mm')
  return d.utc().valueOf()
}

/**
 * Get image source from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} image source
 */
Kompas.prototype.getImg = function($) {
  return $('meta[property="og:image"]').attr('content')
}

/**
 * Get news' content from Cheerio load object.
 * @param {object} $ - Cheerio load object
 * @return {string} news' content
 */
Kompas.prototype.getContent = function($) {
  var content = $('div.kcm-read-text').first().contents()
    .filter(function() { return this.type === 'text' })
    .filter(function() { return this.type !== 'tag' })
    .map(function(idx, item) { return item.data })
    .get().join(' ')
  content = Kompas.prototype.cleanContent(content)
  if (content==='')
    content = $('div.kcm-read-text').text()
  content = Kompas.prototype.cleanContent(content)
  if (content==='') {
    if ($('div span.kcmread1114').html() !== null) {
      $('div span.kcmread1114').find('strong').remove()
      $('div span.kcmread1114').html($('div span.kcmread1114').html().replace(/\<br\>/g, '\n'))
      content = $('div span.kcmread1114').text()
    }
  }
  if (content==='') {
    if ($('div.content-text div.div-read').html() !== null) {
      $('div.content-text div.div-read').find('strong').remove()
      $('div.content-text div.div-read').html($('div.content-text div.div-read').html().replace(/\<br\>/g, '\n'))
      content = $('div.content-text div.div-read').text()
    }
  }
  content = Kompas.prototype.cleanContent(content)
  return content
}

/**
 * Get cleaned content.
 * @param {string} news' content
 * @return {string} news' clean content
 */
Kompas.prototype.cleanContent = function(content) {
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

module.exports = new Kompas ()