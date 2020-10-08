import React, { Component } from 'react'
import { DatePicker } from 'antd'

class Hly extends Component {
  render() {
    return (
      <div className='hly-component-date-picker'>
        <DatePicker
          placeholder='请输入或选择'
          getCalendarContainer={(trigger) => trigger}
        />
      </div>
    )
  }
}

export default Hly
