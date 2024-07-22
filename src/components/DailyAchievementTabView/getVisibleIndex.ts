import {PixelRatio} from 'react-native';

/**
 * Get the current visible index
 * @param offset Scroll view offset in layout pixels
 * @param width Content full width in layout pixels. This is the width of a slide if there is only one slide
 * @param slideCount The number of slides inside the carousel
 */
function getVisibleIndex(offset: number, width: number, slideCount = 1) {
  const offsetPx = PixelRatio.getPixelSizeForLayoutSize(offset);
  const widthPx = PixelRatio.getPixelSizeForLayoutSize(width / slideCount);
  return offsetPx / widthPx;
}

export default getVisibleIndex;
