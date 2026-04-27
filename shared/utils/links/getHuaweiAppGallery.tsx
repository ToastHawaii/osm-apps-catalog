export function getHuaweiAppGallery(huaweiAppGalleryID: string | undefined) {
  if (!huaweiAppGalleryID) {
    return undefined;
  }

  return `https://appgallery.huawei.com/#/app/C${huaweiAppGalleryID}`;
}
