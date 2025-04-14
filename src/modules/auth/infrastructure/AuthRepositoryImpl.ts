import { AuthRepository } from "../domain/AuthRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import useLoginStore from "../context/LoginStore";
import useUserProfileStore from "../context/UserProfileStore";

export class AuthRepositoryImpl implements AuthRepository {

  async login(email: string, password: string): Promise<string> {
    try {

      // variables de contexto login
      const { setToken, setisAuthenticated, token, isAuthenticated } = useLoginStore.getState();



      const requestData = { email, password };
      const response = await axios.post(
        'https://beework.kuskaya.co/api/auth/sign-in',
        requestData
      );

      if (response.data === true && response.headers['set-cookie']) {
        const cookie = response.headers['set-cookie'][0];
        const sessionCookie = decodeURIComponent(
          cookie.split('__session=')[1]?.split(';')[0]
        );
        const sessionData = JSON.parse(sessionCookie);
        const localToken = sessionData.token;
        setToken(localToken);
        setisAuthenticated(true);
        await this.callMe(localToken)
        console.log(localToken, "token");
        console.log(true, "isAuthenticated");
        return localToken
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      throw new Error("Credenciales incorrectas");
    }
  }

  async callMe(token: string): Promise<void> {

    // variables de contexto userProfile
    const { setUserId } = useUserProfileStore.getState();

    try {

      const userResponse = await axios.get(
        'https://beework.kuskaya.co/api/auth/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const membershipId = userResponse.data.memberships[0].id;
      const firstName = userResponse.data.memberships[0].firstName;
      var profilePicture = '/images/defaultProfilePicture.png';
      if (userResponse.data.memberships[0].avatars[0]) {
        profilePicture = userResponse.data.memberships[0].avatars[0].downloadUrl;
      }
      const userRoles = userResponse.data.memberships[0].roles;
      const role = userRoles.includes('driver')
        ? 'driver'
        : userRoles.includes('verifier')
          ? 'verifier'
          : '';


      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify({ token, membershipId, firstName, role, profilePicture })
      );
      console.log('id de repository imp', membershipId)

      setUserId(membershipId)

    } catch (error) {
      throw new Error("Credenciales incorrectas");
    }
  }
}
