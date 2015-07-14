var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var fs = require('fs');
var util = require("util");
var cardDao = require('../models/Card.js');
var ncr = require('./ncr');

var card_img_url = "http://img.lovelivecn.info/details/img/normal/card_?.png";
var card_more_url = "http://web.ruliweb.daum.net/etcs/lovelive/lovelive_card.htm";//直接获取并解析有问题，只有后几个能解析出来
var card_hono_face_url = 'http://img.lovelivecn.info/index/img/horo_faces/face_?_horo.png';
var card_face_url = 'http://img.lovelivecn.info/index/img/faces/face_?.png';
var card_data_url = "http://db.lovelivecn.info/CardData/index.php?CharNum=0&CardLevel=0&CardColor=0&CardAttr=3&SkillAttr=0&submit=Go";

/**
 * 卡牌数据
 */
function data(){
    var content = "";
    var req = http.request(card_data_url, function(res) {
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            content += chunk;
        });
        res.on("end", function () {
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
                        obj.lovelive_grade = $('.lovelive_grade', $item).html().replace('[', '').replace(']', '').ncr2c().trim();
                        obj.card_name = $($('span', $item).get(2)).html().ncr2c().trim();
                        obj.card_fullid = $('.lovelive_normal', $item).html().ncr2c().trim();
                        obj.card_id = obj.card_fullid.replace('No. ', '').trim();
                    } else if(clzname == 'card_normal' ||　clzname == 'card_horo') {
                        uri = $('img', $item).attr('src');
                        obj[clzname] = uri.substr(uri.lastIndexOf('/')+1).trim();
                    } else if(clzname.indexOf('level') == -1) {
                        val = val.ncr2c().trim();
                        if(/\d+/.test(val)) {
                            obj[clzname] = parseInt(val);
                        } else {
                            obj[clzname] = val;
                        }
                    }
                });
                if(obj.smile_01 > obj.pure_01) {
                    if(obj.smile_01 > obj.cool_01) {
                        obj.card_type = 'smile';
                    } else {
                        obj.card_type = 'cool';
                    }
                } else {
                    if(obj.pure_01 > obj.cool_01) {
                        obj.card_type = 'pure';
                    } else {
                        obj.card_type = 'cool';
                    }
                }
                cardDao.save(obj, function(err) {
                    if(err!=null) {console.log("error ! : " + err);}
                });

            });

        });
    });
    req.end();
};

/**
 * 从韩网扒，更新人物名称
 */
function more(){
    content = fs.readFileSync('./public/data/content.html');
    console.log(content);
    $ = cheerio.load(content, {
        normalizeWhitespace: true,
        xmlMode: false,
        decodeEntities: true
    });
    $(".card_name").each(function($i, $item) {
        var cardno = $('.lovelive_normal', $item).html().trim();
        var fullname, name;
        fullname = name = $('span', $('a', $item)).html().ncr2c().trim();
        try {
            name = fullname.replace(/^([\s\S]*)\(([\s\S]*)\)$/ig, function($0, $1, $2){return $2;}).trim();
        } catch (e ){console.log("error happend: " + e);}
       cardDao.upd({'card_fullid':cardno}, {'char':name}, {},function(doc){});
    });
};

/**
 * 抓取卡牌图片
 */
function image(){
    var picsUrl = [card_face_url, card_hono_face_url, card_img_url];
    var maxIdx = 508;
    var startIdx = 1;
    function getPics(urlIndex, picIndex) {
        var baseURI = picsUrl[urlIndex];
        var s = get4LengthNum(picIndex)
        baseURI = baseURI.replace('?', s)
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
    getPics(0,startIdx);
};


//cao.居然没有觉醒的卡牌还得从韩网down
function ch(){
    function getCardHoro(i) {
        var maxIdx = 518;
        var url = 'http://img.ruliweb.com/family/lovelive/card/card_?_horo.png';
        var s = get4LengthNum(i);
        url = url.replace('?', s);
        console.log(url);
        var req = http.request(url, function(res){
            var content = "";
            res.setEncoding("binary");
            res.on('data', function(chunk){
                content += chunk;
            });
            res.on('end', function() {
                fs.writeFile('./public/upload/card_'+s+'_horo.png', content, "binary", function(e){
                    if(e) throw e;
                    if(i<maxIdx){getCardHoro(i+1);}
                })
            });
        });
        req.end();
    }
    getCardHoro(1);
};

function get4LengthNum(i){
    j = 4- Math.floor(i.toString().length);
    var s ='';
    for(var k=0;k<j;k++)
        s += '0';
    return s+i;
};

(function(){
    //data();
    more();
    //more();
    //image();
    //ch();
}());
