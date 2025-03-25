package badar.app.otp.Services;

import badar.app.otp.Models.OTPRecord;
import badar.app.otp.Repositories.OTPRecordRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Random;

@Service
public class SmsService {

    @Autowired
    private OTPRecordRepository otpRecordRepository;

    private static String accountSid = System.getenv("TWILIO_ACCOUNT_SID");

    private static String authToken = System.getenv("TWILIO_AUTH_TOKEN");

    private static String fromPhoneNumber = System.getenv("TWILIO_PHONE_NUMBER");

    private static HashMap<String, OTPRecord> otpStorage = new HashMap<>();

    private static final long OTP_TIMEOUT_IN_MILLIS = 5 * 60 * 1000;

    public String sendOTP(String toPhoneNumber) {
        // Initialize Twilio with Account SID and Auth Token
        Twilio.init(accountSid, authToken);
        String otp = generateOtp();
//        String otpSid = storeOtp(toPhoneNumber, otp);
        Message message = Message.creator(
                new PhoneNumber("+".concat(toPhoneNumber)),
                new PhoneNumber(fromPhoneNumber),
                "Your One-Time Password (OTP) is: " + otp

        ).create();
        return message.getSid();
    }

    public boolean verifyOTP(String toPhoneNumber, String otp, String otpSid) {
        OTPRecord otpRecord = otpStorage.get(otpSid);

        if (otpRecord == null) {
            return false; // OTP not found
        }

        if (Instant.now().isAfter(otpRecord.getTimestamp().plusMillis(OTP_TIMEOUT_IN_MILLIS))) {
            otpStorage.remove(otpSid);
            return false;
        }

        return otp.equals(otpRecord.getOtp());

    }

    // Helper method to generate a random OTP
    private String generateOtp() {
        Random random = new Random();
        int otp = random.nextInt(999999); // Generate a random 6-digit OTP
        return String.format("%06d", otp); // Ensure the OTP is always 6 digits
    }


    // Store OTP with timestamp
    private String storeOtp(String toPhoneNumber, String otp) {
        String otpSid = toPhoneNumber + "-" + Instant.now().toEpochMilli();
        OTPRecord otpRecord = new OTPRecord();
        otpRecord.setOtp(otp);
        otpRecord.setTimestamp(Instant.now());
        otpRecord.setPhoneNumber(toPhoneNumber);
        otpRecordRepository.save(otpRecord);
        return otpSid;
    }


    private String getOtpSid(String toPhoneNumber, String otp) {
        return "";
    }

}
