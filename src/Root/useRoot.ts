import {useForcedContext} from '../context';
import RootContext from './RootContext';

export default function useRoot() {
  return useForcedContext(RootContext);
}
