let shopifyInfo = {};

function logMessage(msg) {
  chrome.tabs.executeScript({code:"console.log('"+msg+"')"});
}

chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {
    if (changeInfo.url) {
      const newUrl = new URL(changeInfo.url);
      const previewKey = newUrl.searchParams.get('preview_key');

      if (previewKey) {
        // console.log('GOT URL PREVIEW KEY', previewKey);
        // logMessage(`Preview Key is: ${previewKey}`);
        // logMessage(`Append to URL: /products_preview?preview_key=${previewKey}`);

        shopifyInfo.previewKey = previewKey;
      }
    }
  }
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (sender.tab && request.Shopify) {
      shopifyInfo.Shopify = request.Shopify;

      chrome.notifications.create('productPreviewNotification', {
        type: 'basic',
        iconUrl: 'shopify-logo.png',
        title: 'Redirected to your theme & product preview',
        message: `This product preview has been redirected to the theme preview for ${shopifyInfo.Shopify.theme.name}`,
        priority: 2
      });
      
      sendResponse(shopifyInfo);
    }
  }
);