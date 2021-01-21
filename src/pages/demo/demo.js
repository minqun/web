require("../../common/less/common.less");
require("./demo.less");
import $ from "../../common/utils/jquery.js";
const slider = require('./slide')
const nuSlider = new slider({
  name: 'minqun123'
})
nuSlider.set({
  name: '不是你了',
})
nuSlider.set({
  name: '不是你了2',
})
console.log(nuSlider.get())
