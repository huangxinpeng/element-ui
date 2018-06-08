
import { post ,get} from './const'

//首页--获取活动、订单和收入
export function GetActivityOrderInfo(params){
  return post('city/htmGetActivityOrderInfo.htm', params)
}

//获取活动类型
export function GetActivityType(params){
  return post('city/htmGetActivityTypeList.htm', params)
}

//获取活动列表
export function GetActivityList(params){
  return post('activity/htmGetActivityList.htm',params)
}