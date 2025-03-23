package badar.app.otp.Config;

import badar.app.otp.Security.PhoneNumberAuthenticationFilter;
import badar.app.otp.Security.PhoneNumberAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfiguration {

    @Autowired
    private PhoneNumberAuthenticationProvider phoneNumberAuthenticationProvider;


    protected void configure(HttpSecurity http) throws Exception {
        http.addFilterBefore(phoneNumberAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(phoneNumberAuthenticationProvider)
                .authorizeHttpRequests(auth -> auth.requestMatchers("/login/phone").permitAll().anyRequest().authenticated());
    }
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(phoneNumberAuthenticationProvider);
    }
    @Bean
    public PhoneNumberAuthenticationFilter phoneNumberAuthenticationFilter() throws Exception {
        PhoneNumberAuthenticationFilter filter = new PhoneNumberAuthenticationFilter();
        filter.setAuthenticationManager(authenticationManagerBean());
        return filter;
    }
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
