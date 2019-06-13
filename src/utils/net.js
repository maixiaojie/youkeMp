// import wx from 'wx';

const net = {
    get(url, data) {
        wx.showLoading({
            title: '加载中'
        })
        return new Promise((resove, reject) => {
            wx.request({
                url, 
                data,
                method: 'GET',
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    wx.hideLoading();
                    if(res.statusCode != 200) {
                        wx.showToast({
                            title: '网络出错，稍后再试',
                            icon: 'none'
                        });
                        return false;
                    }
                    resove(res.data);
                },
                fail: function(error) {
                    wx.hideLoading();
                    reject(error);
                },
                complete: function() {
                    wx.hideLoading();
                }
            })
        })
    },
    post(url, data) {
        wx.showLoading({
            title: '加载中'
        })
        return new Promise((resove, reject) => {
            wx.request({
                url, 
                data,
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    wx.hideLoading();
                    if(res.statusCode != 200) {
                        wx.showToast({
                            title: '网络出错，稍后再试',
                            icon: 'none'
                        });
                        return false;
                    }
                    resove(res.data);
                },
                fail: function(error) {
                    wx.hideLoading();
                    reject(error);
                },
                complete: function() {
                    wx.hideLoading();
                }
            })
        })
    }
}

export default net;