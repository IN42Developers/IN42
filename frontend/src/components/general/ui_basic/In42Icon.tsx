import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";

import { AntDesign } from '@expo/vector-icons'
import { icons } from 'lucide-react-native';

type AntDesignIconName = "link" | "stepforward" | "stepbackward" | "forward" | "banckward" | "caretright" | "caretleft" | "caretdown" | "caretup" | "rightcircle" | "leftcircle" | "upcircle" | "downcircle" | "rightcircleo" | "leftcircleo" | "upcircleo" | "downcircleo" | "verticleleft" | "verticleright" | "back" | "retweet" | "shrink" | "arrowsalt" | "doubleright" | "doubleleft" | "arrowdown" | "arrowup" | "arrowright" | "arrowleft" | "down" | "up" | "right" | "left" | "minussquareo" | "minuscircle" | "minuscircleo" | "minus" | "pluscircleo" | "pluscircle" | "plus" | "infocirlce" | "infocirlceo" | "info" | "exclamation" | "exclamationcircle" | "exclamationcircleo" | "closecircle" | "closecircleo" | "checkcircle" | "checkcircleo" | "check" | "close" | "customerservice" | "creditcard" | "codesquareo" | "book" | "barschart" | "bars" | "question" | "questioncircle" | "questioncircleo" | "pause" | "pausecircle" | "pausecircleo" | "clockcircle" | "clockcircleo" | "swap" | "swapleft" | "swapright" | "plussquareo" | "frown" | "menufold" | "mail" | "areachart" | "linechart" | "home" | "laptop" | "star" | "staro" | "filter" | "meho" | "meh" | "shoppingcart" | "save" | "user" | "videocamera" | "totop" | "team" | "sharealt" | "setting" | "picture" | "phone" | "paperclip" | "notification" | "menuunfold" | "inbox" | "lock" | "qrcode" | "tags" | "tagso" | "cloudo" | "cloud" | "cloudupload" | "clouddownload" | "clouddownloado" | "clouduploado" | "enviroment" | "enviromento" | "eye" | "eyeo" | "camera" | "camerao" | "windows" | "export2" | "export" | "circledowno" | "circledown" | "hdd" | "ie" | "delete" | "enter" | "pushpino" | "pushpin" | "heart" | "hearto" | "smile-circle" | "smileo" | "frowno" | "calculator" | "chrome" | "github" | "iconfontdesktop" | "caretcircleoup" | "upload" | "download" | "piechart" | "lock1" | "unlock" | "windowso" | "dotchart" | "barchart" | "codesquare" | "plussquare" | "minussquare" | "closesquare" | "closesquareo" | "checksquare" | "checksquareo" | "fastbackward" | "fastforward" | "upsquare" | "downsquare" | "leftsquare" | "rightsquare" | "rightsquareo" | "leftsquareo" | "down-square-o" | "up-square-o" | "play" | "playcircleo" | "tag" | "tago" | "addfile" | "folder1" | "file1" | "switcher" | "addfolder" | "folderopen" | "search1" | "ellipsis1" | "calendar" | "filetext1" | "copy1" | "jpgfile1" | "pdffile1" | "exclefile1" | "pptfile1" | "unknowfile1" | "wordfile1" | "dingding" | "dingding-o" | "mobile1" | "tablet1" | "bells" | "disconnect" | "database" | "barcode" | "hourglass" | "key" | "flag" | "layout" | "printer" | "USB" | "skin" | "tool" | "car" | "addusergroup" | "carryout" | "deleteuser" | "deleteusergroup" | "man" | "isv" | "gift" | "idcard" | "medicinebox" | "redenvelopes" | "rest" | "Safety" | "wallet" | "woman" | "adduser" | "bank" | "Trophy" | "loading1" | "loading2" | "like2" | "dislike2" | "like1" | "dislike1" | "bulb1" | "rocket1" | "select1" | "apple1" | "apple-o" | "android1" | "android" | "aliwangwang-o1" | "aliwangwang" | "pay-circle1" | "pay-circle-o1" | "poweroff" | "trademark" | "find" | "copyright" | "sound" | "earth" | "wifi" | "sync" | "login" | "logout" | "reload1" | "message1" | "shake" | "API" | "appstore-o" | "appstore1" | "scan1" | "exception1" | "contacts" | "solution1" | "fork" | "edit" | "form" | "warning" | "table" | "profile" | "dashboard" | "indent-left" | "indent-right" | "menu-unfold" | "menu-fold" | "antdesign" | "alipay-square" | "codepen-circle" | "google" | "amazon" | "codepen" | "facebook-square" | "dropbox" | "googleplus" | "linkedin-square" | "medium-monogram" | "gitlab" | "medium-wordmark" | "QQ" | "skype" | "taobao-square" | "alipay-circle" | "youtube" | "wechat" | "twitter" | "weibo" | "HTML" | "taobao-circle" | "weibo-circle" | "weibo-square" | "CodeSandbox" | "aliyun" | "zhihu" | "behance" | "dribbble" | "dribbble-square" | "behance-square" | "file-markdown" | "instagram" | "yuque" | "slack" | "slack-square"| "anticon" 
type LucideIcon = 'Cog'

export type In42IconName = AntDesignIconName | LucideIcon; //extend it later with other possible icons

interface IconProps {
    origin: 'custom' | 'antdesign' | 'lucide', //or any other package that we use
    size?: number,
    name: In42IconName | string,
    style?: TextStyle,
    color?: string,

    //lucidSpecific props
    fillColor?: "none" | string,

}

const In42Icon: React.FC<IconProps> = ({
    origin,
    size=10,
    name="minuscircleo",
    style,
    fillColor="none",
    color='white',
}) => {

    let iconElement;

    switch (origin) {
        case "custom":
            iconElement = null;
            break;
        case 'antdesign':
            iconElement = <AntDesign style={[styles.defaultIconStyle,style,{color:color} ] } size={size} name={name} />
            break;
        case 'lucide':
            const LucideIcon = icons[name];
            iconElement = <LucideIcon style={[styles.defaultIconStyle,style,{color:color} ]} name={name} size={size} color={color ? color : styles.defaultIconStyle.color} fill={fillColor} ></LucideIcon>
            break;
        default:
            iconElement = null;
    }


    return (
    <View>
        {iconElement}
    </View>
    )
}

const styles = StyleSheet.create({
    defaultIconStyle: {
        color: '#999999',
        alignItems: 'center',
        justifyContent: 'center',
    }
})


export default In42Icon;

  