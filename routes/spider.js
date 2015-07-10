var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var fs = require('fs');
var util = require("util");
var cardDao = require('../models/Card.js');

var card_img_url = "http://img.lovelivecn.info/details/img/normal/card_?.png";
var card_hono_face_url = 'http://img.lovelivecn.info/index/img/horo_faces/face_?_horo.png';
var card_face_url = 'http://img.lovelivecn.info/index/img/faces/face_?.png';
var card_data_url = "http://db.lovelivecn.info/CardData/index.php?CharNum=0&CardLevel=0&CardColor=0&CardAttr=3&SkillAttr=0&submit=Go";

/**
 * 卡牌数据
 */
router.get('/data', function(req, res, next){
    var content = "";
    var req = http.request(card_data_url, function(res) {
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            content += chunk;
        });
        res.on("end", function () {
            console.log(content);
            $ = cheerio.load(content, {
                normalizeWhitespace: true,
                xmlMode: false,
                decodeEntities: true
            });

            $("#lovelive_card").each(function($idx1, $card){
                obj = {};
                $($('p', $card)).each(function($dx2, $item){
                    var clzname = $($item).attr('class');
                    var val = $($item).text();
                    if(clzname == 'card_name') {
                        obj.lovelive_grade = $('.lovelive_grade', $item).html().replace('[', '').replace(']', '');
                        obj.card_name = $($('span', $item).get(2)).html();
                    } else if(clzname == 'card_normal' ||　clzname == 'card_horo') {
                        uri = $('img', $item).attr('src');
                        obj[clzname] = uri.substr(uri.lastIndexOf('/')+1);
                    } else if(clzname.indexOf('level') == -1) {
                        obj[clzname] = val;
                    }
                });
                console.log(obj);
                cardDao.save(obj, function(err) {
                    if(err!=null) {console.log("error ! : " + err);}
                });

            });

        });
    });
    req.end();
    express.query(req, res, next);
});

/**
 * 抓取卡牌图片
 */
var picsUrl = [card_face_url, card_hono_face_url, card_img_url];
var maxIdx = 508;
var startIdx = 1;
router.get('/image', function(req, res, next){
    getPics(0,startIdx);
    express.query(req, res, next);
});

function getPics(urlIndex, picIndex) {
    var baseURI = picsUrl[urlIndex];
    j = 4- Math.floor(picIndex.toString().length);
    var s ='';
    for(var k=0;k<j;k++)
        s += '0';
    baseURI = baseURI.replace('?', s+picIndex)
    var content = "";
    var req = http.request(baseURI, function(res) {
        res.setEncoding("binary");
        res.on("data", function (chunk) {
            content += chunk;
        });
        res.on("end", function () {
            filename = baseURI.substr(baseURI.lastIndexOf('/')+1);
            console.log(filename);
            fs.writeFile("./public/upload/"+filename, content, "binary", function(e){
                if(e) throw e;
                if(picIndex < maxIdx) {getPics(urlIndex, picIndex+1);}
                else if(urlIndex<picsUrl.length-1) {getPics(urlIndex+1, startIdx);}
            });
        });

    });
    req.end();
}

module.exports = router;