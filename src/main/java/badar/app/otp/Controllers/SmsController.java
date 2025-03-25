package badar.app.otp.Controllers;


import badar.app.otp.Services.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String phoneNumber) {
        try {
            smsService.sendOTP(phoneNumber);
            return "OTP sent successfully to " + phoneNumber;
        } catch (Exception e) {
            return "Error sending OTP: " + e.getMessage();
        }
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String phoneNumber, @RequestParam String otp) {
        try {
            smsService.verifyOTP(phoneNumber, otp);
            return "OTP is valid";
        } catch (Exception e) {
            return "OTP is Invalid" + e.getMessage();
        }
    }
}
