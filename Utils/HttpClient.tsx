import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface SendOtpBody {
  email: string;
}

interface VerifyOtpBody {
  email: string;
  code: string;
}

interface AcceptInviteBody {
  invite_code: string;
}

interface RankingParams {
  page?: number;
  limit?: number;
}
interface SendOtpResponse {
  success: boolean;
  message: string;
}
interface GetInviteCodeResponse {
  success: boolean;
  data: {
    invite_code: string;
  };
}
class HttpClient {
  public axiosInstance: AxiosInstance;
  public accessToken: string | null = null;
  public refreshToken: string | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Set access token
  setToken(token: string) {
    this.accessToken = token;
    this.axiosInstance.defaults.headers.common['Authorization'] = token;
  }

  // Remove access token
  removeToken() {
    this.accessToken = null;
    if (this.axiosInstance?.defaults?.headers?.common) {
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  /** 1. Send OTP */
  async sendOtp(body: SendOtpBody): Promise<AxiosResponse<SendOtpResponse>> {
    return await this.axiosInstance.post('/api/waitlist/send-otp', body);
  }

  /** 2. Verify OTP and get tokens */
  async verifyOtp(body: VerifyOtpBody) {
    return await this.axiosInstance.post('/api/waitlist/auth', body);
  }

  /** 3. Get User Invite Code - /api/invite/client/my-invite-code */
  async getInviteCode(): Promise<AxiosResponse<GetInviteCodeResponse>> {
    return await this.axiosInstance.post('/api/waitlist/my-invite-code', {
      token: this.accessToken,
    });
  }

  // /** 4. Accept Invite Code */
  // async acceptInvite(body: AcceptInviteBody) {
  //   return await this.axiosInstance.post('/api/invite/client/accept', body);
  // }

  // /** 5. Get Leaderboard */
  // async getLeaderboard(params?: RankingParams) {
  //   return await this.axiosInstance.get('/api/invite/client/ranking', {
  //     params,
  //   });
  // }

  // /** 6. Unsubscribe User */
  // async unsubscribe(email: string) {
  //   return await this.axiosInstance.get('/api/auth/unsubscribe', {
  //     params: { email },
  //   });
  // }
}
const httpClient = new HttpClient();
export default httpClient;
