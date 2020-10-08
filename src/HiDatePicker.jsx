import React, { Component } from 'react'
import { DatePicker, message } from 'antd'
import { debounce } from 'lodash-es'

// 判断是否是闰年
const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
class HlyDatePicker extends Component {
  constructor(props) {
    super(props)
    // 处理输入时间的防抖函数, 在不输入之后的0.3秒执行 handleFilter
    this.handleInput = debounce(this.handleFilter, 800)
    this.num = 0 // 轮询次数
  }

  handleTextRangr = () => {
    if (typeof this.input.createTextRangr !== 'undefined') {
      let inputRange = this.input.createTextRangr()
      inputRange.moveStart('character', this.input.value.length)
      inputRange.collapse(true)
      inputRange.select()
    } else if (typeof this.input.selectionStart !== 'undefined') {
      this.input.selectionStart = this.input.value.length
      this.input.focus()
    }
  }

  // 处理日期格式函数
  handleFilter = (e) => {
    const value = this.input.value.replaceAll('-', '') // 当前input的值,有-的话先去掉，下面需要统一处理判断
    const len = value.length // 输入的字符长度
    if (!value) return // 如果清空了输入， 就啥都不处理
    // 必须输入为7位或者8位字符才可以继续处理
    if (len < 7) {
      message.error('请按YYYYMMDD输入')
      return
    }
    // 必须输入的是最小7位， 最多8位数字
    if (/(\d{7})/.test(value)) {
      const year = Number(value.slice(0, 4)) // 年
      const month = Number(value.slice(4, 4 + 2)) // 月
      const day = Number(value.slice(6, len === 7 ? 7 : 8)) // 日
      // 每月对应的的天数
      const MONTH2DAY = [
        31,
        isLeapYear(year) ? 29 : 28, // 闰年29天，平年28天
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ]

      // 月份不是1-12报错
      if (!(month > 0 && month < 13)) {
        message.error('月份输入不正确')
        return
      }

      // 不是每月对应的天数报错
      if (!(day > 0 && day < MONTH2DAY[month - 1])) {
        message.error('天数输入不正确')
        return
      }

      const newValue = value.replace(
        /(\d{4})(\d{2})(\d{1,2})/,
        `$1-$2-${len === 7 ? '0' : ''}$3`
      )

      // 格式化输入， 7位的话要补0
      this.input.value = newValue
      // setTimeout(, 300)
      this.handleTextRangr()
    } else message.error('请按YYYYMMDD输入')
  }

  // 日历弹窗出来的事件函数
  handleOpenChange = (open) => {
    let { onOpenChange } = this.props
    onOpenChange && onOpenChange(open)
    if (open) {
      // 弹窗出来之后获取弹窗的输入框dom, 因为先执行这个事件，而dom还没有出现在页面上， 所以等一段时间之后在查dom
      // 轮询找input框dom，直到有为止
      this.getSelectPos()
    } else {
      this.input && this.input.removeEventListener('input', this.handleInput)
    }
  }

  // 轮询获取输入框的dom
  getSelectPos() {
    if (this.num < 20) {
      setTimeout(() => {
        const input = document.querySelector('.ant-calendar-input') // 弹窗input的dom
        const inputWrapper = document.querySelector('.ant-calendar-input-wrap')
        if (!input) {
          this.getSelectPos()
          this.num++
          return
        } // 如果没有获取到就不处理，也不监听输入事件
        inputWrapper.style.border = '1px solid #40a9ff'
        this.num = 0
        this.input = input
        console.dir(this.input, 'this.input')
        this.handleTextRangr()
        input.focus() // 自动获取焦点
        input.addEventListener('input', this.handleInput) // 监听输入事件并处理
      }, 180)
    } else {
      this.num = 0
      return
    }
  }

  render() {
    return (
      <div
        className='hly-component-date-picker'
        style={{ display: 'inline-block', verticalAlign: 'middle' }} //为了表现可以和原DatePicker一样
      >
        <DatePicker
          placeholder='请输入或选择'
          onOpenChange={this.handleOpenChange}
          getCalendarContainer={(trigger) => trigger}
          autoFocus
          ref={(ref) => {
            this.dateRef = ref
            window.ref = ref
          }}
          {...this.props}
        />
      </div>
    )
  }
}

export default HlyDatePicker
