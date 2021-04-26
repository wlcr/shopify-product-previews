document.addEventListener('DOMContentLoaded', (event) => {
  let isShopify = window.Shopify || 'nope';
  var s = document.createElement('script');
  s.innerHTML = `
    document.dispatchEvent(new CustomEvent('ShopifyProductPreviewsGetShopUrl', {
      detail: JSON.stringify(Shopify)
    }));
  `;
  (document.head||document.documentElement).appendChild(s);
}, false);

document.addEventListener('ShopifyProductPreviewsGetShopUrl', function(e) {
  chrome.runtime.sendMessage({ Shopify: JSON.parse(e.detail) }, function(shopifyInfo) {
    const previewUrl = `//${shopifyInfo.Shopify.shop}/products_preview?preview_key=${shopifyInfo.previewKey}`;

    console.log(`Preview URL is ${shopifyInfo.Shopify.shop}/products_preview?preview_key=${shopifyInfo.previewKey}`);

    window.location.replace(previewUrl);
  });
});
