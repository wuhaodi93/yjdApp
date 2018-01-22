/**
 配置文件
 共用功能类
 调用方法
 var Config = Config();
 Config.Func();
 */
var host = "https://www.gxht.net.cn/app_yjdPlatform/";

function Config() {
    var config = {
        "getLunboUrl": host + "findLunbo.do", //首页--获取轮播图数据
        "getJiuUrl": host + "findHengpai.do", //首页--获取九宫格数据
        "getHomeListUrl": host + "findHotLoans.do", //首页--获取列表数据
        "getListUrl": host + "findMerchants.do", //首页-获取入驻列表
        "getSearchtUrl": host + "findMerchant.do", //首页-获取入驻列表查询

        "getLocationUrl": host + "getLocation.do", //首页-获取当前位置
        "getBgUrl": host + "findSonPicture.do", //首页-获取背景图片
        "getDoApplicationUrl": host + "doApplication.do", //首页-列表用户申请
        "getCodeUrl": host + "getCode.do",
        "getQRCodeInfoUrl": host + "doFindByQRcodeInfo.do",

        "getfindMessageDataUrl": host + "findMessageData.do",
        "getRegisterUrl": host + "insertUser.do",
        "getLoginUrl": host + "login.do",
        "getFindPwdUrl": host + "updatePassword.do",
        "getUserAuthUrl": host + "userAuth.do",

        "getUpdateUserImgUrl": host + "updateUserImg.do",
        "getRuzhuClassUrl": host + "findSelectOption.do",
        "getRuzhuUrl": host + "merchantEnter.do",
        "getUserFeedBackUrl": host + "userFeedBack.do",
        "getChangePwdUrl": host + "updatePasswordAfterLogin.do",

        "getRealNameNoteUrl": host + "findUserAuthInfo.do",
        "getUserInfoUrl": host + "doFindUserInfo.do",
        "getRuzhuNoteUrl": host + "findUserEnterInfo.do",
        "getRuzhuDetailUrl": host + "findApplyInfoByApplyInfoId.do",
        "getShenqingNoteUrl": host + "findUserApplicationInfo.do",

        "getDaikuanNoteUrl": host + "findApplicationInfo.do",
        "getCardListUrl": host + "findCards.do",
        "getLineDaiUrl": host + "findLoads.do" 
    }
    return config;
}
