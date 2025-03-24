package badar.app.otp.Services;

import com.amazonaws.services.pinpoint.AmazonPinpoint;
import com.amazonaws.services.pinpoint.AmazonPinpointClientBuilder;
import com.amazonaws.services.pinpoint.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class SmsService {

    private final AmazonPinpoint pinpointClient;

    @Value("${aws.pinpoint.applicationId}")
    private String applicationId;

    public SmsService() {
        // Use default AWS credentials and region configuration
        this.pinpointClient = AmazonPinpointClientBuilder.defaultClient();
    }

    public void sendOtp(String phoneNumber) {
        try {
            // Generate a random OTP (e.g., 6-digit OTP)
            String otp = generateOtp();

            // Prepare the OTP message body
            String messageBody = "Your One-Time Password (OTP) is: " + otp;

            // Create the message request to send an SMS with the OTP
            MessageRequest messageRequest = new MessageRequest()
                    .withAddresses(new java.util.HashMap<String, AddressConfiguration>() {{
                        put(phoneNumber, new AddressConfiguration().withChannelType(ChannelType.SMS));
                    }})
                    .withMessageConfiguration(new DirectMessageConfiguration()
                            .withSMSMessage(new SMSMessage()
                                    .withBody(messageBody)
                                    .withMessageType(MessageType.TRANSACTIONAL) // Transactional for OTP
                                    .withSenderId("SenderID")  // Optional: Custom Sender ID
                                    .withOriginationNumber("+1234567890"))); // Optional: Sender number if using long codes or shortcodes

            // Create the send message request
            SendMessagesRequest request = new SendMessagesRequest()
                    .withApplicationId(applicationId)
                    .withMessageRequest(messageRequest);

            // Send the message
            SendMessagesResult result = pinpointClient.sendMessages(request);
            System.out.println("OTP sent successfully: " + result);
        } catch (Exception e) {
            throw new RuntimeException("Error sending OTP message", e);
        }
    }

    // Helper method to generate a random OTP
    private String generateOtp() {
        Random random = new Random();
        int otp = random.nextInt(999999); // Generate a random 6-digit OTP
        return String.format("%06d", otp); // Ensure the OTP is always 6 digits
    }
}



