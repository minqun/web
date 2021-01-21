class Slider {
  constructor (props) {
    this.obj = {
      currentIndex: 0,
      moveDis: 0,
      selector: "",
      max: 0,
      delay: 800,
      duration: 300,
      easing: "ease",
      ...props
    }
    this.num = 0
  }
  get () {
    return this.obj
  }
  set (obj) {
    this.add(1)
    this.obj = {
      ...obj
    }
  }
  add (num) {
    this.num+=num
    console.log('先告诉你我要set拉，你要干嘛快点',this.num)
  }
  init (obj) {
    this.set(obj)
    if (!obj.el) {
      console.log('你dom都没给我怎么玩')
      return
    }


  }
}

module.exports = Slider
