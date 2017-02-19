/**
 * Created by MingYin Lv on 2017/2/19 下午3:19.
 */


export const success = (data, msg = '请求成功') => {
  return {
    error_code: 0,
    msg,
    data,
  };
};

export const failed = (msg = '请求失败') => {
  return {
    error_code: 1,
    msg,
  };
};

export const validateFaile = (msg = '验证失败') => {
  return {
    error_code: 2,
    msg,
  };
};
