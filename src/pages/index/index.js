require("../../common/less/common.less");
require("./index.less");
require("./index.html");
import $ from "../../common/utils/jquery.js";
const scrollTo = require("../../common/utils/jquery.scroll.js");
const loopSlide = require("../../common/utils/loop.slider");
scrollTo($);

loopSlide.init({
  el: ".content", //选择器
  navigator: {
    //前进后退按钮
    prevEl: ".prev",
    nextEl: ".next",
  },
  easing: "ease", //动画效果cubic-bezier(0.985, -0.060, 0.000, 1.320)
  duration: 300,
  autoplay: 3000, //boolean 和 number 设置为true 默认延时为3s,如果设置为1000，延时为1s
});

$(function () {
  $(".nav_1").click(function () {
    $.scrollTo("#pro", 500);
  });
  $(".nav_2").click(function () {
    $.scrollTo("#news", 800);
  });
  $(".nav_3").click(function () {
    $.scrollTo("#ser", 1000);
  });
  $(".nav_c4").click(function () {
    $.scrollTo("#con", 1200);
  });
  $(".nav_5").click(function () {
    $.scrollTo("#job", 1500);
  });
});
