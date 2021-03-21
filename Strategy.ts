import { OAuth2Strategy, InternalOAuthError } from "passport-oauth";
import request from "request";
import Profile from "./Profile";

export class Strategy extends OAuth2Strategy {
  public name: string;
  _site: string;
  _key: string;
  _oauth2: any;
  _profileUrl: string;

  public constructor(options: any, verify: any) {
    
    options = options || {};

    options.authorizationURL =
      options.authorizationURL || "https://stackexchange.com/oauth";
    options.tokenURL =
      options.tokenURL || "https://stackexchange.com/oauth/access_token";

    super(options, verify);

    OAuth2Strategy.call(this, options, verify);
    this.name = "stack-exchange";

    this._profileUrl =
      options._profileUrl || "https://api.stackexchange.com/2.2/me";
    this._site = options.site || "stackoverflow";
    if (!options.stackAppsKey) {
      throw new Error("stackAppsKey must be specified!");
    }
    this._key = options.stackAppsKey;
    this._oauth2.setAccessTokenName("access_token");
    
  }

  /**
   * Return extra parameters to include in the auth request
   */
  public authorizationParams (options) {
    var params = Object.assign({}, options);
    return params;
  }

  public authenticate(a: any, req: any, options?: any): any{
    return super.authenticate(a, req, options);
  }

  public userProfile (accessToken, done) {
    request(
      {
        method: "GET",
        url: this._profileUrl,
        // @see https://api.stackexchange.com/docs/compression
        gzip: true,
        qs: {
          key: this._key,
          site: this._site,
          access_token: accessToken
        },
      },
      function (err, _res, body) {
        if (err) {
          return done(
            new InternalOAuthError("failed to fetch user profile", err)
          );
        }

        var json;
        try {
          json = JSON.parse(body);
        } catch (e) {
          return done(new InternalOAuthError("Malformed response.", e));
        }

        if (!(json.items && json.items.length)) {
          return done(new InternalOAuthError("Empty response."));
        }

        var profile = new Profile(json.items[0]);
        profile.provider = "stack-exchange";
        profile._raw = body;
        profile._json = json;

        done(null, profile);
      }
    )
  }
}
