import {impactAsync, ImpactFeedbackStyle} from 'expo-haptics';

export function lightImpact() {
  impactAsync(ImpactFeedbackStyle.Light).catch();
}

export function heavyImpact() {
  impactAsync(ImpactFeedbackStyle.Medium).catch();
}
