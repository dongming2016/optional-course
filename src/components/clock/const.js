import moment from 'moment'

export const CENTERT_TEXTS = ['第一节课', '第二节课', '第三节课', '第四节课', '第五节课', '第六节课',
  '第七节课', '第八节课', '第九节课', '第十节课', '第十一节课', '第十二节课']
export const localeWeekDay = (weekday, firstDay) => {
  firstDay = parseInt(firstDay)
  const localMoment = moment().locale('zh-cn')
  return localMoment.localeData().weekdays()[(weekday + firstDay) % 7]
}
