import {PixelRatio} from 'react-native';

/**
 * Get the current visible index
 * @param offset Scroll view offset in layout pixels
 * @param slideWidth Slide width in layout pixels
 */
function getVisibleIndex(offset: number, slideWidth: number): number;
/**
 * Get the current visible index
 * @param offset Scroll view offset in layout pixels
 * @param fullWidth Content full width in layout pixels
 * @param slideCount The number of slides inside the carousel
 */
function getVisibleIndex(
  offset: number,
  fullWidth: number,
  slideCount: number,
): number;
function getVisibleIndex(offset: number, width: number, slideCount = 1) {
  const offsetPx = PixelRatio.getPixelSizeForLayoutSize(offset);
  const widthPx = PixelRatio.getPixelSizeForLayoutSize(width / slideCount);
  return offsetPx / widthPx;
}

export default getVisibleIndex;
