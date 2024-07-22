import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics';

export default async function lightImpact() {
  await impactAsync(ImpactFeedbackStyle.Light);
}
