/**
 * Created by zhangpeng on 2016/9/18.
 */
export const change = 'change';

export function changeStyle(text) {
  return {type:change,
          text:text
  }
}
