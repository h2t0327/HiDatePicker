import React from 'react'
import { LocaleProvider, DatePicker } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Hly from './HiDatePicker'

moment.locale('zh-cn')

function App() {
  return (
    <LocaleProvider locale={zh_CN}>
      <div className='App' style={{ padding: 60 }}>
        <Hly />
        <div style={{ height: 200 }}></div>
        <DatePicker></DatePicker>
      </div>
    </LocaleProvider>
  )
}

export default App
