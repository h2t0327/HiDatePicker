import React from 'react'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Hly from './Hly'

moment.locale('zh-cn')

function App() {
  return (
    <LocaleProvider locale={zh_CN}>
      <div className='App' style={{ padding: 60 }}>
        <Hly />
      </div>
    </LocaleProvider>
  )
}

export default App
