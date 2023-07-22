import {
  NavigationState,
  PartialState,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {useEffect, useRef, useState, useCallback} from 'react';
import {BackHandler, Platform} from 'react-native';
import {PersistNavigationConfig} from '../config/config.base';
import Config from '../config';
import {useIsMounted} from '@hooks';

export const navigationRef = createNavigationContainerRef();

/**
 * Gets the current screen from any navigation state.
 *
 * @param {NavigationState | PartialState<NavigationState>} state - The navigation state object.
 * @returns {string} The name of the active route.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
): string {
  const {routes, index} = state;
  const route = routes[index];

  // Found the active route -- return the name
  if (!route.state) {
    return route.name;
  }

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 *
 * @param {Function} canExit - A function that determines if the app can be exited.
 */
export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    if (Platform.OS === 'ios' || !navigationRef.current) {
      return;
    }

    const onBackPress = () => {
      const routeName = getActiveRouteName(
        navigationRef.current?.getRootState(),
      );

      if (canExitRef.current(routeName)) {
        BackHandler.exitApp();
        return true;
      }

      if (navigationRef.current.canGoBack()) {
        navigationRef.current.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [canExitRef]);
}

/**
 * This helper function will determine whether we should enable navigation persistence
 * based on a config setting and the __DEV__ environment (dev or prod).
 *
 * @param {PersistNavigationConfig} persistNavigation - The configuration for navigation persistence.
 * @returns {boolean} True if navigation persistence should be enabled, false otherwise.
 */
function shouldEnableNavigationPersistence(
  persistNavigation: PersistNavigationConfig,
): boolean {
  if (persistNavigation === 'always') {
    return true;
  }
  if (persistNavigation === 'dev' && __DEV__) {
    return true;
  }
  if (persistNavigation === 'prod' && !__DEV__) {
    return true;
  }
  // all other cases, disable restoration by returning false
  return false;
}

/**
 * Custom hook for persisting navigation state.
 *
 * @param {any} storage - The storage object to save and load navigation state.
 * @param {string} persistenceKey - The key to store and retrieve the navigation state from storage.
 * @returns {object} Object containing the necessary functions and state for navigation persistence.
 */
export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const isMounted = useIsMounted();

  const shouldRestoreNavigation = shouldEnableNavigationPersistence(
    Config.persistNavigation,
  );
  const [isRestored, setIsRestored] = useState(shouldRestoreNavigation);

  const routeNameRef = useRef<string | undefined>();

  /**
   * Callback function to be called when the navigation state changes.
   *
   * @param {NavigationState} state - The new navigation state.
   */
  const onNavigationStateChange = (state: NavigationState) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName && __DEV__) {
      console.log(currentRouteName);
    }

    // Save the current route name for later comparison
    routeNameRef.current = currentRouteName;

    // Persist state to storage
    storage.save(persistenceKey, state);
  };

  /**
   * Function to restore the navigation state from storage.
   */
  const restoreState = useCallback(async () => {
    try {
      const state = await storage.load(persistenceKey);
      if (state) {
        setInitialNavigationState(state);
      }
    } finally {
      if (isMounted()) {
        setIsRestored(true);
      }
    }
  }, [isMounted, persistenceKey, storage]);

  useEffect(() => {
    if (!isRestored) {
      restoreState();
    }
  }, [isRestored, restoreState]);

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  };
}
