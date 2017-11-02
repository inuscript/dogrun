import docReady from 'doc-ready'
import Jaco from "jaco"
import $ from "jquery"

const hookKanaTarget = (inputSelector, outputSelector) => {
  let currentKana = ""
  const storeKanaIfNeed = (value) => {
    if(new Jaco(value).isOnlyHiragana() || value === ""){
      currentKana = value
    }
  }
  $(inputSelector).keydown(function(e) {
    storeKanaIfNeed($(e.target).val())
  })
  // update
  $(inputSelector).blur(function(e) {
    if($(outputSelector).val()){
      return
    }
    $(outputSelector).val(currentKana)
    currentKana = ""
  })
}

export default () => {
  docReady(() => {
    hookKanaTarget('#first_name', '#first_name_kana')
  })
}
