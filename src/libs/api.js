import {Modal, Notice, Message} from "iview";
import {hasOneOf, oneOf} from "./tools";
import user from "../store/module/user";
import axios from "./api.request";

function _confirm(content, title, confirmCallback, cancelCallBack, type, confirmBtnText, cancelBtnText) {
  Modal.confirm({
    title: (title || _getI18n('notification.infoTitle')),
    content: content,
    okText: (confirmBtnText || _getI18n('btn.confirm')),
    cancelText: (cancelBtnText || _getI18n('btn.cancel')),
    onOk: () => {
      if (confirmCallback) {
        confirmCallback()
      }
    },
    onCancel: () => {
      if (cancelCallBack) {
        confirmCallback()
      }
    }
  });
}

function _getI18n(key) {
  if (key) return window.app.$t(key)
  else return "";
}

// 返回在vue模板中的调用接口
export default {
  get(url, params, success, fail) {
    axios.request({
      url: url,
      params,
      method: 'GET'
    }).then((res) => {
      if (success) {
        success(res)
      }
    }).catch((xrh) => {
      if (fail) {
        fail()
      }
    })
  },
  post(url, params, success, fail) {
    axios.request({
      url: url,
      data: params,
      method: 'POST'
    }).then((res) => {
      if (success) {
        success(res)
      }
    }).catch((xrh) => {
      if (fail) {
        fail()
      }
    })
  },
  notiError(message) {
    return Notice.error({
      title: _getI18n('notification.errorTitle'),
      desc: message
    })
  },
  notiWarning(message) {
    return Notice.warning({
      title: _getI18n('notification.warningTitle'),
      desc: message
    })
  },
  notiSuccess(message) {
    return Notice.success({
      title: _getI18n('notification.successTitle'),
      desc: message
    })
  },
  notiInfo(message) {
    return Notice.info({
      title: _getI18n('notification.infoTitle'),
      desc: message || ''
    })
  },
  validateFail() {
    Notice.error({
      title: _getI18n('notification.errorTitle'),
      desc: _getI18n('message.validFailure'),
      duration: 5
    });
  },
  messageSuccess(meg) {
    Message.success(meg || _getI18n('notification.successMsg'));
  },
  getPageInfo: function (initPage = 0) {
    return {
      pageIndex: initPage,
      pageSize: 20,
      sizes: [20, 50, 100, 200],
      total: 0
    }
  },
  hasPermisson(role) {
    return hasOneOf(user.state.access, role);
  },
  getI18n: _getI18n,
  deleteConfirm(confirmCallback, cancelCallBack) {
    _confirm(_getI18n('message.deleteMsg'), null, confirmCallback, cancelCallBack, _getI18n('btn.delete'))
  },
  infoConfirm(content, confirmCallback, confirmBtnText, cancelBtnText, cancelCallBack) {
    _confirm(content, null, confirmCallback, cancelCallBack, null, confirmBtnText, cancelBtnText)
  }
}
