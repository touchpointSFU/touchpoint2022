export type ImageList = {
  [key: string]: HTMLImageElement;
};

export const loadImages = (allImgs: { [key: string]: string } = {}) =>
  new Promise<ImageList>((resolve, error) => {
    let loaded = 0;
    let imgElms: ImageList = {};
    Object.keys(allImgs).forEach((key: string, index: number) => {
      const img = new Image();
      img.src = allImgs[key];
      img.onload = () => {
        loaded++;
        imgElms[key] = img;
        loaded === Object.keys(allImgs).length && resolve(imgElms);
      };
      img.onerror = () => {
        error(`cant load ${allImgs[key]}`);
      };
    });
  });
