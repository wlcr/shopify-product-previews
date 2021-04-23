let shopifyInfo = {};

function logMessage(msg) {
  chrome.tabs.executeScript({code:"console.log('"+msg+"')"});
}

// function getShopUrl(tabId) {
//   chrome.tabs.executeScript(tabId, {
//     // code: "console.log(chrome.tabs.executeScript); window.Shopify.shop"
//     code: "document.head.innerHTML"
//   },
//   (result) => {
//     console.log('result:', result)
//     shopUrl = result;
//   }
//   );
//   return shopUrl;
// }
function getShopUrl(tabId) {
  chrome.tabs.executeScript(tabId, {
    file: "content-script.js",
    allFrames: true
  });
}
// chrome.runtime.onInstalled.addListener(() => {
//   // chrome.storage.sync.set({ color });
//   console.log('Testing browser extensions');
// });
// console.log('Testing');

chrome.webRequest.onBeforeRequest.addListener(function(details) {
//   // const { tabId, requestId } = details;

  // alert(details);
  // console.log('Log', details.url);
  // console.warning('Warn', details);
  // console.warn('Testing');
  // chrome.extension.getBackgroundPage().console.log('Test', details);

  // return {cancel: details.url.indexOf("://*myshopify.com/") != -1};
  // return {cancel: true};

}, { urls: ["<all_urls>"] }, ['blocking']);

chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    if (changeInfo.url) {
      // do something here
      // console.log('Change URL', changeInfo.url);
      const newUrl = new URL(changeInfo.url);
      const previewKey = newUrl.searchParams.get('preview_key');

      if (previewKey) {
        // alert(`Preview key is: ${previewKey}`);
        console.log('GOT URL PREVIEW KEY', previewKey);
        logMessage(`Preview Key is: ${previewKey}`);
        logMessage(`Append to URL: /products_preview?preview_key=${previewKey}`);

        shopifyInfo.previewKey = previewKey;

        // getShopUrl(tabId);
        // const thisShopUrl = getShopUrl(tabId);
        // console.log(thisShopUrl);
        // logMessage(`Shop URL is: ${thisShopUrl}`);
        // logMessage(`Shop URL is: ${shopUrl}`);
        

        // if (global.Shopify && global.Shopify.shop) {
        //   console.log(`${Shopify.shop}/products_preview?preview_key=${previewKey}`);
        // }
      }
      ///  https://yu3cwraxluigkl7r-20725133.shopifypreview.com/products_preview?preview_key=7ce20c2d0f66d62b115f3a0e10f8e9ea
    }
  }
);

// (() => {chrome.webRequest.onBeforeRequest.addListener((details) => {
// //   // const { tabId, requestId } = details;

//   alert('Testing');
//   console.log(details);

// }, {urls: ["<all_urls>"]});
// })();

// var callback = function(details) {
//   console.log(details);
// };

// var filter = {...};
// var opt_extraInfoSpec = [...];

// chrome.webRequest.onBeforeRequest.addListener(
//   callback, filter, opt_extraInfoSpec);

// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//     return {cancel: details.url.indexOf("://www.evil.com/") != -1};
//   },
//   {urls: ["<all_urls>"]},
//   ["blocking"]
// );

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(shopifyInfo);
    if (sender.tab && request.Shopify) {
      shopifyInfo.Shopify = request.Shopify;
      console.log(shopifyInfo);
      
      sendResponse(shopifyInfo);
    }
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    // if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
  }
);