require("../../common/less/common.less");
require("./index.less");
import $ from "../../common/utils/jquery.js";
const scrollTo = require("../../common/utils/jquery.scroll.js");
const loopSlide = require("../../common/utils/loop.slider");
scrollTo($);
window.addEventListener("scroll", function (e) {
  const ratio = $(document).width() / 1920;
  if (
    e.target.scrollingElement.scrollTop >
      $("#nav_3").offset().top - ratio * 320 &&
    !$("#nav_3 .item-card").hasClass(".fadeInUp")
  ) {
    $("#nav_3 .item-card").addClass("animated").addClass("fadeInUp");
  }
  if (e.target.scrollingElement.scrollTop > $("#nav_2").offset().top) {
    $("#fixedTools").show();
  } else {
    $("#fixedTools").hide();
  }
});
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
  if (!$("#nav_1 .info-banner .cell").hasClass(".fadeInLeft")) {
    $("#nav_1 .info-banner")
      .eq(0)
      .find(".cell")
      .addClass("animated")
      .addClass("fadeInLeft");
    $("#nav_1 .info-banner")
      .eq(0)
      .find(".desc")
      .addClass("animated-sec")
      .addClass("fadeInLeft");
  }
  $(".nav li").on("click", function (e) {
    const id = $(e.target).attr("class");
    $.scrollTo(`#${id}`, 500);
    $(e.target)
      .parent()
      .addClass("active")
      .siblings("li")
      .removeClass("active");
  });
  $("#fixedTools").click(function () {
    $.scrollTo("#nav_1", 500);
  });
});
