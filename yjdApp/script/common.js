/**
共用功能类
调用方法
var Comm = Common();
Comm.Func();
**/
function Common() {
    var common = {};
    //ajax封装
    common.ajax = function(_url, paramData, Type, callBack) {
            api.ajax({
                url: _url,
                method: Type,
                dataType: "json",
                data: paramData
            }, function(ret, err) {
                if (ret) {
                    // api.alert({
                    //     msg: JSON.stringify(ret)
                    // });
                    callBack(ret);
                } else {
                    // api.alert({
                    //     msg: JSON.stringify(err)
                    // });
                }
            });
        }
        //设置首页轮播图
    common.setLunbo = function(imgPath) {
            //fixedOn需要写当前页面的名称
            var UIScrollPicture = api.require('UIScrollPicture');
            UIScrollPicture.open({
                rect: {
                    x: 0,
                    y: 0,
                    w: api.winWidth,
                    h: 157,
                },
                data: {
                    paths: imgPath
                },
                styles: {
                    indicator: {
                        align: 'center',
                        color: '#9B9B9B',
                        activeColor: '#000000'
                    }
                },
                placeholderImg: 'widget://res/slide1.jpg',
                contentMode: 'scaleToFill',
                interval: 3,
                fixedOn: 'home_frame',
                loop: true,
                fixed: false
            }, function(ret, err) {
                if (ret) {
                    //		        alert(JSON.stringify(ret));
                } else {
                    //		        alert(JSON.stringify(err));
                }
            });
        }
        //获取手机验证码
    common.getCode = function(getCodeUrl) {
            var getCodeStr = $api.byId('getCode').innerHTML;
            //截取最后一个字符判断后缀是否是“秒”
            getCodeStr = getCodeStr.substr(getCodeStr.length - 1, 1);
            if (getCodeStr == "秒") {
                alert("不能重复获取验证码", "提示消息");
                return false;
            }

            var phoneNum = $api.val($api.byId('phoneNumber'));
            if (phoneNum == "" || phoneNum == null || phoneNum == undefined) {
                api.alert({
                    title: '提示消息',
                    msg: "请输入手机号"
                });
                return false;
            } else if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
                api.alert({
                    title: '提示消息',
                    msg: "手机格式错误"
                });
                return false;
            }
            var getCodeUrl2 = getCodeUrl + "?phone=" + phoneNum;
            //表示60秒倒计时，想要变长就把60修改更大
            var total_micro_second = 60 * 1000;
            //验证码倒计时
            common.count_down(total_micro_second);
            common.ajax(getCodeUrl2, "", "get", function(res) {
                //alert(JSON.stringify(res));
                if (res.state == "1") {
                    api.toast({
                        msg: '验证码发送成功！',
                        duration: 2000,
                        location: 'middle'
                    });
                } else {
                    api.alert({
                        title: '提示消息',
                        msg: res.message,
                    });
                }
            });
        }
        /* 毫秒级倒计时 */
    common.count_down = function(total_micro_second) {
            if (total_micro_second <= 0) {
                $api.byId('getCode').innerHTML = "重新发送";
                // timeout则跳出递归
                return;
            }
            // 渲染倒计时时钟
            $api.byId('getCode').innerHTML = common.date_format(total_micro_second) + " 秒";

            setTimeout(function() {
                // 放在最后--
                total_micro_second -= 10;
                common.count_down(total_micro_second);
            }, 10);
        }
        // 时间格式化输出，如03:25:19 86。每10ms都会调用一次
    common.date_format = function(micro_second) {
            // 秒数
            var second = Math.floor(micro_second / 1000);
            // 小时位
            var hr = Math.floor(second / 3600);
            // 分钟位
            var min = common.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
            // 秒位
            var sec = common.fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
            // 毫秒位，保留2位
            var micro_sec = common.fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

            return sec;
        }
        // 位数不足补零
    common.fill_zero_prefix = function(num) {
            return num < 10 ? "0" + num : num
        }
        //微信分享
    common.wxShare = function(tar, title, text, url, img) {
            filename = (new Date()).valueOf() + '.' + common.ext(img);
            api.download({
                url: img,
                savePath: 'fs://' + filename,
                report: false,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                var wx = api.require('wx');
                wx.isInstalled(function(ret) {
                    if (ret.installed) {
                        api.toast({
                            msg: '分享中，请稍候',
                            duration: 2000,
                            location: "middle"
                        });
                    } else {
                        api.toast({
                            msg: '没有安装微信，无法进行分享',
                            duration: 2000,
                            location: "middle"
                        });
                    }
                });
                wx.shareWebpage({
                    scene: tar,
                    title: title,
                    description: text,
                    thumb: 'fs://' + filename,
                    contentUrl: url
                }, function(ret, err) {
                    if (ret.status) {
                        api.toast({
                            msg: '分享成功',
                            duration: 2000,
                            location: "middle"
                        });
                    }
                });
            });
        }
        //微信分享图片
    common.wxShareImg = function(tar, img) {
            filename = (new Date()).valueOf() + '.' + common.ext(img);
            api.download({
                url: img,
                savePath: 'fs://' + filename,
                report: false,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                var wx = api.require('wx');
                wx.isInstalled(function(ret) {
                    if (ret.installed) {
                        api.toast({
                            msg: '分享中，请稍候',
                            duration: 2000,
                            location: "middle"
                        });
                    } else {
                        api.toast({
                            msg: '没有安装微信，无法进行分享',
                            duration: 2000,
                            location: "middle"
                        });
                    }
                });
                wx.shareImage({
                    apiKey: '',
                    scene: tar,
                    thumb: 'fs://' + filename,
                    contentUrl: 'fs://' + filename
                }, function(ret, err) {
                    if (ret.status) {
                        alert('分享成功');
                    } else {
                        alert(err.code);
                    }
                });
            });
        }
        //图片格式处理
    common.ext = function(fileName) {
            return fileName.substring(fileName.lastIndexOf('.') + 1);
        }
        //分享链接到QQ
    common.qqShare = function(tar, title, text, url, img) {
        var qq = api.require('QQPlus');
        qq.installed(function(ret) {
            if (ret.status) {
                api.toast({
                    msg: '分享中，请稍候',
                    duration: 2000,
                    location: "middle"
                });
            } else {
                api.toast({
                    msg: '没有安装QQ，无法进行分享',
                    duration: 2000,
                    location: "middle"
                });
            }
        });

        qq.shareNews({
            url: url,
            title: title,
            description: text,
            imgUrl: img,
            type: tar
        }, function(ret, err) {
            if (ret.status) {
                api.toast({
                    msg: '分享成功',
                    duration: 2000,
                    location: "botoom"
                });
            }
        });
    }

    //分享图片到QQ
    common.qqShareImg = function(tar, img) {
            filename = (new Date()).valueOf() + '.' + common.ext(img);
            api.download({
                url: img,
                savePath: 'fs://' + filename,
                report: false,
                cache: true,
                allowResume: true
            }, function(ret, err) {
                var qq = api.require('QQPlus');
                qq.installed(function(ret) {
                    if (ret.status) {
                        api.toast({
                            msg: '分享中，请稍候',
                            duration: 2000,
                            location: "middle"
                        });
                    } else {
                        api.toast({
                            msg: '没有安装QQ，无法进行分享',
                            duration: 2000,
                            location: "middle"
                        });
                    }
                });
                qq.shareImage({
                    type: tar,
                    imgPath: 'fs://' + filename
                }, function(ret, err) {
                    if (ret.status) {
                        alert("分享成功！");
                    }
                });
            });
        }
        //图片浏览，可传一张或多张图片
    common.openImageBrowser = function(imageUrls) {
        var imageBrowser = api.require('imageBrowser');
        imageBrowser.openImages({
            showList: false,
            imageUrls: [
                imageUrls
            ]
        });
    }
    common.cc = function(tt) {
        alert(tt);
    }
    return common;
}
