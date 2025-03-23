package badar.app.otp.Security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class PhoneNumberAuthenticationProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String phoneNumber = authentication.getName();
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return PhoneNumberAuthenticationToken.class.isAssignableFrom(authentication);;
    }
}
