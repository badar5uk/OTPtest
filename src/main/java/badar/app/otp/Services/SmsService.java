package badar.app.otp.Services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SmsService {

    private static String accountSid = System.getenv("TWILIO_ACCOUNT_SID");

    private static String authToken = System.getenv("TWILIO_AUTH_TOKEN");

    private static String fromPhoneNumber = System.getenv("TWILIO_PHONE_NUMBER");

    public String sendOTP(String toPhoneNumber) {
        // Initialize Twilio with Account SID and Auth Token
        Twilio.init(accountSid, authToken);
        String otp = generateOtp();
        Message message = Message.creator(
                new PhoneNumber("+".concat(toPhoneNumber)),
                new PhoneNumber(fromPhoneNumber),
                "Your One-Time Password (OTP) is: " + otp

        ).create();
        return message.getSid();
    }

    public void verifyOTP(String toPhoneNumber, String otp) {

    }

    // Helper method to generate a random OTP
    private  String generateOtp() {
        Random random = new Random();
        int otp = random.nextInt(999999); // Generate a random 6-digit OTP
        return String.format("%06d", otp); // Ensure the OTP is always 6 digits
    }

}



