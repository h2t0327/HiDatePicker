import { DatePicker } from 'antd'
import { debounce } from 'lodash-es'

class HlyDatePicker extends DatePicker {
  constructor(props) {
    super(props)
    // input.setAttributes.placeholder = '请输入或选择'
    handleFilter = debounce(handleFilter, 300)
    getSelectPos = debounce(getSelectPos, 300)
    addEvent = debounce(addEvent, 300)

    this.handleOpenChange = (open) => {
      let onOpenChange = this.props.onOpenChange
      if (onOpenChange) {
        onOpenChange(open)
      }

      if (open) {
        getSelectPos('.ant-calendar-input')
        addEvent()
      }
    }

    function addEvent() {
      document
        .querySelector('.ant-calendar-input')
        .addEventListener('keyup', () => {
          handleFilter()
        })
    }

    function handleFilter() {
      document.querySelector('.ant-calendar-input').value = document
        .querySelector('.ant-calendar-input')
        .value.replaceAll('-', '')
        .replace(/(\d{4})/, '$&-')
        .replace(/-(\d{2})/, '$&-')
    }

    function getSelectPos(ele) {
      console.log(ele, '11111')
      let input = document.querySelector(ele)
      input.placeholder = '请输入或选择'
      // if (input === null) {
      //   input = event.srcElement
      // }
      if (typeof input.createTextRangr !== 'undefined') {
        let inputRange = input.createTextRangr()
        inputRange.moveStart('character', input.value.length)
        inputRange.collapse(true)
        inputRange.select()
      } else if (typeof input.selectionStart !== 'undefined') {
        input.selectionStart = input.value.length
        input.focus()
      }
    }
  }

  componentDidMount() {
    this.picker.input.placeholder = '请输入或选择'
    window.dateP = this
  }

  // render() {
  //   return this.renderPicker()
  // }
}

export default HlyDatePicker
