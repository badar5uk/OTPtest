package badar.app.otp.Services.impl;

import badar.app.otp.Services.OTPService;
import org.springframework.stereotype.Service;

@Service
public class OTPServiceImpl implements OTPService {
    // Implement your third-party OTP provider here
    @Override
    public String generateOTP(String phoneNumber) {
        // Call the third-party OTP provider to generate an OTP and return it
        return "Yes";
    }
    @Override
    public boolean validateOTP(String phoneNumber, String otp) {
        // Call the third-party OTP provider to validate the OTP and return true if valid, false otherwise
        return false;
    }
}