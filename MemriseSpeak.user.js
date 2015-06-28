// ==UserScript==
// @name           Memrise Speak
// @namespace      https://github.com/infofarmer
// @description    Makes Memrise speak and listen
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @match          http://www.memrise.com/garden/review/*
// @version        0.0.2
// @updateURL      https://github.com/infofarmer/memrise-speak/raw/master/MemriseSpeak.user.js
// @downloadURL    https://github.com/infofarmer/memrise-speak/raw/master/MemriseSpeak.user.js
// @grant          none
// ==/UserScript==

window.langs = {
    'mandarin-chinese-simplified': 'zh',
    'english': 'en',
    'japanese': 'ja',
    'kanji': 'ja',
}

window.voices = {
    'zh': 'Ting-Ting',
    'en': 'Alex',
    'ja': 'Kyoko',
}

window.sp2 = function (text,lang,v) {
    var t = new SpeechSynthesisUtterance();
    var ss = window.speechSynthesis;
    if (typeof(ss) == 'undefined') return;
    t.text = text;
    t.lang = lang;
    t.rate = 0.8;
    t.volume = 1;
    var vtimer = setInterval(function () {
        var vs = ss.getVoices();
        if (vs.length > 0) {
            clearInterval(vtimer);
            t.voice = vs.filter(function(voice) { return voice.name == v; })[0];
            ss.speak(t);
        }
    }, 100);
}


window.ttsplay = function () {
    console.log('ttsplay');
    var text1, lang1, voice1;
    // text1 = MEMRISE.garden.box.thing.columns[MEMRISE.garden.box.box_dict.column_a].val;
    text1 = MEMRISE.garden.box.thing.columns[1].val;
    if (typeof(MEMRISE.garden.session.course) !== 'undefined') {
        lang0 = MEMRISE.garden.session.course.target.slug;
    } else { 
        lang0 = MEMRISE.garden.session.category.slug;
    }
    lang1 = window.langs[lang0];
    voice1 = window.voices[lang1];
    window.sp2(text1, lang1, voice1);
    console.log("memrise speak spoke «" + text1 + "» in «" + lang1 +"», voice «" + voice1 + "».");
}

MEMRISE.audioPlayer.play = window.ttsplay;

setInterval(function(){
    if ( typeof(MEMRISE.garden.box) !== 'undefined' ) {
        MEMRISE.garden.box.play_random_audio = ttsplay;
        MEMRISE.garden.box.play_hidden_audio = ttsplay;
    }
}, 200);

console.log("memrise speak loaded!");
