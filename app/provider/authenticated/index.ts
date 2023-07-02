import store from '@store';
import {loadObjectFromStorage} from '@utils';

/**
 * The Auth class provides methods for initializing user information and handling authentication-related tasks.
 */
export abstract class Auth {
  private static dispatch = store.dispatch;

  /**
   * Initializes user information based on the stored data.
   * If the user is already logged in (with an access token and user ID), this method does nothing.
   * If there is stored user information with an access token and user ID, it dispatches the user information to the Redux store.
   */
  static async initUserInfo(): Promise<void> {
    const reduxUserInfo = store.getState();

    if (reduxUserInfo && reduxUserInfo) {
      return;
    }

    const userInfo: any = await loadObjectFromStorage('user_profile');

    if (userInfo && userInfo.access_token) {
      this.dispatch({
        user_info: 'user_information',
        type: undefined,
      });
    }
  }

  /**
   * Logs in the user by initializing user information if a token is provided.
   * This method should be called when the app initializes or when a user logs in.
   *
   * @param {string} accessToken - The access token of the user.
   */
  static async loginInit(accessToken: string): Promise<void> {
    if (accessToken) {
      this.dispatch({
        access_token: accessToken,
        type: undefined,
      });

      await this.initUserInfo();
    }
  }
}
