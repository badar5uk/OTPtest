package badar.app.otp.Services;

public interface OTPService {
    String generateOTP(String phoneNumber);
    boolean validateOTP(String phoneNumber, String otp);
}
