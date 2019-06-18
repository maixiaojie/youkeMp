var socket = {
    url: 'ws://api.mcust.cn',
    socketOpen: false,
    init() {
        let that = this;
        wx.connectSocket({
            url: that.url
        })
        wx.onSocketOpen(function(res) {
            that.socketOpen = true;
            that.listener();
            this.onerror();
            this.onclose();
        })
    },
    listener() {
        wx.onSocketMessage(res => {
            console.log(res)
        })
    },
    onerror() {
        wx.onSocketError( err => {
            console.log(err)
        })
    },
    onclose() {
        wx.onSocketClose( res => {
            console.log(res)
        })
    },
    close() {
        if(this.socketOpen) {
            wx.closeSocket();
        }
    }
}

export default socket;