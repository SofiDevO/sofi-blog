import { wpquery } from "@src/data/wordpress";
import type { LoggedUser } from "@src/types/loggedUser.type";
import type {
  RegisterUser,
  RegisterUserResponse,
} from "@src/types/registerUser.type";
import type { AstroCookies } from "astro";
import Jwt from "jsonwebtoken";

const SECRET_KEY = import.meta.env.SECRET_KEY;
const WPGRAPHQL_URL = import.meta.env.WPGRAPHQL_URL;
const SECRET_USER = import.meta.env.SECRET_USER;
const SECRET_PASSWORD = import.meta.env.SECRET_PASSWORD;

interface UserEmailResponse {
  users: {
    nodes: Array<{
      email: string;
      id: string;
      name: string;
      firstName: string;
      lastName: string;
      avatar: {
        url: string;
        size: number;
        default: string;
      };
    }>;
  };
}

interface CreateUserResponse {
  createUser: {
    user: RegisterUserResponse;
  };
}

/**
 * Checks if a user is logged in by verifying the access token stored in cookies.
 *
 * @param {AstroCookies} cookies - The cookies object from Astro.
 * @returns {LoggedUser | null} - Returns the logged user data if the user is logged in,
 * or null if the user is not logged in or the token is invalid.
 */
export function isLoggedIn(cookies: AstroCookies): LoggedUser {
  const accessToken = cookies.get("accessToken")?.value;
  if (!accessToken) return null;
  try {
    const decoded = Jwt.verify(accessToken, SECRET_KEY);
    return decoded as LoggedUser;
  } catch (error) {
    if (error instanceof Jwt.TokenExpiredError) {
      console.error("Token Expired:", error.message);
      return null;
    }

    if (error instanceof Jwt.JsonWebTokenError) {
      console.error("Invalid Token:", error.message);
      return null;
    }
    console.error(error);
    return null;
  }
}

/**
 * Verifies if a user is valid by checking the credentials against the WordPress REST API.
 *
 * @param {string} user - The username to verify.
 * @param {string} password - The password to verify.
 * @returns {Promise<WP_User | null>} - Returns the user data if the credentials are valid, or
 * null if the credentials are invalid.
 */
export async function isValidUser(username: string, password: string) {
  try {
    const query = `
      mutation LoginUser($username: String!, $password: String!) {
        login(input: {
          clientMutationId: "uniqueId",
          username: $username,
          password: $password
        }) {
          authToken
          refreshToken
          user {
            id
            databaseId
            name
            firstName
            lastName
            email
            avatar {
              url
            }
          }
        }
      }
    `;

    const variables = { username, password };

    // WPGraphQL JWT Authentication working natively
    // but the wpquery standard method might send them, which is fine.
    const response: any = await wpquery({ query, variables });

    if (response?.login?.user) {
      const user = response.login.user;
      return {
        id: user.databaseId || user.id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar?.url || "",
        authToken: response.login.authToken,
        refreshToken: response.login.refreshToken,
      };
    }

    return null;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

/**
 * Registers a new user in WordPress using the GraphQL API.
 *
 * @param {RegisterUser} user - The user data to register.
 * @returns {Promise<RegisterUserResponse>} - The registered user data if the registration is
 * successful, or null if the registration fails.
 */
export async function registerUser(
  user: RegisterUser,
): Promise<RegisterUserResponse> {
  const query = `
        mutation createUser(
            $username: String = "",
            $password: String = "",
            $lastName: String = "",
            $firstName: String = "",
            $email: String = ""
        ) {
            createUser(
                input: {
                    username: $username,
                    email: $email,
                    password: $password,
                    firstName: $firstName,
                    lastName: $lastName
                }
            ) {
                user {
                    username
                    email
                }
            }
        }
    `;
  try {
    const headers = {
      Authorization: "Basic " + btoa(SECRET_USER + ":" + SECRET_PASSWORD),
    };

    const response = await wpquery({ query, variables: user, headers });
    const typedResponse = response as CreateUserResponse;
    return typedResponse.createUser.user as RegisterUserResponse;
  } catch (error) {
    return null;
  }
}
