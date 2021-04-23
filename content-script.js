// chrome.runtime.sendMessage({ greeting: 'hello' }, function(response) {
//   // console.log(response.farewell);
//   // console.log(Shopify);
//   console.log('Hello from the browser?', document.readyState);
// });

// document.addEventListener('DOMContentLoaded', () => {
//   console.log('Document Ready', Shopify)
// });

document.addEventListener('DOMContentLoaded', (event) => {
  let isShopify = window.Shopify || 'nope';
  var s = document.createElement('script');
  s.innerHTML = `
    document.dispatchEvent(new CustomEvent('ShopifyProductPreviewsGetShopUrl', {
      detail: JSON.stringify(Shopify)
    }));
  `;
  (document.head||document.documentElement).appendChild(s);
  // s.onload = function() {
  //     s.remove();
  // };

  // console.log('DOMContentLoaded', event, isShopify);

  // const scriptTags = document.head.querySelectorAll('script:not([src])');

  // scriptTags
}, false);

document.addEventListener('ShopifyProductPreviewsGetShopUrl', function(e) {
  // e.detail contains the transferred data (can be anything, ranging
  // from JavaScript objects to strings).
  // Do something, for example:
  // alert(e.detail);
  // console.log('Custom event fired', JSON.parse(e.detail));

  chrome.runtime.sendMessage({ Shopify: JSON.parse(e.detail) }, function(shopifyInfo) {
    // console.log('Response from the Extension?', shopifyInfo);
    const previewUrl = `//${shopifyInfo.Shopify.shop}/products_preview?preview_key=${shopifyInfo.previewKey}`;
    window.location.replace(previewUrl);
    console.log(`Preview URL is ${shopifyInfo.Shopify.shop}/products_preview?preview_key=${shopifyInfo.previewKey}`);
  });
});

// const getStoreUrl = () => {
//   let isShopify = Shopify || false;
//   console.log('Document Ready. isShopify? ', isShopify)
// }

// if (document.readyState === 'loading') {  // Loading hasn't finished yet
//   document.addEventListener('DOMContentLoaded', getStoreUrl);
// } else {  // `DOMContentLoaded` has already fired
//   getStoreUrl();
// }
