/**
 * If you're using Sentry
 *   RN   https://docs.sentry.io/platforms/react-native/
 */
import * as Sentry from '@sentry/react-native';

/**
 * If you're using Crashlytics: https://rnfirebase.io/crashlytics/usage
 */
// import crashlytics from '@react-native-firebase/crashlytics';

/**
 * If you're using Bugsnag:
 *   RN   https://docs.bugsnag.com/platforms/react-native/)
 */
// import Bugsnag from "@bugsnag/react-native"

/**
 *  This is where you put your crash reporting service initialization code to call in `./app/app.tsx`
 */
export const initCrashReporting = () => {
  // Sentry.init({
  //   dsn: 'YOUR DSN HERE',
  //   debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  // });
};

/**
 * Error classifications used to sort errors on error reporting services.
 */
export enum ErrorType {
  /**
   * An error that would normally cause a red screen in dev
   * and force the user to sign out and restart.
   */
  FATAL = 'Fatal',
  /**
   * An error caught by try/catch where defined using Reactotron.tron.error.
   */
  HANDLED = 'Handled',
}

/**
 * Manually report a handled error.
 *
 * @param {any} error - The error object to report.
 * @param {ErrorType} type - The type of error (optional). Defaults to ErrorType.FATAL.
 */
export const reportCrash = (error: any, type: ErrorType = ErrorType.FATAL) => {
  if (__DEV__) {
    // Log to console in development
    const message = error.message || 'Unknown';
    console.error(error);
    console.log(message, type);
    console.log(error);
  } else {
    // In production, utilize crash reporting service of choice below:
    Sentry.captureException(error);
    console.log('Sentry error', Sentry.captureException(error));
    // Sentry.captureException(error)
    // crashlytics().recordError(error)
    // Bugsnag.notify(error)
  }
};
