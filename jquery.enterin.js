/*
* EnterIN jQuery Plugin v2.0
* 
* Copyright 2013 Gianfilippo Balestriero
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* 
*/

(function ($) {

    $.fn.enterin = function(options) {

        var $defaults = {

            controllers:    false,
            maxScale:       20,
            effectTime:     3.0,
            ease:           'linear',
            endCallback:    function(){}

        };

        var settings = $.extend( {}, $defaults, options );

        var enterin = {

            init: function(element){

                enterin.isInit  = true;

                enterin.ctrl    = false

                enterin.wrapper = jQuery(element);

                if(settings.controllers != false) {

                    enterin.ctrl    = jQuery(settings.controllers);
                }
                else {
                    enterin.ctrl    = false;
                }

                enterin.reorderSlide();

                enterin.setWrapperStyle();

                enterin.setSlidesStyle();

                enterin.bindControllers();

                enterin.bindAnimation();

            },

            reorderSlide: function() {
               
                var markupHtml = enterin.wrapper.clone();

                var max = markupHtml.find(".enterin-slide").length-1;
                
                enterin.wrapper.text("");

                var html;

                for(var i = 0; i<max+1; i++) {
                    html = markupHtml.find(".enterin-slide").eq(max-i);
                    enterin.wrapper.append(html);
                }


                enterin.calcStyle();

            },

            setWrapperStyle: function(){
                enterin.wrapper.css("position",     "relative");
                enterin.wrapper.css("overflow",     "hidden");
            },

            setSlidesStyle: function(){

                var time            = settings.effectTime+"s";

                var ease            = settings.ease;

                var countSlides     = enterin.wrapper.find(".enterin-slide").length;

                var d               = (settings.effectTime/countSlides);

                enterin.changeSlide(1);

                setTimeout(function(){
                    enterin.wrapper.find(".enterin-slide").css("position",      "absolute");
                    enterin.wrapper.find(".enterin-slide").css("top",           "0px");
                    enterin.wrapper.find(".enterin-slide").css("left",          "0px");
                    for(var i = 0; i<=countSlides; i++) {
                        enterin.wrapper.find(".enterin-slide").eq(countSlides-i).css("transition", "all "+(d*i)+"s "+settings.ease);
                    }
                },10);


            },

            bindControllers: function(){

                enterin.isInit = false;

                var jqueryElement;

                if(enterin.ctrl != false) {
                    jqueryElement = enterin.ctrl.find("[data-enterin]");
                }
                else {
                    jqueryElement = jQuery("[data-enterin]");
                }

                jqueryElement.click(function(){

                    var $this   = jQuery(this);
                    var $to     = $this.data("enterin");

                    enterin.changeSlide($to);

                });     

            },

            bindAnimation: function(){

                var countSlides     = enterin.wrapper.find(".enterin-slide").length;

                jQuery(".enterin-slide").unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');

                jQuery(".enterin-slide").eq(enterin.to-1).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                    if(enterin.isInit) {
                        enterin.isInit = false;
                        return;
                    }
                    else {
                        settings.endCallback(enterin.to);
                    }
                });

            },

            changeSlide: function(to, scaleOverride) {
            
                if(typeof scaleOverride == "undefined") {
                    scaleOverride = false;
                }

                for(var i = 1; i<=enterin.vars.count; i++) {

                    var revert = (enterin.vars.count-i)+1;

                    if(i<to) {
                        scale       = ((enterin.vars.count-i)+1);
                        opacity     = 0.2/((enterin.vars.count-i)+1);
                    }
                    else if(i>to) {
                        scale   = enterin.vars.scales[i-1];
                        opacity = enterin.vars.scales[i-1];
                    }
                    else {
                        scale = 1;
                        if(scaleOverride) {
                            scale = scaleOverride;
                        }
                        opacity = 1;
                    }

                    enterin.wrapper.find(".enterin-slide").eq(revert-1).css("transform", "scale("+scale+")");
                    enterin.wrapper.find(".enterin-slide").eq(revert-1).css("opacity", opacity);


                }

                enterin.to = to;

                enterin.bindAnimation();

            },

            calcStyle: function(){

                var countSlides     = enterin.wrapper.find(".enterin-slide").length;

                var cSlide          = (settings.maxScale/countSlides);

                var division        = (1/settings.maxScale);

                var scales              = [];

                for(var i = 1; i<=countSlides; i++) {

                    var f = (division*cSlide)*((countSlides+1)-i);

                    var scale   = f;

                    scales.push(scale);

                }               

                enterin.vars = {
                    count: countSlides,
                    scales: scales
                };
            },

        };

        $.fn.enterin.goToSlide = function(slideIndex, scaleOverride){

            setTimeout(function(){
                enterin.changeSlide(slideIndex, scaleOverride);
            },30);
            
        };        

        return this.each(function() {
            enterin.init(this);
        });

    };

}(jQuery));