import axios from './index';

export const login = params => {
  return axios.post(`/user/login`, params)
};
export const logout = params => {
  return axios.get(`/user/logout`, {
    params: params
  });
}

export const getInfo = () => {
  return axios.get(`/user/info`).then(res => res.data);
};

export const getOrder = params => {
  return axios.get(`/orders`, {
    params: params
  }).then(res => res.data);
};

export const verify_code_login = params => {
  return axios.post(`/user/verify_code_login`, params).then(res => res);
};

export const send_verify_code = params => {
  return axios.post(`/user/send_verify_code`, params).then(res => res);
};

export const open_credit = () => {
  return axios.get(`/user/open_credit_line`).then(res => res.data);
}

export const set_ali_account = params => {
  return axios.post(`/user/set_ali_account`, params).then(res => res.data)
}

export const set_phone_number = params => {
  return axios.post(`/user/set_phone_number`,params).then(res => res.data)
}

export const send_withdraw = () => {
  return axios.get(`/user/withdraw`)
}
//获取商品列表
export const goods_list = params => {
  return axios.get(`/goods`, {
    params: params
  }).then(res => res);
}

export const goods_detail = params => {
  return axios.get('/goods_detail', {params: params}).then(res => res)
}

export const goods_coupon = params => {
  return axios.get('/goods_coupon_url', {params: params}).then(res => res)
}


export const goods_search = params => {
  return axios.get('/goods_search', {params: params}).then(res => res)
}

export const decode_goods_pw = params => {
  return axios.get('/goods_search_url', {params: params}).then(res => res)
}
